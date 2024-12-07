# Screens:

    Main
    Checklist
    Create
    Settings?
    EditList?

# Components:

    AddButton
    ChecklistEntry
    ChecklistEntryInput
    ChecklistLink

# Context:

    Checklists list

# Features:

    - User may change entry hierarchies by dragging and dropping entries to the desired position
    - UI elements will scale in size to match device font scaling
    - When a checklist is complete (all required boxes have been checked) display "checklist complete"

# TODO:

    - Make subEntry values work with ChecklistEntryInput and ChecklistEntry
    - disable create/edit checklist button for list without any items
    - give up on snapshot testing for now

# Bugs: 
    - when removing entry item on edit or create screens the remaining item(s) title(s) do not update correctly
    - when checklistiteminput is pressed it sets the curser at the beginning of the text
