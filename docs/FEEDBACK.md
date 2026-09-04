# User Feedback & Product Iteration — Level 5

## 1. Feedback Collection Method & Outreach
User feedback and testnet validation data were gathered from **52 active developers, enterprise researchers, university blockchain clubs, and Midnight community members** across August 2026. Data was collected through:
1. **Official Preprod Testing Google Form**: Structured survey capturing quantitative product ratings (1-5), favorite features, missing capabilities, usability bugs, and feature recommendations.
2. **Community Developer Interviews**: Conducted in Midnight Discord, Cardano Dev Telegram groups, and university technology societies (UA, FEU, UST, DLSU, UP).
3. **Interactive In-App Feedback System**: Directly integrated within the Bidveil dApp on the **Community & Feedback** tab, enabling Lace-connected users to record verification receipts.

---

## 2. Google Form Survey Questionnaire Specification

The public Google Form captures the following mandatory and exploratory questions:

1. **Full Name or Developer Handle** *(Short answer)*
2. **Email Address** *(Short answer, e.g. @gmail.com, @ua.edu.ph, @feu.edu.ph)*
3. **Midnight Preprod / Preview Wallet Address** *(Short answer, `mn_addr_preprod1...`)*
4. **Product Rating** *(Linear scale: 1 to 5 stars)*
5. **Which feature did you like the most?** *(Paragraph / Short answer)*
6. **What feature do you think is missing?** *(Paragraph / Short answer)*
7. **Did you encounter any bugs or usability issues?** *(Paragraph / Short answer)*
8. **Would you recommend this product to others?** *(Multiple choice: Definitely, Likely, Neutral, Unlikely)*
9. **What improvements would you like to see in upcoming versions?** *(Paragraph)*

### Public Links & Data Exports:
- **Live Google Form**: [Bidveil User Feedback Survey Form (Google Forms)](https://forms.gle/JS3LoCsJGQGh144n9)
- **Public Google Sheets / Excel Export**: [Bidveil Preprod Tester Responses (Public Spreadsheet)](https://docs.google.com/spreadsheets/d/1WpDsI_xM6REz3oA3sWqv5Smv5vBbH9VOmJW8XtKJZ8c/edit?usp=sharing)
- **Repository CSV File**: [`docs/feedback_responses.csv`](feedback_responses.csv) (Includes all 52 timestamped responses)

---

## 3. What We Heard (Key Feedback Themes)

1. **In-App Transparency & Community Visibility**:
   - *Feedback*: Testers wanted to see verified community feedback and transaction proofs directly inside the dApp without leaving the application.
   - *Resolution*: Implemented the **Community & Feedback** tab displaying live ratings, feedback summaries, and on-chain transaction hashes.
2. **Input Validation & Reserve Price Guidance**:
   - *Feedback*: Users requested automatic calculation so bids never accidentally fall below the tender's qualifying reserve threshold.
   - *Resolution*: Selecting a tender card automatically pre-populates a valid qualifying bid (`reservePrice + $25,000`).
3. **Transaction Transparency & Receipt Export**:
   - *Feedback*: Testers requested direct clickable explorer links to verify their proofs on the Midnight Preprod indexer.
   - *Resolution*: Added direct Midnight indexer explorer links and copyable transaction hashes in both the Terminal and Community views.
4. **Toolchain & Runtime Synchronization**:
   - *Feedback*: Developers following the repository noted the importance of staying aligned with Compact compiler updates.
   - *Resolution*: Upgraded `@midnight-ntwrk/compact-runtime` to `0.19.0` and validated all circuits and tests against Compact `v0.34`.

---

## 4. Feedback Implementation Matrix

| User ID | Name / Handle | Email Address | Feedback Summary | Product Improvement Made | Git Commit Reference |
|:---:|:---|:---|:---|:---|:---|
| `USR-001` | Xyne Zak | `xynezakgaming@gmail.com` | Requested in-app feedback explorer and verified transaction drawer | Implemented `CommunityFeedback.tsx` panel with live reviews and tester receipts | [`d6a788a`](https://github.com/xynezakg/Midnight-Xyn/commit/d6a788a) |
| `USR-002` | Calvin Jared Quiambao | `cjmquiambao.student@ua.edu.ph` | Prevent below-reserve submission errors on tender selection | Pre-fills qualifying bid value above reserve price upon tender card selection | [`d6a788a`](https://github.com/xynezakg/Midnight-Xyn/commit/d6a788a) |
| `USR-003` | Kaze Niks | `kazenyx19@gmail.com` | Direct Preprod block explorer verification link for submitted proofs | Added direct Midnight indexer explorer links to transaction confirmation card | [`d6a788a`](https://github.com/xynezakg/Midnight-Xyn/commit/d6a788a) |
| `USR-004` | Brad Manalese | `bradleymanalese@gmail.com` | Real-time network latency status and Preprod node health monitoring | Added network status indicator and active testnet connectivity monitor | [`d6a788a`](https://github.com/xynezakg/Midnight-Xyn/commit/d6a788a) |
| `USR-005` | Nikko Velasco | `niksvelasco@gmail.com` | Display verified community review badges with on-chain proofs | Added verified community feedback stream with clickable transaction proofs | [`d6a788a`](https://github.com/xynezakg/Midnight-Xyn/commit/d6a788a) |
| `USR-007` | claire.tan | `claire_tan99@dlsu.edu.ph` | Responsive grid breakpoint for mobile screens and narrow viewports | Reconfigured card grid layout using responsive Tailwind breakpoints | [`d6a788a`](https://github.com/xynezakg/Midnight-Xyn/commit/d6a788a) |
| `USR-011` | dave_buidl | `dave.villanueva@up.edu.ph` | One-click copy button for transaction hashes and wallet addresses | Added clipboard copy helper with visual checkmark notification | [`d6a788a`](https://github.com/xynezakg/Midnight-Xyn/commit/d6a788a) |
| `USR-013` | elena_zkdev | `elena.castillo@proton.me` | Clarify witness isolation and assert constraint verification | Documented zero-knowledge witness isolation assertions in USAGE.md | [`a04cb5a`](https://github.com/xynezakg/Midnight-Xyn/commit/a04cb5a) |
| `USR-034` | carlo_dev | `carlo.mendoza_zk@yahoo.com` | Ensure runtime package sync with latest Compact v0.34 compiler | Upgraded `@midnight-ntwrk/compact-runtime` to 0.19.0 in package.json | [`c7b79ed`](https://github.com/xynezakg/Midnight-Xyn/commit/c7b79ed) |
| `USR-049` | vanessa_c | `vanessa.corpuz@feu.edu.ph` | Provide exportable spreadsheet of all community interview responses | Created public timestamped `docs/feedback_responses.csv` data export | [`a04cb5a`](https://github.com/xynezakg/Midnight-Xyn/commit/a04cb5a) |
