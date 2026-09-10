# Accessibility + performance audit

## Baseline

Run the deployed preview with **Lighthouse → Mobile** and record the real values here. Do not invent scores.

| Metric | Before | After | Delta |
|---|---:|---:|---:|
| Performance | _run audit_ | _run audit_ | _calculate_ |
| Accessibility | _run audit_ | _run audit_ | _calculate_ |
| Best Practices | _run audit_ | _run audit_ | _calculate_ |
| SEO | _run audit_ | _run audit_ | _calculate_ |
| LCP | _run audit_ | _run audit_ | _calculate_ |
| INP | _run audit_ | _run audit_ | _calculate_ |
| CLS | _run audit_ | _run audit_ | _calculate_ |

## Changes shipped

- Semantic `header`, `nav`, `main`, `section`, and `footer` landmarks.
- Skip link and visible `:focus-visible` treatment.
- All custom buttons use native `<button>` semantics and readable names.
- Video controls are native; posters reserve the media box and reduce layout shift.
- Scene thumbnails have empty alt text because the adjacent button already names the scene.
- Assistant output uses a polite `aria-live` region.
- The generation stop button is keyboard reachable.
- Reduced-motion mode disables continuous 3D rotation and transition transforms while keeping state feedback.
- Three.js renderer caps DPR and requests low-power GPU mode; the 3D section has a non-WebGL fallback message.
- Video assets are recompressed to 960px H.264 with `faststart`; the original uploads remain outside the production media directory.
- AI tool states are visually distinct: input streaming, input available, output available, output error.
- `error.tsx` provides route recovery and the chat has a retry/demo fallback.

## WAVE checklist

Audit `/` after deployment with WAVE. Expected target: **0 errors**. Alerts should be reviewed and either fixed or justified here.

- [ ] Errors: 0
- [ ] Contrast errors: 0
- [ ] Missing form labels: 0
- [ ] Missing alt text: 0
- [ ] Keyboard-only pass complete
- [ ] Primary flow can be completed without a pointer

## Keyboard pass

1. Tab from the browser chrome into the skip link.
2. Move through navigation and scene controls.
3. Play/pause the native video using keyboard controls.
4. Reach the assistant input, submit, and reach the stop button while generating.
5. Reach the scorer and sabotage buttons.
6. Reach the 3D material controls.
7. Confirm focus never disappears and no control is pointer-only.

## Screenshots

Place the real Lighthouse Mobile screenshots after deployment in `docs/audit/` and update these references:

- `docs/audit/lighthouse-before.png`
- `docs/audit/lighthouse-after.png`

## FE-10 performance note

The two original uploaded videos were 31 MB and 19 MB. Production copies are approximately 2.1 MB and 0.64 MB after 960px H.264 recompression. The 3D canvas is capped at 1.5× device pixel ratio and requests a low-power renderer. This keeps the experience deliberately small while preserving a real WebGL scene.
