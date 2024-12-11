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

# TODO:

    - update ui for modals
    - give up on snapshot testing for now
    - Make subEntry values work with ChecklistEntryInput and ChecklistEntry
    - make finishing a checklist flashy and cool
    - when a checklist is finished offer to either reset the list to empty, or continue as is
    - prevent making multiple lists with the same title?

# Bugs:

    - when removing entry item on edit or create screens the remaining item(s) title(s) do not update correctly
