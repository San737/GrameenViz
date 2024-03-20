"use client";

import { createContext, useContext, useState } from "react";

type queryType = {
  key: string;
  value: string;
};

type contextType = {
  query: queryType;
  setQuery: (query: queryType) => void;
};

const QueryContext = createContext<contextType | null>(null);

export default function QueryContectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState<queryType>({ key: "", value: "" });

  return (
    <QueryContext.Provider
      value={{
        query,
        setQuery,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
}

export function useQuery() {
  const context = useContext(QueryContext);

  if (context === null) {
    throw new Error("useQuery must be used within a QueryContextProvider");
  }

  return context;
}
