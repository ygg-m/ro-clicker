import { v4 as uuid } from "uuid";
import { useRef, useEffect } from "react";
import { formatTime } from "@/Utils/formatTime";
import useGameStore from "@/Stores/game";
import { ChevronDown } from "@/Assets/UI";

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

  const Tab = ({ name, active }: { name: string, active?: boolean }) => (
    <div className={`bg-neutral cursor-pointer bg-opacity-80 px-2 rounded-t hover:opacity-100 ${!active && 'opacity-60'}`}>{name}</div>
  )

  return (
    <article className="w-full">
      <div className="flex justify-between">
        <div className="flex gap-1 px-2">
          <span className="text-sm px-2 opacity-70">Logger</span>
          <Tab name="General" active /> 
          <Tab name="Combat" /> 
          <Tab name="Item" /> 
          <Tab name="Status" /> 
        </div>

        <div className="flex items-center cursor-pointer bg-neutral bg-opacity-80 px-2 rounded-t hover:opacity-100 opacity-60"><ChevronDown className="h-4 w-4" /></div>
      </div>
    <div
      ref={logRef}
      className="bg-opacity-80 flex h-64 flex-col overflow-y-auto bg-neutral p-2 duration-200"
    >
      {logs.map((log) => {
        const date = formatTime(log.timestamp);
        return <span key={uuid()}>{`${date} | ${log.message}`}</span>;
      })}
    </div>
    </article>
  );
};
