export type Checklist = {
  id: string;
  items: ChecklistEntry[];
};

export type ChecklistEntry = {
  id: string;
  status: boolean;
  title: string;
  required: boolean;
  childOf: ChecklistEntry | undefined;
  parentTo: ChecklistEntry | ChecklistEntry[] | undefined;
};
