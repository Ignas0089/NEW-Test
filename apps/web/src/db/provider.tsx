import { createContext, useContext, useEffect, useState } from "react";
import { getDrizzleClient } from "./client";

type DrizzleClient = Awaited<ReturnType<typeof getDrizzleClient>>;

const DatabaseContext = createContext<DrizzleClient | null>(null);

export function DatabaseProvider({ children }: React.PropsWithChildren) {
  const [client, setClient] = useState<DrizzleClient | null>(null);

  useEffect(() => {
    getDrizzleClient().then(setClient);
  }, []);

  return <DatabaseContext.Provider value={client}>{children}</DatabaseContext.Provider>;
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error("DatabaseProvider is missing from the component tree");
  }
  return context;
}
