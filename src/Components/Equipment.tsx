import { useGame } from "@/Context/GameContext/GameContext";
import { EquipmentSlotTypes } from "@/Types/Character/Equipment";
import { DraggableWindow } from "./DraggableWindow";

const PlayerImage = () => {
  return (
    <div className="bg-lines relative z-0 border-l border-r border-gray-400">
      <img
        src={require("@/Assets/Player/Novice/front.png")}
        alt=""
        className="z-10 h-60 w-60 object-cover"
      />
      <div className="absolute bottom-[66px] left-0 right-0 -z-10 mx-auto h-6 w-10 rounded-[100%] bg-gray-900 bg-opacity-20 blur-[2px]" />
    </div>
  );
};

interface EquipmentSlotProps {
  name: string;
  equipment?: EquipmentSlotTypes | null;
}

const EmptySlot = ({ name }: { name: string }) => (
  <div className="relative border-b border-gray-400">
    <div className="flex h-full w-full items-end gap-2 py-2 text-sm hover:bg-gray-100">
      <div className="h-4 w-8 rounded-[100%] bg-blue-200 blur-[2px]" />
      <span className="-mb-1 italic text-gray-400">{name}</span>
    </div>
  </div>
);

const EquipmentSlot = ({ name, equipment }: EquipmentSlotProps) => {
  const { handleDetailWindow } = useGame();

  if (!equipment) return <EmptySlot name={name} />;

  const { sprite, name: equipName, cardSlots } = equipment?.itemData;
  const { upgradeLevel } = equipment;

  return (
    <div
      className="relative cursor-pointer border-b border-gray-400 hover:bg-gray-100"
      onContextMenu={(e) => handleDetailWindow(e, equipment)}
    >
      <div className="absolute z-10 flex h-full w-full items-center gap-3 py-2 text-sm">
        <img src={sprite} alt="" className="pb-1 pl-1" />
        <div className="flex flex-wrap gap-1">
          <span className="">{equipName}</span>
          {cardSlots > 0 ? <span>[{cardSlots}]</span> : null}
          {upgradeLevel > 0 ? <span>+{upgradeLevel}</span> : null}
        </div>
      </div>

      <div className="flex h-full w-full items-end gap-2 py-2 text-sm">
        <div className="h-4 w-8 rounded-[100%] bg-blue-200 blur-[2px]" />
        <span className="-mb-1 font-bold italic text-gray-200">{name}</span>
      </div>
    </div>
  );
};

export const Equipment = () => {
  const { handR, body } = useGame().current.character.equipment;

  return (
    <DraggableWindow title="Equipment" originX={0} originY={450}>
      <div className="grid grid-cols-[0.4fr_0.2fr_0.4fr]">
        <div className="grid grid-rows-5 px-2">
          <EquipmentSlot name="Head (Top)" />
          <EquipmentSlot name="Head (Bottom)" />
          <EquipmentSlot name="Right Hand" equipment={handR} />
          <EquipmentSlot name="Robe" />
          <EquipmentSlot name="Right Accessory" />
        </div>

        <PlayerImage />

        <div className="grid grid-rows-5 px-2">
          <EquipmentSlot name="Head (Middle)" />
          <EquipmentSlot name="Body" equipment={body} />
          <EquipmentSlot name="Left Hand" />
          <EquipmentSlot name="Shoes" />
          <EquipmentSlot name="Left Accessory" />
        </div>
      </div>
    </DraggableWindow>
  );
};
