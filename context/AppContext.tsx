import { retrieveData, saveData } from "@/utils/storage";
import { ChecklistType } from "@/utils/types";
import React, { createContext, useEffect, useState } from "react";

type AppContextType = {
  addList: (newList: ChecklistType) => void;
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
          parentTo: [],
        },
        {
          id: "789ghi",
          status: false,
          title: "item 2",
          required: true,
          parentTo: [],
        },
      ],
    },
  ]);
  const listKey = "listList";

  useEffect(() => {
    (async () => {
      try {
        const savedListData = await retrieveData(listKey);
        if (savedListData != null) {
          setLists(savedListData);
        }
      } catch (error) {
        console.warn("An error occurred when retrieving list data");
        console.error(error);
      }
    })();
  }, []);

  const addList = (newList: ChecklistType) => {
    const newLists = [...lists, newList];
    setLists(newLists);
    saveData(listKey, newLists);
  };
  const getLists = () => lists;
  const getListById = (id: string) => lists.find((item) => item.id === id);

  const value = { addList, getLists, getListById };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
