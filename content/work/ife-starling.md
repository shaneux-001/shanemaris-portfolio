---
tagline: "Designing a dark mode theme for Southwest's in-flight entertainment system — purpose-built for a cabin environment where ambient light and context of use change everything."
eyebrow: UX Designer · Southwest Airlines
role: UX Designer
timeline: 2023–2024
platform: In-Flight Entertainment
readTime: 3 minutes
---

Starling is a dark mode theme for Southwest's in-flight entertainment (IFE) system — the seatback or personal device experience customers use during flights. Designing for IFE is a fundamentally different context than designing for a phone or laptop. The cabin environment, the display hardware, the viewing angles, and the emotional register of the experience all push in directions that standard design system defaults don't anticipate.

## Why dark mode for IFE

At 30,000 feet, cabin lighting changes. Night flights dim the overhead lights and passengers are often trying to watch content or sleep. A bright, white-background interface is jarring in that context — both for the individual using it and for neighbors. Dark mode isn't a preference here; it's the ergonomically correct choice for the environment. Starling was designed from that principle outward.

## The design constraints

IFE displays have different color reproduction characteristics than the calibrated screens designers use. Contrast ratios that look fine on a design tool or browser don't always translate reliably to the range of hardware deployed across a fleet. The Starling token set was built with that variation in mind — more conservative contrast minimums, careful testing against display profiles, and deliberate choices about saturation that hold up across the range of hardware.

## Theming within HDS

Starling was built as a theme layer on top of Heart DS rather than a separate system. The token architecture that HDS established made this feasible — by overriding the semantic color tokens (surface, on-surface, primary, on-primary, etc.) with dark-appropriate values, the same component library renders correctly in the dark context without needing separate component implementations. Starling validated the theming architecture of HDS in a demanding real-world environment.

## Outcome

Starling demonstrated that Heart DS's token layer was robust enough to support genuine theming — a question the team had been working toward since tokens shipped. It also gave Southwest a purpose-built dark experience for IFE that respects the cabin context rather than treating it as a secondary use case.
