# Design QA

## Reference and implementation

- Expert reference: `/var/folders/f8/b46vsybn0k1f0xpfdrmlhv_00000gn/T/codex-clipboard-3134200c-98fa-4321-8803-609cba6523ca.png`
- Skills Hub reference: `/var/folders/f8/b46vsybn0k1f0xpfdrmlhv_00000gn/T/codex-clipboard-c4b1522a-d685-4e58-b6cd-1f4ee4d48ffe.png`
- Information-architecture issue reference: `/var/folders/f8/b46vsybn0k1f0xpfdrmlhv_00000gn/T/codex-clipboard-6fae105e-f7d6-471d-8229-4bd8224ff478.png`
- Implementation: `index.html`, `styles.css`, `app.js`
- Captures: `../output/playwright/专家中心-全页面.png`, `../output/playwright/SkillsHub-全页面.png`

## Validation setup

- Comparison viewport: 2400 × 1600 CSS px, device pixel ratio 1.
- Delivery viewport: 1440 × 900 CSS px for the three keyframes.
- Responsive checks: 1280 × 800 and 760 × 900.
- Browser: Codex in-app browser against the local static preview.
- Data states checked: success, loading, empty/no-result, error, offline.

## Comparison history

1. The original sidebar placed “问数” and “数字员工中心” as peers. The corrected structure makes “专家中心” the catalog and places “问数专家” under “我的专家”.
2. The original center/drawer concepts could not comfortably carry a growing catalog. Both Expert Center and Skills Hub were rebuilt as independent, scrollable full pages.
3. Expert Center adopts the reference’s searchable three-column card catalog and “我的专家” relationship, while keeping the P0 product boundary: only 问数专家 is available; the other two entries are visibly planned and disabled.
4. Skills Hub adopts the reference’s featured section, category filters, multi-column cards, installation state and personal collection, using the Qianji design-system tokens rather than copying the reference brand skin.

## Full-view and focused-region review

- Full-view comparison: the reference and implementation were inspected together at native large-screen size. Header navigation, search area, first-row cards, category controls and scrolling hierarchy match the intended structural pattern.
- Focused region: the top navigation/header and first card row remained legible at the 2400 px capture, so a separate cropped artifact was unnecessary. Their spacing, state labels and action affordances were inspected directly.
- Intentional differences: consumer-market avatars, third-party marketplace content and connector tabs were not copied because this workbench is an internal business product. Content width follows the Qianji layout constraint instead of filling the full reference canvas.

## Findings

- P0: none.
- P1: none.
- P2: none after the full-page rebuild and responsive pass.
- P3: the Expert Center is visually sparse at P0 because the validated scope contains only three experts; adding fictional experts solely to fill the grid would misstate product availability.

## Functional verification

- Expert Center navigation and “打开专家” work; planned experts remain unavailable.
- Skills Hub search, category filtering and installation work; installation updates “我的 Skills”.
- “我的 Skills” separates installed organization Skills from user-created draft/review versions.
- Conversation flow, evidence expansion, export and feedback remain available.
- No page-level horizontal overflow at 2400, 1280 or 760 px.
- JavaScript syntax check passed.
- Qianji HTML validation: 0 errors, 0 warnings.
- Browser console: 0 errors, 0 warnings.

## Final result

passed
