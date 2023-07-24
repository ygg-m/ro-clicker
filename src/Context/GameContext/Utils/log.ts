import { useCallback } from "react";
import { useGame } from "../GameContext";

export interface LogEntry {
  timestamp: Date;
  message: string;
}

export function useLogs() {
  const { setLogs } = useGame();

  const addLog = useCallback((message: string) => {
    const entry = {
      timestamp: new Date(),
      message,
    } satisfies LogEntry;

    setLogs((previousLogs: LogEntry[]) => [...previousLogs, entry]);
  }, []);

  return { log: addLog };
}
