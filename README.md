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

## Connected app shell

The app now opens on Home rather than dropping directly into the understanding flow. Home connects:

- **I’m spiralling** → support-choice screen
- **Help me understand what happened** → six-step clarity flow
- **My journal** → locally saved journal pieces
- **Settings** → privacy, installation, offline status, and confirmed local-data clearing

The spiral support screen exposes pause-before-acting, carry-me-through options, understanding, closeness/reassurance, and Ask Binch. The first pause route and understanding route retain their existing functionality.

## Interaction paper

Every screen now leaves its main question/heading directly on the botanical page and places the descriptive text, answers, fields, options, and controls together on one reusable physical-paper sheet beneath it. The sheet uses warm fibrous texture, restrained coffee marks, irregular torn-looking edges, and a soft shadow. Home follows Courtney’s annotated boundary: the Understory wordmark remains above, while the description and three navigation rows sit on the large sheet.

## Carry me through the feeling

This is now a four-step guided route rather than an activity list. It records what is loudest emotionally/physically, what happened immediately beforehand, possible contributors, and the feared meaning. A deterministic local branching summary offers possible explanations, immediate actions, and longer-term ways to work with recurring patterns. It explicitly allows internal alarm and a genuine external problem to coexist. A one-minute in-page sequence changes prompts every 15 seconds and lets the user return to the explanation or choose different help.

## My journal graph

My journal now uses a radial SVG node network inspired by Courtney’s reference image. **Me** is the large central node; eight colour-coded categories radiate outward; saved traits extend from categories; green good-outcome and rust bad-outcome dots extend from traits. Thin lines show every direct relationship. The canvas supports pointer drag/pan, wheel zoom, two-finger pinch zoom, plus/minus controls, and reset. Every node is clickable and keyboard-focusable; its detail area shows the node type, full text, and all directly connected nodes. Trait details also allow editing or confirmed removal. Existing local self-map data feeds the network, and older plain journal pieces remain visible below it.

## Interactive locked draft

Pause step two now contains only actions Understory can actively help perform. **Hide the draft**, **Put my phone down**, and **Move to another room** were removed. Selecting **Write what I want to do without doing it** opens a real local draft editor tied to what is on hold. Locking saves the text locally, removes it from view, and displays a sealed box with deliberate controls to continue the pause, reopen/revise, or delete after confirmation. A persistent Home shortcut appears while a draft is locked. The lock is a behavioural/visual pause, not cryptographic encryption or a claim that Understory can prevent the user acting elsewhere.

## Settings

Notification support was removed at Courtney’s request. Settings contains no notification permission request or reminder controls.

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
