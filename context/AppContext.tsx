import { retrieveData, saveData } from "@/utils/storage";
import { ChecklistType } from "@/utils/types";
import React, { createContext, useEffect, useState } from "react";

type AppContextType = {
  addList: (newList: ChecklistType) => void;
  deleteList: (list: ChecklistType) => void;
  getLists: () => ChecklistType[];
  getListById: (id: string) => ChecklistType | undefined;
  updateList: (updatedList: ChecklistType) => void;
};

export const AppContext = createContext<AppContextType>(
  null as unknown as AppContextType
);

const AppProvider = ({ children }: { children: any }) => {
  const [lists, setLists] = useState<ChecklistType[]>([]);
  const listKey = "listList";

  useEffect(() => {
    (async () => {
      try {
        const savedListData = await retrieveData(listKey);
        if (savedListData != null) {
          setLists(savedListData);
        } else {
          setLists([
            {
              id: "123abc",
              title: "Example checklist",
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
        }
      } catch (error) {
        console.warn("An error occurred when retrieving list data");
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    saveData(listKey, lists);
  }, [lists]);

  const addList = (newList: ChecklistType) => {
    setLists([...lists, newList]);
  };
  const deleteList = (list: ChecklistType) => {
    setLists(lists.filter((item) => item.id !== list.id));
  };
  const getLists = () => lists;
  const getListById = (id: string) => lists.find((item) => item.id === id);
  const updateList = (updatedList: ChecklistType) => {
    const index = lists.findIndex((item) => item.id === updatedList.id);
    setLists(lists.toSpliced(index, 1, updatedList));
  };

  const value = { addList, deleteList, getLists, getListById, updateList };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
