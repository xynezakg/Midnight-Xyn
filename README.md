# Bidveil

<p align="center">
  <img src="docs/images/logo.jpg" alt="Bidveil Logo" width="200" />
</p>

[![CI](https://github.com/xynezakg/Midnight-Xyn/actions/workflows/ci.yml/badge.svg)](https://github.com/xynezakg/Midnight-Xyn/actions/workflows/ci.yml)

> Privacy-preserving sealed-bid auction and confidential procurement dApp built on the Midnight Network.

## Live Demo
[https://bidveil.vercel.app/](https://bidveil.vercel.app/)

## Contract Address
| Network  | Address                                                          |
|----------|------------------------------------------------------------------|
| Preprod  | `7ff3da84fceba28bdae68fa8ada604e45bbe191f938873b34857773e1c1e8ec2` |

## What This Product Does

In traditional public blockchains and standard procurement platforms, all transactions, balances, and bids are transparent. This creates severe market distortions, including front-running, bid-sniping, supplier price discrimination, and leakage of confidential corporate bidding strategies. Organizations seeking to run honest, competitive sealed-bid auctions are forced to rely on centralized escrow intermediaries that can be compromised or act dishonestly.

**Bidveil** solves this fundamental dilemma by providing a decentralized, zero-knowledge confidential sealed-bidding and procurement platform on the Midnight Network. Using Compact smart contracts, enterprises and suppliers can issue tenders, submit binding competitive bids, and enforce minimum reserve thresholds with mathematical certainty while keeping individual bid valuations 100% confidential.

By combining browser-local zero-knowledge proof generation via the Lace Midnight DApp Connector with Midnight's dual-state (public ledger + private witness) architecture, Bidveil enables verifiable, collusion-resistant enterprise auctions without revealing underlying financial metrics to competitors, validators, or the public.

## Privacy Model

- **What is PUBLIC (on-chain, anyone can see):**
  - Public ledger state: `reservePrice` (minimum qualifying tender amount), `bidCount` (total count of verified bids), `highestDisclosedBid` (disclosed winning metric upon settlement), and `isOpen` (tender status).
  - Deployed contract verification keys and transaction hashes on Midnight Preprod.
- **What is PRIVATE (private witness, never on-chain):**
  - Private witness inputs: `secretBidAmount()` and `secretBidSalt()`.
  - Individual supplier pricing, unit cost calculations, and bidding amounts, which remain strictly inside local browser memory.
- **What the user PROVES without revealing:**
  - Proves that the confidential bid amount satisfies the condition `secretBidAmount >= reservePrice` and that the procurement tender is currently open, without disclosing the numerical value of `secretBidAmount`.

## Tech Stack

- **Smart Contract Language:** Compact (v0.33 toolchain / v0.23+ language spec)
- **Zero-Knowledge Runtime:** `@midnight-ntwrk/compact-runtime` (v0.18.0-rc.1)
- **Wallet & DApp Connector:** Lace Midnight Wallet (`@midnight-ntwrk/dapp-connector-api`)
- **Frontend Framework:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **CI/CD:** GitHub Actions (automated Compact installer, contract compilation, unit tests, and production build)

## Prerequisites

- **Lace Midnight Wallet extension** (configured for Midnight Preprod)
- **Node.js v22+**
- **Docker Desktop** (optional, for local proof server or indexer testing)

## Setup & Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/xynezakg/Midnight-Xyn.git
   cd Midnight-Xyn
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Compile Compact smart contracts:**
   ```bash
   npm run compile
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```

5. **Build the production frontend bundle:**
   ```bash
   npm run build
   ```

## Run Tests

Run the automated substantive unit test suite covering circuit logic, privacy constraints, and state transitions:

```bash
npm test
```

## CI/CD

The repository features an automated GitHub Actions CI/CD workflow at `.github/workflows/ci.yml`. On every push and pull request to `main` and `master`, the workflow:
1. Provisions a clean Node.js v22 environment.
2. Installs the official Compact compiler toolchain (`compact`).
3. Compiles `contracts/bidveil.compact` and outputs verification keys into `managed/bidveil/`.
4. Executes the unit test suite verifying zero-knowledge constraints and state isolation (`npm test`).
5. Validates the Vite production build (`npm run build`).

## Usage Guide

See [docs/USAGE.md](docs/USAGE.md) for a step-by-step user guide and troubleshooting tips.

## Product X Profile

`https://x.com/bidveil_zk` *(Created for Midnight Builder Challenge Level 4)*
