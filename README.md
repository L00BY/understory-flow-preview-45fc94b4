## Understory — Understand What Happened flow

### Purpose
A clickable six-step acute-support route for separating events, meanings, knowledge gaps, internal reactions, needs, and next actions without deciding that the user is mistaken or that another person is at fault.

### Installable web app

This prototype now includes:

- `manifest.webmanifest` with standalone display behaviour
- 192px, 512px, and Apple touch icons
- `service-worker.js` caching the core interface for offline use
- iPhone installation guidance through Safari → Share → Add to Home Screen
- A Settings screen accessible from the gear button

## Settings and notifications

- Notifications are off by default
- Permission is requested only after pressing **Enable notifications**
- On iPhone, notification permission requires opening the installed Home Screen app
- Private lock-screen wording is on by default and stored locally
- Only user-created reminders will be eligible to notify
- Individual reminder creation and background Web Push delivery are explicitly marked as not built yet

## Privacy

No password or login is required. The hosted URL is unlisted, not access-controlled. Entries, pause state, and settings use browser `localStorage` and are not uploaded. Anyone with the URL could open a blank copy but cannot read another device’s local entries. Clearing Safari website data removes local entries.

## What works
- Steps 1 and 2 use neutral blank writing areas without suggested answers
- Step 4 groups expanded choices into feelings, body reactions, and urges
- Step 5 includes a broader set of emotional, relational, practical, and protective needs
- Step 6 asks “What do you want to do next?” and uses literal action wording
- Choosing **Wait before I do anything** opens a working three-step pause setup
- The pause records what is on hold, what may help, and when to return
- **Return when I choose** is selected by default
- Optional 10, 20, 30, or 60 minute in-page timers create no notifications
- Active pauses survive page reloads through localStorage
- Active pauses can be reviewed, continued, or ended without failure language
- Forward and back navigation
- Skip and “I don’t know” at every step
- Multi-select feelings/urges and needs
- Single-select next action
- LocalStorage progress preservation
- Final assembled summary
- Edit any prior step
- Restart
- Review and copy an optional context summary for Binch

### Deliberately not wired
- Closing back into the broader prototype
- Opening Telegram after context review

Those unavailable transitions are visibly labelled in the interface.

### Design
Uses the approved light botanical visual family and Handlee font. The Understory fallen-leaf wordmark is reserved for Home rather than repeated through the acute flow.
