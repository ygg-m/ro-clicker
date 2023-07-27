import { v4 as uuid } from "uuid";
import { useRef, useEffect } from "react";
import { formatTime } from "@/Utils/formatTime";
import useGameStore from "@/Stores/game";

export const Logger = () => {
  const logs = useGameStore((state) => state.logs);

  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logRef.current) return;

    const logElement = logRef.current;

    const isScrolledToBottom =
      logElement.scrollHeight - logElement.clientHeight <=
      logElement.scrollTop + 24;

    isScrolledToBottom &&
      logElement?.scrollTo({ top: logElement.scrollHeight });
  }, [logs]);

  return (
    <div
      ref={logRef}
      className="flex h-64 w-full flex-col overflow-y-auto bg-neutral p-2 duration-200 hover:opacity-30"
    >
      {logs.map((log) => {
        const date = formatTime(log.timestamp);
        return <span key={uuid()}>{`${date} | ${log.message}`}</span>;
      })}
    </div>
  );
};
