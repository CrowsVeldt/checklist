export type ChecklistType = {
  id: string;
  title: string;
  entries: ChecklistEntryType[] | [];
};

export type ChecklistEntryType = {
  id: string;
  status: boolean;
  title: string;
  required: boolean;
  parentTo: ChecklistEntryType[];
};
