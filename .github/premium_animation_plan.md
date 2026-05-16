# 🎴 Premium Animation & Design Plan — Online Belote

> Apple-inspired GSAP animations + 5 Principles of Design audit

---

## Current State Summary

| Area | Status |
|------|--------|
| **Existing GSAP** | Header hero animation only (fade-up stagger + scroll-parallax on cards) |
| **Framer Motion** | `motion` package installed but unused |
| **Page transitions** | None — hard cuts between routes |
| **Scroll animations** | None on Features, GamePreview, or Footer |
| **Micro-interactions** | CSS `hover` transitions only (no GSAP) |
| **Loading states** | Basic SVG spinner, no skeleton / shimmer |

---

## Phase 1 — Global Page Transition System
> *Apple-style cross-fade + slide when navigating between routes*

### 1.1 Create `PageTransition` wrapper component
**New file:** `src/app/components/common/PageTransition.tsx`

- Wrap every page's content in a GSAP-powered enter/exit animation
- **Enter:** Fade in (0 → 1) + slide up (y: 40 → 0) over `0.6s`, ease: `power3.out`
- **Exit:** Fade out (1 → 0) + slide up (y: 0 → -20) over `0.35s`, ease: `power2.in`
- Use `useGSAP` with `useRef` to animate a container `<div>` on mount
- Expose a `triggerExit()` promise that resolves after exit animation completes

### 1.2 Integrate with TanStack Router
**Modify:** `src/app/Layout.tsx`

- Wrap `<Outlet />` inside `<PageTransition>`
- Use TanStack Router's `beforeLoad` / `onBeforeNavigate` to await exit animation before route change
- Alternatively, use `router.subscribe('onBeforeLoad', ...)` to trigger exit animation

### 1.3 Route-level integration
**Modify each route file** to ensure pages render inside the transition wrapper:
- `src/routes/index.tsx`
- `src/routes/create.tsx`
- `src/routes/join.tsx`
- `src/routes/lobby/$lobbyId/route.tsx`
- `src/routes/lobby/results.tsx`

---

## Phase 2 — Home Page Premium Animations
> *Each section animates on scroll like Apple product pages*

### 2.1 Navbar reveal
**Modify:** `src/app/components/pages/homePage/components/Navbar.tsx`

- GSAP `from` animation: slide down + fade in on page load (`y: -30, opacity: 0, duration: 0.6`)
- On scroll past hero: animate navbar background opacity from transparent → solid (glass-morph intensifies)
- Login popup modal: GSAP `fromTo` scale-up (`scale: 0.9 → 1, opacity: 0 → 1`) with spring ease

### 2.2 Hero section enhancements
**Modify:** `src/app/components/pages/homePage/components/Header.tsx`

- **Text reveal:** Use GSAP `SplitText`-style animation — each word fades + slides up with stagger (already partially done, refine timing)
- **CTA buttons:** Scale up from `0.8` with a slight bounce `ease: "back.out(1.7)"` after text finishes
- **Floating cards:** Add a continuous subtle hover animation (y oscillation ±8px, `yoyo: true, repeat: -1, duration: 3`) when idle (before scroll)
- **Background glow:** Gentle pulsing scale animation on the gold blur circle (`scale: 1 → 1.1, repeat: -1, yoyo: true`)

### 2.3 Features section — staggered scroll reveal
**Modify:** `src/app/components/pages/homePage/components/Features.tsx`

- Section heading: fade-up + gold divider width animation (0 → 80px) with `ScrollTrigger`
- Feature cards: staggered reveal from bottom (`y: 60, opacity: 0, stagger: 0.15`), triggered when section enters viewport
- Feature card icons: separate delayed animation — scale pop (`scale: 0 → 1`) after card appears

### 2.4 Game Preview section — parallax + reveal
**Modify:** `src/app/components/pages/homePage/components/GamePreview.tsx`

- **Left column (text):** Fade + slide from left (`x: -40, opacity: 0`) with `ScrollTrigger`
- **Checklist items:** Staggered appearance with checkmark scale-in animation
- **Right column (image):** Subtle parallax (slower scroll) + scale from `0.95 → 1` with slight rotation

### 2.5 Footer — subtle entrance
**Modify:** `src/app/components/pages/homePage/components/Footer.tsx`

- Columns stagger in from bottom on scroll
- Social icons: hover animation with GSAP (scale bounce + color shift) instead of CSS-only transitions
- Divider line: animate width from `0% → 100%`

---

## Phase 3 — Create & Join Page Animations
> *Form elements appear with choreographed timing*

### 3.1 Create Page
**Modify:** `src/app/components/pages/createPage/Create.tsx`

- **Page entrance timeline** (GSAP timeline):
  1. Card container slides up + fades in (`y: 50, opacity: 0, duration: 0.7`)
  2. Breadcrumb appears (`opacity: 0 → 1, x: -10 → 0`)
  3. Title types in effect or reveals word-by-word
  4. Inputs slide in from left with stagger (`x: -30, opacity: 0, stagger: 0.12`)
  5. Buttons pop in with spring ease (`scale: 0.9 → 1, ease: "back.out(1.4)"`)
  6. Info box fades in last with a gentle delay
- **Input focus:** Animate label color + border glow with GSAP on focus (complement existing CSS transitions)
- **Submit button:** Loading state uses a GSAP-animated progress pulse instead of text swap

### 3.2 Join Page
**Modify:** `src/app/components/pages/joinPage/Join.tsx`

- **Page entrance timeline** similar to Create:
  1. Header area slides down
  2. Player name card fades up
  3. "Available Lobbies" heading + badge animate in
  4. Lobby cards stagger in from bottom with slight scale (`scale: 0.95 → 1, y: 30 → 0, stagger: 0.08`)
- **Lobby card hover:** GSAP-driven hover (scale: 1.02, box-shadow increase, icon subtle bounce)
- **Refresh button:** Rotation animation on the RefreshCw icon when clicked
- **Empty state:** Subtle floating animation on the empty state text

---

## Phase 4 — Waiting Room & Game Board Animations
> *The heart of the experience — every interaction feels alive*

### 4.1 Waiting Page
**Modify:** `src/app/components/pages/waitingPage/Waiting.tsx`

- **Page entrance:** Title + status badge animate in with timeline
- **Player boxes:** Stagger in with spring physics (`y: 40, opacity: 0, ease: "back.out(1.2)"`)
- **Empty slot pulse:** Replace CSS `border-dashed` with GSAP-animated border dash offset + gentle scale breathing
- **Player join animation:** When a new player joins, their box scales from 0 and bounces in
- **Start game button:** When enabled (4 players), animate from disabled→enabled with a glow pulse

**Modify:** `src/app/components/pages/waitingPage/components/PlayerBox.tsx`

- Mount animation: slide in from left + fade
- Status dot: pulsing glow effect with GSAP

### 4.2 Game Board
**Modify:** `src/app/components/pages/boardPage/GameBoard.tsx`

- **Board entrance:** Table surface scales in from center (`scale: 0.8 → 1, opacity: 0 → 1, duration: 0.8`)
- **Pulsing ring:** Replace CSS `animate-pulse` with GSAP for smoother, more controlled pulsing

### 4.3 Card Animations
**Modify:** `src/app/components/pages/boardPage/components/Card.tsx`

- **Card deal:** Each card flies from the deck pile to player positions along a bezier curve
- **Card hover (player hand):** Lift + subtle tilt 3D transform, glow underneath
- **Card play:** Fly from hand to center table with rotation, land with a slight bounce

### 4.4 Bidding Panel
**Modify:** `src/app/components/pages/boardPage/components/BiddingPanel.tsx`

- **Panel entrance:** Slide up from bottom + backdrop blur fade, using GSAP timeline
- **Bid buttons:** Staggered scale-in from 0.8 to 1
- **Button press:** Satisfying scale-down/up micro-animation
- **Panel exit (after bid):** Slide down + fade

### 4.5 Game Over Screen
**Modify:** `src/app/components/pages/boardPage/components/GameOverScreen.tsx`

- **Entrance:** Dramatic reveal — background blur fades in, then modal scales + slides up
- **Trophy icon:** Bouncing + glowing animation with GSAP
- **Score counting:** Animate numbers from 0 → final score (GSAP number counter)
- **Winner highlight:** Golden shimmer/glow animation sweeping across the winner card
- **Buttons:** Staggered appearance after scores finish counting

---

## Phase 5 — Error & Not Found Pages
> *Even error states should feel polished*

### 5.1 Error Page
**Modify:** `src/app/components/common/Error.tsx`

- **Container:** Scale-up + fade entrance
- **Icon:** Subtle shake/wobble animation with GSAP
- **Text:** Staggered word reveal
- **Buttons:** Spring-in with delay

### 5.2 Not Found Page
**Modify:** `src/app/components/common/NotFound.tsx`

- **"404" text:** Animated number counter or glitch effect
- **Icon:** Floating/bobbing idle animation
- **Buttons:** Same spring pattern as Error page

---

## Phase 6 — 5 Principles of Design Audit

### 6.1 Copywriting ✍️

| Page | Current Copy | Issue | Proposed Fix |
|------|-------------|-------|-------------|
| **Hero** | "Belote Redefined." | ✅ Strong, concise | Keep |
| **Hero subtitle** | "Invite friends, join lobbies and play with elegance." | Slightly generic | → "Your next game is one click away. Invite friends, create a lobby, and play." |
| **Features heading** | "Crafted for the Best" | Slightly vague | → "Built for Players Who Care" |
| **Features subtitle** | "Every animation and every interaction is designed…" | Self-referential | → "Every detail is designed to keep you in the game." |
| **Feature 1** | "Social Play" / "Free to play with friends and family." | Too brief | → "Play free with friends, family, or anyone online." |
| **Feature 2 desc** | "No lag, no delays…" | Good | Keep |
| **Feature 3 desc** | "Minimalist interface designed to keep your focus…" | Good | Keep |
| **GamePreview** | "The New Standard" | ✅ Good | Keep |
| **Create page** | "Set up your lobby so your friends can join." | ✅ Clear | Keep |
| **Join page** | "Find an open lobby to start your next match." | ✅ Clear | Keep |
| **Waiting** | "The host has to start the game when the lobby is full" | Slightly clunky | → "The host will start the game once all 4 seats are filled." |
| **Results victory** | "Congratulations! Your team emerged victorious." | Slightly stiff | → "You crushed it. Your team takes the win!" |
| **Results defeat** | "Good game! Better luck next time." | Generic | → "Tough break. Rematch?" |

### 6.2 Visuals 🎨

| Area | Current | Improvement |
|------|---------|-------------|
| **Hero cards** | Static positioned cards with hover | Add GSAP idle float + glass reflections |
| **Feature icons** | Plain SVG in colored box | Add subtle gradient backgrounds, animated on scroll |
| **Game preview** | Static screenshot | Add GSAP parallax float + subtle shadow animation |
| **Lobby cards** | Flat white boxes | Add gradient border on hover, subtle inner glow |
| **Waiting empty slots** | Dashed border box | Animated dash pattern + breathing scale |
| **Game board table** | Well-designed already ✅ | Add subtle GSAP ambient light animation |
| **Loading spinner** | Basic SVG | Replace with branded GSAP spinner (card suit rotating) |

### 6.3 Colors 🎨

| Current Palette | Assessment |
|----------------|------------|
| `brand-burnt: #B25B32` | ✅ Strong primary accent |
| `brand-gold: #D4AF37` | ✅ Premium feel |
| `brand-charcoal: #2D2D2D` | ✅ Solid dark |
| `brand-offwhite: #F9F9F7` | ✅ Clean light bg |
| `brand-softgray: #E5E5E1` | ✅ Good section divider |
| `primary: #ec5b13` | ⚠️ Used alongside `brand-burnt` inconsistently |

**Action items:**
- Consolidate `primary (#ec5b13)` and `brand-burnt (#B25B32)` — pick one as the main CTA color, use the other as accent-only
- Add a semantic `success` green (`#22C55E`) and `danger` red (`#EF4444`) for status indicators instead of generic Tailwind colors
- Ensure dark mode uses the **same brand colors** but adjusts surface/text contrast ratios (currently some pages use `dark:bg-background-dark` while others use `dark:bg-brand-charcoal/30` — inconsistent)

### 6.4 Fonts 🔤

| Current Setup | Assessment |
|--------------|------------|
| Poppins (Google Fonts) | ✅ Good choice — geometric, modern |
| `font-display: Poppins` | ✅ Defined in Tailwind config |
| `font-sans: Public Sans` | ⚠️ Imported in Tailwind config but **not loaded** via Google Fonts |
| Body text weight | ⚠️ No explicit base weight set |

**Action items:**
- Either load `Public Sans` from Google Fonts or remove it from config and use `Poppins` everywhere (recommended: **use Poppins only** for consistency — it has all needed weights)
- Set explicit typographic scale in CSS:
  - `h1`: 4xl–8xl (already done ✅)
  - `h2`: 3xl–5xl (already done ✅)
  - Body: `text-base` with `leading-relaxed` globally
  - Labels: `text-xs uppercase tracking-widest` (already consistent ✅)
- Add `font-weight: 400` as base to `body` in `index.css`

### 6.5 Spacing 📐

| Area | Current | Issue | Fix |
|------|---------|-------|-----|
| **Home hero** | `pt-20, gap-24` | ✅ Generous | Keep |
| **Features section** | `pt-10 pb-10` | ⚠️ Feels cramped vs hero | → `py-24` for breathing room |
| **Feature cards** | `gap-12` | ✅ Good | Keep |
| **GamePreview** | `pt-20 gap-16` | ⚠️ Missing bottom padding | → `py-24 gap-16` |
| **Footer** | `pt-10 pb-5` | ⚠️ Top-heavy | → `py-16` |
| **Create page card** | `p-8 md:p-12` | ✅ Good | Keep |
| **Join page** | `py-28` | ✅ Good | Keep |
| **Waiting page** | `py-24 gap-12` | ✅ Good | Keep |
| **Results page** | `py-28 space-y-12` | ✅ Good | Keep |
| **Lobby cards** | `gap-4` | ⚠️ Slightly tight | → `gap-5` |
| **Buttons (CTA)** | `px-8 py-4` | ✅ Apple-like padding | Keep |
| **Input fields** | `pl-12 pr-4 py-4` | ✅ Good | Keep |

---

## Implementation Order

> [!IMPORTANT]
> Recommended execution order for maximum impact with minimum risk:

| Step | Phase | Impact | Risk | Est. Effort |
|------|-------|--------|------|-------------|
| 1 | **6.5** Spacing fixes | Medium | Very Low | 30 min |
| 2 | **6.4** Font cleanup | Low | Very Low | 15 min |
| 3 | **6.3** Color consolidation | Medium | Low | 30 min |
| 4 | **6.1** Copywriting tweaks | Medium | Very Low | 20 min |
| 5 | **Phase 1** Page transitions | 🔥 High | Medium | 1.5 hr |
| 6 | **Phase 2** Home page animations | 🔥 High | Low | 2 hr |
| 7 | **Phase 3** Create & Join animations | High | Low | 1.5 hr |
| 8 | **Phase 4** Waiting + Board animations | 🔥 Highest | Medium | 3 hr |
| 9 | **Phase 5** Error/404 animations | Low | Very Low | 30 min |
| 10 | **6.2** Visual polish (final pass) | High | Low | 1 hr |

**Total estimated effort: ~11 hours**

---

## Technical Notes

> [!TIP]
> - All GSAP animations should use `useGSAP` hook from `@gsap/react` for proper cleanup
> - Use `gsap.context()` scoping to prevent animation leaks between routes
> - `ScrollTrigger` must be registered globally once (already done in Header — ensure it's in a shared location)
> - Consider `gsap.matchMedia()` for responsive animation variants (disable heavy animations on mobile if needed)
> - The `motion` package (Framer Motion) is installed but unused — consider removing it to reduce bundle size, since GSAP covers all needs

> [!WARNING]
> - Page transition system requires careful coordination with TanStack Router's async navigation
> - Card deal animations on the game board must not conflict with SignalR state updates
> - Test all animations in both light and dark mode
