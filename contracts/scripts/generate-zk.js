const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function generateZKVerifier() {
  console.log('Generating ZK proof system...');

  const circuitsDir = path.join(__dirname, '..', 'circuits');
  const buildDir = path.join(circuitsDir, 'build');

  // Ensure build directory exists
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }

  try {
    // Compile circuit
    console.log('Compiling circuit...');
    execSync(`circom ${path.join(circuitsDir, 'kyc_boolean.circom')} --r1cs --wasm --sym -o ${buildDir}`, {
      stdio: 'inherit'
    });

    // Generate trusted setup (powers of tau)
    console.log('Generating trusted setup...');
    execSync(`snarkjs powersoftau new bn128 12 ${path.join(buildDir, 'pot12_0000.ptau')} -v`, {
      stdio: 'inherit'
    });

    execSync(`snarkjs powersoftau contribute ${path.join(buildDir, 'pot12_0000.ptau')} ${path.join(buildDir, 'pot12_0001.ptau')} --name="First contribution" -v`, {
      stdio: 'inherit'
    });

    // Generate zkey
    console.log('Generating zkey...');
    execSync(`snarkjs groth16 setup ${path.join(buildDir, 'kyc_boolean.r1cs')} ${path.join(buildDir, 'pot12_0001.ptau')} ${path.join(buildDir, 'kyc_boolean_0000.zkey')}`, {
      stdio: 'inherit'
    });

    execSync(`snarkjs zkey contribute ${path.join(buildDir, 'kyc_boolean_0000.zkey')} ${path.join(buildDir, 'kyc_boolean_0001.zkey')} --name="1st Contributor Name" -v`, {
      stdio: 'inherit'
    });

    // Export verification key
    console.log('Exporting verification key...');
    execSync(`snarkjs zkey export verificationkey ${path.join(buildDir, 'kyc_boolean_0001.zkey')} ${path.join(buildDir, 'verification_key.json')}`, {
      stdio: 'inherit'
    });

    // Generate Solidity verifier
    console.log('Generating Solidity verifier...');
    execSync(`snarkjs zkey export solidityverifier ${path.join(buildDir, 'kyc_boolean_0001.zkey')} ${path.join(__dirname, '..', 'contracts', 'KYCVerifier.sol')}`, {
      stdio: 'inherit'
    });

    console.log('ZK proof system generated successfully!');
    console.log('Files created:');
    console.log('- circuits/build/kyc_boolean.wasm');
    console.log('- circuits/build/kyc_boolean.r1cs');
    console.log('- circuits/build/verification_key.json');
    console.log('- contracts/KYCVerifier.sol');

  } catch (error) {
    console.error('Error generating ZK system:', error);
    process.exit(1);
  }
}

generateZKVerifier();