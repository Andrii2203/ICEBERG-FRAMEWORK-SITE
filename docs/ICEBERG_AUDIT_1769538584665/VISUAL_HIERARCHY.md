# Visual Hierarchy

## 1. Primary Focus Areas

**Sprint Title and Timestamp**
- Location: Top left of screen
- Visual Weight: Large, bold text ("2023-06-30T12:31:54+0000")
- Why it attracts attention: Largest text element, positioned at natural reading start point
- Purpose: Immediately identify which sprint is being viewed

**Complete Sprint Button**
- Location: Top right corner
- Visual Weight: Solid button with clear label
- Why it attracts attention: Positioned in action area, contrasts with surrounding elements
- Purpose: Primary call-to-action for sprint completion

**Column Headers (TO DO, IN PROGRESS, DONE)**
- Location: Horizontal row below toolbar
- Visual Weight: Medium text, uppercase, spaced evenly
- Why it attracts attention: Divides the board into clear sections, uppercase draws eye
- Purpose: Organize and categorize task workflow states

**Task Card Titles**
- Location: Top of each card
- Visual Weight: Medium-bold text, larger than other card text
- Why it attracts attention: First readable element on each card
- Purpose: Quick identification of task content

## 2. Secondary Focus Areas

**Sprint Goal Statement**
- Location: Below sprint title
- Visual Weight: Blue colored text, smaller than title
- Why it's secondary: Colored but smaller, provides context rather than action
- Role: Communicate sprint objective

**Label Badges**
- Location: Below task titles on cards
- Visual Weight: Colored backgrounds (purple, blue, red, teal), uppercase text
- Why it's secondary: Bright colors attract attention but smaller size
- Role: Quick visual categorization of task types

**Timer Badge (0 days remaining)**
- Location: Top right, near Complete Sprint button
- Visual Weight: Small text with icon
- Why it's secondary: Important information but small size reduces prominence
- Role: Communicate sprint deadline urgency

**Task IDs (PLAT-17XXX)**
- Location: Bottom right of each card
- Visual Weight: Small text, gray color
- Why it's secondary: Necessary for reference but not primary information
- Role: Unique task identification

**Assignee Avatars**
- Location: Bottom right of each card
- Visual Weight: Small circular images with colored borders
- Why it's secondary: Visual but small, provides context
- Role: Show task ownership

**Status Icons and Metrics**
- Location: Bottom left of each card
- Visual Weight: Small icons (checkmarks, warnings, trends) with numbers
- Why it's secondary: Small size, requires interpretation
- Role: Provide task status and metrics

## 3. Typography

**Size Hierarchy:**
1. Sprint Title: ~24-28px (largest)
2. Column Headers: ~14-16px (medium-large, uppercase)
3. Task Titles: ~14px (medium)
4. Sprint Goal: ~12-13px (small-medium)
5. Label Badges: ~10-11px (small, uppercase)
6. Task IDs: ~11-12px (small)
7. Metrics/Numbers: ~10-11px (small)

**Weight Hierarchy:**
1. Sprint Title: Bold/Heavy
2. Task Titles: Medium/Semi-bold
3. Column Headers: Medium
4. Label Badges: Medium (uppercase compensates)
5. Body Text: Regular
6. Task IDs: Regular

**Contrast:**
- High contrast: Sprint title, column headers, task titles (dark text on light background)
- Medium contrast: Sprint goal (blue text), label badges (white text on colored backgrounds)
- Lower contrast: Task IDs, metrics (gray text)

## 4. Color & Contrast

**Primary Colors:**
- White: Card backgrounds, main background
- Dark Gray/Black: Primary text (titles, headers)
- Blue: Sprint goal text, some label badges, avatar borders
- Purple: Label badges (SERVICE CONNECTOR, ANALYTICS), avatar borders
- Red/Pink: Label badges (CLOUD, PRODUCTS), warning icons
- Teal/Cyan: Label badges (CUSTOMERS, COMMERCE)
- Green: Status checkmark icons, avatar borders

**Contrast Analysis:**
- Text on white background: Excellent contrast (WCAG AAA compliant)
- White text on colored badges: Good contrast on darker colors (purple, blue), potentially lower on lighter teal
- Icons: Green checkmarks provide good contrast, red warnings highly visible

**Accessibility Concerns:**
- Small text on colored badges may be difficult to read for users with visual impairments
- Icon-only indicators without labels may not be accessible to screen readers
- Color-coding alone (without text labels) may be problematic for colorblind users
- Overlapping avatars in toolbar reduce individual visibility

**Color Semantics:**
- Green: Positive/complete (checkmarks)
- Red/Orange: Warning/attention needed
- Blue: Information/neutral
- Purple: Category identifier
- No clear semantic pattern for label badge colors

## 5. Spacing & Alignment

**Vertical Spacing:**
- Header to toolbar: ~20-24px
- Toolbar to column headers: ~16-20px
- Column header to first card: ~12-16px
- Between cards: ~12-16px
- Within cards (title to badge): ~8-10px
- Within cards (badge to bottom elements): ~8-12px

**Horizontal Spacing:**
- Columns: Equal width, ~8-12px gutters between columns
- Card padding: ~12-16px on all sides
- Label badge padding: ~6-8px horizontal, ~4-6px vertical
- Avatar group overlap: ~50% overlap between avatars

**Alignment:**
- Left-aligned: Sprint title, sprint goal, breadcrumbs, task titles, search bar
- Right-aligned: Action buttons (Complete Sprint, Share, More), timer badge, Insights button
- Center-aligned: Column headers (within their columns)
- Card content: Left-aligned text, right-aligned metadata (ID, avatar)

**Grid System:**
- Three-column layout with equal widths
- Consistent card widths within columns
- Vertical rhythm maintained through consistent spacing
- Horizontal alignment across columns creates visual stability

**Spacing Issues:**
- Cards appear tightly packed vertically, reducing breathing room
- Avatar overlap in toolbar may be too aggressive
- Inconsistent spacing between icon groups on cards
- Label badges have varying widths based on text length, creating visual inconsistency