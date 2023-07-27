import { BasicInfo } from "./Components/BasicInfo";
import { DetailWindow } from "./Components/DetailWindow";
import { Enemy } from "./Components/Enemy";
import { Equipment } from "./Components/Equipment";
import { Logger } from "./Components/Logger";
import { Player } from "./Components/Player";
import { Status } from "./Components/Status";
import useGameStore from "@/Stores/game";
import { targetList } from "@/Data/EnemyList";
import usePageStore from "./Stores/page";
import { useEffect } from "react";
import { Options } from "./Components/Options";

function App() {
  const game = useGameStore((state) => state);
  const page = usePageStore((state) => state);

  useEffect(() => {
    game.updateStats();
  }, []);

  // todo: show map
  // todo: show skill bar (empty for now)
  // todo: show enemy stats (if have wizzard skill or usable item)
  // todo: inventory window
  // todo: skill window

  return (
    <div className="grid grid-cols-[28rem_1fr]">
      {/* Page Modals */}
      <Options />

      {page.detailWindows.map((window, i) =>
        window.equipData ? (
          <DetailWindow
            key={i}
            x={window.x}
            y={window.y}
            onClose={() => page.handleCloseDetailWindow(i)}
            equipData={window.equipData}
          />
        ) : (
          <DetailWindow
            key={i}
            x={window.x}
            y={window.y}
            onClose={() => page.handleCloseDetailWindow(i)}
            itemData={window.itemData}
          />
        )
      )}

      <div className="z-50 flex flex-col bg-white text-gray-800">
        <BasicInfo />
        <Status />
        <Equipment />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between overflow-hidden">
        <div className="flex h-60 w-full items-center justify-center gap-6 p-4">
          <Player />
          <Enemy />
        </div>

        <div className="divider" />

        <div className="flex gap-2">
          <button
            className="btn"
            onClick={() => game.setMainTarget(targetList[0])}
          >
            Poring
          </button>
          <button
            className="btn"
            onClick={() => game.setMainTarget(targetList[1])}
          >
            Fabre
          </button>
        </div>

        <div className="divider" />

        <div className="grid place-items-center">
          <span>Current Stats</span>
          <div className="grid grid-cols-2 gap-6">
            <div className="grid bg-gray-900 p-3">
              <span className="opacity-50">Enemy</span>

              <span>ID: {game.target.current.id}</span>
              <span>HP: {game.target.current.hp}</span>
            </div>

            <div className="grid bg-gray-900 p-3">
              <span className="opacity-50">Map</span>

              <span>ID: {game.map.id}</span>
              <span>Defeated: {game.map.enemiesDefeated}</span>
            </div>
          </div>
        </div>

        <Logger />

        <img
          className="absolute -z-10 h-full w-full scale-125 object-cover opacity-80 blur-xl"
          src={game.map.data.image}
        />
      </div>
    </div>
  );
}

export default App;
