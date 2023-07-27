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

function App() {
  const game = useGameStore((state) => state);
  const page = usePageStore(state => state)

  return (
    <div className="grid grid-cols-2">
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
      <BasicInfo />
      <Status />
      <Equipment />
      <div className="z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden">
        <button className="btn" onClick={() => game.updateStats()}>update</button>
      
        <Logger />
        <div className="flex gap-2">
          <Player />
          <div onClick={() => game.basicAttack()}>
            <Enemy />
          </div>
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
      </div>
    </div>
  );
}

export default App;
