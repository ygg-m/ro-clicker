import { BasicInfo } from "./Components/BasicInfo";
import { DetailWindow } from "./Components/DetailWindow";
import { Enemy } from "./Components/Enemy";
import { Equipment } from "./Components/Equipment";
import { Logger } from "./Components/Logger";
import { Player } from "./Components/Player";
import { Status } from "./Components/Status";
import { useGame } from "./Context/GameContext/GameContext";

function App() {
  const {
    click,
    count,
    current,
    handleClickerButton,
    powerUpClick,
    detailWindows,
    handleCloseDetailWindow,
    basicAttack,
    logs,
  } = useGame();

  return (
    <div className="grid grid-cols-2">
      <BasicInfo />
      <Status />
      <Equipment />
    <div className="z-0 flex min-h-screen select-none flex-col items-center justify-center overflow-hidden">
      {detailWindows.map((window, i) =>
        window.equipData ? (
          <DetailWindow
            key={i}
            x={window.x}
            y={window.y}
            onClose={() => handleCloseDetailWindow(i)}
            equipData={window.equipData}
          />
        ) : (
          <DetailWindow
            key={i}
            x={window.x}
            y={window.y}
            onClose={() => handleCloseDetailWindow(i)}
            itemData={window.itemData}
          />
        )
      )}

      <Logger />

      <div className="flex gap-2">
        <Player />
        <div onClick={() => basicAttack(5)}>
          <Enemy />
        </div>
      </div>

      <div className="divider" />

      <div className="flex gap-2">
        <button className="btn" onClick={() => handleClickerButton()}>
          Clicker
        </button>
        <button className="btn" onClick={() => powerUpClick(1)}>
          Power Up
        </button>
      </div>

      <div className="divider" />

      <div className="grid place-items-center">
        <span>Current Stats</span>
        <div className="grid grid-cols-3 gap-6">
          <div className="grid bg-gray-900 p-3">
            <span className="opacity-50">Character</span>
            <span>Name: {current.character.name}</span>
            <span>Base Level: {current.character.baseLevel}</span>
            <span>Job Level: {current.character.jobLevel}</span>
            <span>HP: {current.target.healthPoints}</span>
          </div>
          <div className="grid bg-gray-900 p-3">
            <span className="opacity-50">Enemy</span>

            <span>ID: {current.target.id}</span>
            <span>HP: {current.target.healthPoints}</span>
          </div>
          <div className="grid bg-gray-900 p-3">
            <span className="opacity-50">Map</span>

            <span>ID: {current.map.id}</span>
            <span>HP: {current.map.enemiesDefeated}</span>
          </div>
        </div>
      </div>

      <div className="divider" />

      <div>Points: {count.points}</div>
      <div>Click: {count.clicks}</div>

      <div className="divider" />
      <div>Click Power: {click.power}</div>
    </div></div>
  );
}

export default App;
