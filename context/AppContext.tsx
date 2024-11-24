import { Checklist } from "@/types";
import React, { createContext, useState, useEffect } from "react";

type AppContextType = {
  getLists: () => Checklist[];
};

export const AppContext = createContext<AppContextType>(
  null as unknown as AppContextType
);

const AppProvider = ({ children }: { children: any }) => {
  const [lists, setLists] = useState<Checklist[]>([
    { id: "123abc", title: "default checklist", items: [] },
  ]);

  const getLists = () => lists;

  const value = { getLists };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
