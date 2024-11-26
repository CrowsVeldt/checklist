import { ChecklistType } from "@/types";
import React, { createContext, useState } from "react";

type AppContextType = {
  getLists: () => ChecklistType[];
  getListById: (id: string) => ChecklistType | undefined;
};

export const AppContext = createContext<AppContextType>(
  null as unknown as AppContextType
);

const AppProvider = ({ children }: { children: any }) => {
  const [lists, setLists] = useState<ChecklistType[]>([
    {
      id: "123abc",
      title: "default checklist",
      entries: [
        {
          id: "456def",
          status: false,
          title: "item 1",
          required: true,
          childOf: undefined,
          parentTo: undefined,
        },
        {
          id: "789ghi",
          status: false,
          title: "item 2",
          required: true,
          childOf: undefined,
          parentTo: undefined,
        },
      ],
    },
    {
      id: "890xyz",
      title: "default checklist 2",
      entries: [
        {
          id: "567uvw",
          status: false,
          title: "item 1",
          required: true,
          childOf: undefined,
          parentTo: undefined,
        },
      ],
    },
  ]);

  const getLists = () => lists;
  const getListById = (id: string) => lists.find((item) => item.id === id);

  const value = { getLists, getListById };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
