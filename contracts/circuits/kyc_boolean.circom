pragma circom 2.1.6;

include "circomlib/circuits/comparators.circom";
include "circomlib/circuits/poseidon.circom";

// Circuit to prove KYC status without revealing personal data
// Proves that user has valid KYC attestation without disclosing details
template KYCBooleanProof() {
    // Private inputs (not revealed)
    signal input kycHash;        // Hash of KYC data
    signal input attestationHash; // Hash of attestation
    signal input expiry;         // Expiry timestamp
    signal input currentTime;    // Current timestamp

    // Public inputs (revealed)
    signal input expectedIssuer; // Expected issuer address hash
    signal input jurisdiction;   // Jurisdiction hash

    // Outputs
    signal output isValid;       // Boolean result
    signal output proofHash;     // Hash of the proof

    // Verify attestation matches expected issuer
    component issuerCheck = Poseidon(2);
    issuerCheck.inputs[0] <== kycHash;
    issuerCheck.inputs[1] <== attestationHash;

    // Check if attestation is from expected issuer
    component issuerEqual = IsEqual();
    issuerEqual.in[0] <== issuerCheck.out;
    issuerEqual.in[1] <== expectedIssuer;

    // Verify expiry
    component expiryCheck = GreaterThan(64);
    expiryCheck.in[0] <== expiry;
    expiryCheck.in[1] <== currentTime;

    // Combine checks
    signal valid <== issuerEqual.out * expiryCheck.out;

    // Output validity
    isValid <== valid;

    // Generate proof hash
    component poseidon = Poseidon(4);
    poseidon.inputs[0] <== kycHash;
    poseidon.inputs[1] <== attestationHash;
    poseidon.inputs[2] <== expiry;
    poseidon.inputs[3] <== currentTime;

    proofHash <== poseidon.out;
}

component main {public [expectedIssuer, jurisdiction]} = KYCBooleanProof();