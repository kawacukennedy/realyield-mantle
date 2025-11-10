import { BigInt, Bytes, Address } from "@graphprotocol/graph-ts"
import {
  Deposit as DepositEvent,
  WithdrawRequest as WithdrawRequestEvent,
  WithdrawFulfilled as WithdrawFulfilledEvent,
  YieldDistributed as YieldDistributedEvent,
  AssetMinted as AssetMintedEvent
} from "../generated/Vault/Vault"
import {
  Vault,
  Deposit,
  Withdrawal,
  YieldDistribution,
  Asset
} from "../generated/schema"

export function handleDeposit(event: DepositEvent): void {
  let vault = Vault.load(event.address.toHex())
  if (!vault) {
    vault = new Vault(event.address.toHex())
    vault.totalValueLocked = BigInt.fromI32(0)
    vault.totalDepositors = BigInt.fromI32(0)
    vault.yieldDistributed = BigInt.fromI32(0)
    vault.createdAt = event.block.timestamp
  }

  vault.totalValueLocked = vault.totalValueLocked.plus(event.params.assets)
  vault.updatedAt = event.block.timestamp
  vault.save()

  let deposit = new Deposit(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  deposit.vault = vault.id
  deposit.depositor = event.params.depositor
  deposit.assets = event.params.assets
  deposit.shares = event.params.shares
  deposit.timestamp = event.block.timestamp
  deposit.txHash = event.transaction.hash
  deposit.save()
}

export function handleWithdrawRequest(event: WithdrawRequestEvent): void {
  let withdrawal = new Withdrawal(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  withdrawal.vault = event.address.toHex()
  withdrawal.user = event.params.user
  withdrawal.shares = event.params.shares
  withdrawal.status = "requested"
  withdrawal.requestedAt = event.block.timestamp
  withdrawal.txHash = event.transaction.hash
  withdrawal.save()
}

export function handleWithdrawFulfilled(event: WithdrawFulfilledEvent): void {
  let withdrawalId = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let withdrawal = Withdrawal.load(withdrawalId)
  if (withdrawal) {
    withdrawal.status = "fulfilled"
    withdrawal.proof = event.params.proof
    withdrawal.fulfilledAt = event.block.timestamp
    withdrawal.save()
  }
}

export function handleYieldDistributed(event: YieldDistributedEvent): void {
  let vault = Vault.load(event.address.toHex())
  if (vault) {
    vault.yieldDistributed = vault.yieldDistributed.plus(event.params.totalYield)
    vault.updatedAt = event.block.timestamp
    vault.save()
  }

  let distribution = new YieldDistribution(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  distribution.vault = event.address.toHex()
  distribution.totalYield = event.params.totalYield
  distribution.perShareAmount = event.params.perShareAmount
  distribution.timestamp = event.block.timestamp
  distribution.txHash = event.transaction.hash
  distribution.save()
}

export function handleAssetMinted(event: AssetMintedEvent): void {
  let asset = new Asset(event.params.assetId.toString())
  asset.tokenId = event.params.assetId
  asset.issuer = event.params.issuer
  asset.metadataURI = event.params.metadataURI
  asset.attestationHash = event.params.attestationHash
  asset.createdAt = event.block.timestamp
  asset.locked = false
  asset.save()
}