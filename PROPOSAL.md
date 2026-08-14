# Product Proposal

## What is the product, and who uses it?
Bidveil is a privacy-preserving sealed-bid auction and procurement platform built on Midnight Network. It is designed for procurement officers, enterprise buyers, government tenders, and high-value asset auctions. Suppliers and buyers use Bidveil to submit confidential bids without exposing their strategic pricing or financial figures to competitors or public observers, while ensuring on-chain verifiable auction settlement.

## Why Midnight specifically?
Transparent blockchains like Ethereum or Cardano expose all transaction inputs and smart contract state publicly, rendering confidential sealed-bid auctions impossible on-chain without centralized off-chain commit-reveal schemes that risk bid leakage. Midnight specifically solves this by combining public ledger state with zero-knowledge private circuit witnesses. Bidders generate client-side ZK proofs in their browser (via the Lace Midnight Wallet), proving that their bid satisfies auction rules without disclosing the underlying bid amount on-chain.

## Data Model
| Data Point       | Type           | Disclosed To |
|------------------|----------------|--------------|
| Tender Metrics & Public Counter | Public ledger  | Everyone (On-chain) |
| Contract Verification Keys     | Public ledger  | Everyone (On-chain) |
| Individual Bid Amounts (`secretDelta`) | Private witness | No one (Stays on user browser) |
| Bidder Private State           | Private witness| No one (Stays on user browser) |
| On-Chain Validity Proof        | Zero-Knowledge Proof | Everyone (Verifiable on-chain) |

## Mainnet Feasibility
Yes, Bidveil is fully realistic to reach Mainnet by Level 6. The core Compact smart contract logic (`counter.compact`), proof server integration, and client browser ZK proof generation via Lace Midnight Wallet are fully modular, lightweight, and engineered for high-throughput zero-knowledge verification on Midnight's Preview, Preprod, and upcoming Mainnet environments.
