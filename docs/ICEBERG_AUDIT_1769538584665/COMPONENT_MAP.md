# Component Map

## 1. Component List

### Navigation & Header Components
1. **Breadcrumb Navigation**
   - Type: Navigation
   - Role: Show hierarchical location (Projects / Platform Development / PLAT board)
   - State: Default

2. **Sprint Title**
   - Type: Text heading
   - Role: Display sprint identifier with timestamp
   - State: Default

3. **Sprint Goal Text**
   - Type: Text paragraph
   - Role: Display sprint objective
   - State: Default (blue colored text)

4. **Search Icon**
   - Type: Icon button
   - Role: Trigger search functionality
   - State: Default

5. **Star Icon**
   - Type: Icon button
   - Role: Favorite/bookmark the board
   - State: Default (unfilled)

6. **Timer Badge**
   - Type: Badge
   - Role: Display sprint time remaining
   - State: Default (shows "0 days remaining")

7. **Complete Sprint Button**
   - Type: Button
   - Role: Primary action to complete sprint
   - State: Default

8. **Share Button**
   - Type: Icon button
   - Role: Share board with others
   - State: Default

9. **More Options Menu**
   - Type: Icon button (ellipsis)
   - Role: Access additional options
   - State: Default

### Toolbar Components
10. **Search Bar**
    - Type: Text input
    - Role: Search within board
    - State: Default (placeholder: "Search this board")

11. **Search Submit Button**
    - Type: Icon button
    - Role: Submit search query
    - State: Default

12. **Avatar Group**
    - Type: Avatar stack
    - Role: Display team members
    - State: Default (5 overlapping avatars visible)

13. **Only My Issues Filter**
    - Type: Toggle button
    - Role: Filter to show user's assigned tasks
    - State: Default (inactive)

14. **Recently Updated Filter**
    - Type: Toggle button
    - Role: Filter to show recently modified tasks
    - State: Default (inactive)

15. **Insights Button**
    - Type: Button
    - Role: Access board analytics
    - State: Default

### Column Components
16. **TO DO Column Header**
    - Type: Column header
    - Role: Label for backlog tasks
    - State: Default

17. **IN PROGRESS Column Header**
    - Type: Column header
    - Role: Label for active tasks
    - State: Default

18. **DONE Column Header**
    - Type: Column header
    - Role: Label for completed tasks
    - State: Default

### Task Card Components (Repeated Pattern)
Each task card contains:

19. **Task Card Container**
    - Type: Card
    - Role: Container for task information
    - State: Default (white background, subtle shadow)

20. **Task Title**
    - Type: Text heading
    - Role: Display task name
    - State: Default

21. **Label Badge**
    - Type: Badge
    - Role: Categorize task type
    - State: Default (various colors: purple, blue, red, teal)
    - Variants: SERVICE CONNECTOR, MARKETING CAMPAIGN LAUNCH, CLOUD, ANALYTICS, NOTIFICATIONS, PRODUCTS, CUSTOMERS, COMMERCE

22. **Status Icon (Checkmark)**
    - Type: Icon
    - Role: Indicate task status
    - State: Default (green checkmark)

23. **Warning Icon**
    - Type: Icon
    - Role: Indicate issues or blockers
    - State: Default (red/orange)

24. **Trending Icon**
    - Type: Icon
    - Role: Show trend direction
    - State: Default (up or down arrow)

25. **Numeric Badge**
    - Type: Badge
    - Role: Display count metric
    - State: Default (shows numbers 2-8)

26. **Task ID Link**
    - Type: Link
    - Role: Unique task identifier
    - State: Default (format: PLAT-17XXX)

27. **Assignee Avatar**
    - Type: Avatar
    - Role: Show task assignee
    - State: Default (circular with colored border)

## 2. Component Groups

### Primary Components
- Task Cards (9 instances)
- Column Headers (3 instances)
- Complete Sprint Button
- Search Bar

### Secondary Components
- Filter Buttons (Only My Issues, Recently Updated)
- Avatar Group
- Insights Button
- Sprint Timer Badge

### Layout Components
- Breadcrumb Navigation
- Column Containers (3 instances)
- Header Container
- Toolbar Container

### Interactive Components
- All Buttons (Complete Sprint, Share, More Options, Filters, Insights)
- Search Input
- Task Cards (draggable)
- Icon Buttons (Search, Star)

### Informational Components
- Sprint Title
- Sprint Goal Text
- Task Titles
- Task IDs
- Label Badges
- Status Icons
- Numeric Badges
- Timer Badge

## 3. Notes

**Identified Patterns:**
- Consistent card structure across all 9 tasks
- Repeated use of colored label badges for categorization
- Standard avatar + task ID pattern on every card
- Icon + number combination for metrics

**Repeating Elements:**
- Task card layout (9 times)
- Label badges (8 different types)
- Status icons (checkmarks, warnings, trends)
- Assignee avatars (multiple instances)
- Numeric indicators

**Inconsistencies:**
- Label colors don't follow a clear semantic system
- Some cards have warning icons, others don't
- Numeric values vary without clear pattern (2, 3, 4, 5, 6, 8)
- Avatar border colors vary (blue, purple, green) without apparent meaning
- Icon combinations differ between cards (some have checkmark + trend, others just checkmark)