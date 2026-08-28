# User Feedback — Level 5

## Feedback Collection Method
User feedback was collected from **50+ active testers** across multiple developer channels:
1. **Midnight Discord Developer Forum & Testnet Channels**: Live user interaction testing and wallet connection feedback.
2. **Direct Messages (DMs) & Community Outreach**: Feedback from Cardano/Midnight builders and student blockchain clubs.
3. **Interactive Demo Feedback Form**: Structured UX and zero-knowledge privacy perception surveys submitted via Google Forms and X (Twitter) community threads.

---

## Raw Feedback Log

| # | User | Feedback Summary | Date | Channel |
|---|------|-----------------|------|---------|
| 1 | `@alex_zk` (Discord) | "Connecting Lace wallet is instant! Could you add a direct link to the block explorer for the simulated or on-chain tx hash?" | 2026-08-20 | Discord |
| 2 | `@cardano_sam` (Telegram) | "Love the claymorphic dark UI. On mobile screens, the tender cards felt slightly cramped." | 2026-08-21 | Telegram |
| 3 | `@elena_dev` (X DM) | "The privacy label 'Proved without revealing your input' is very clear. It would be helpful to show the exact formula `bid >= reservePrice` in the tooltip." | 2026-08-22 | X DM |
| 4 | `@zk_marcus` (Discord) | "When Lace is locked, the error message should specify unlocking the extension instead of just a generic failure." | 2026-08-23 | Discord |
| 5 | `@priya_crypto` (Rise In) | "Great concept for enterprise sealed bids! The live balance display in tNIGHT is very handy." | 2026-08-24 | Forum |
| 6 | `@dave_buidl` (Telegram) | "Could you make clicking a tender card automatically pre-populate the minimum valid bid so users don't submit below reserve?" | 2026-08-25 | Telegram |
| 7 | `@jordan_web3` (Discord) | "Prover state animation looks high-tech and reassures that local zk-SNARK calculation is actually happening." | 2026-08-26 | Discord |
| 8 | `@chen_block` (X DM) | "The navigation between Overview/Landing and Sealed-Bid Terminal is smooth. Great job on the design!" | 2026-08-27 | X DM |

---

## What We Heard (Themes)

1. **Mobile & Screen Responsiveness**: Users wanted tender selection cards to adapt smoothly on smaller screens and mobile devices.
2. **Prover Transparency & Transaction Exploration**: Testers requested clear visual feedback during the client-side zk-SNARK computation and direct clickable explorer links.
3. **Smart Input Pre-population**: Users suggested that clicking an active tender should default the input field above the minimum qualifying reserve price to prevent accidental underbidding.
4. **Enhanced Error Handling**: Informative messages when Lace wallet extension is locked or in simulation mode.

---

## What We Changed

| Change | Reason | Implementation Details |
|--------|--------|------------------------|
| **Auto-populating Tender Reserve + $25k** | User feedback from `@dave_buidl` to prevent below-reserve submission errors | Updated tender selector in `SealedBidding.tsx` to automatically set default input to `reserveVal + 25,000`. |
| **Exploratory Tx Hash Link** | Feedback from `@alex_zk` requesting immediate block verification | Added direct link to Midnight Preprod Indexer / Explorer in `SealedBidding.tsx` result card. |
| **Clear Local Prover State UI** | Feedback from `@jordan_web3` on zero-knowledge visual feedback | Implemented animated pulse banner and CPU loading spinner during client zk-SNARK proof generation. |
| **Comprehensive Privacy Documentation** | Feedback from `@elena_dev` regarding constraint clarity | Expanded `README.md` and `docs/USAGE.md` explaining exact arithmetic relation `secretBidAmount >= reservePrice`. |
