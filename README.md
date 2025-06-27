Features Documentation:

Changes from week 6/23:
Task Listing & Management UI:
- Removed delete button from EditTask.js page.
- Added delete button on TaskCard.js only for tasks with status Completed, opens a confirmation Dialog calls onDelete(task.id) prop.
- Linkable Cards: TaskCard is now a <Link> to /tasks/{id}, except delete button is clickable.

Task Detail/Edit Page:
Major overhaul for EditTask.js page:
Split into three components to show three cards.
- NameDescription.js: card to display task name and description with editable functionality.
- DateStatus.js: card to display dateCreated & status with editable functionality.
- Assignees.js: card to display current assignees as chips where each chip is clickable to show employee details. Assignees can be removed by clicking the x icon and the "Add New" button opens a dialog to pick from available employees.