import { CloseIcon } from "@/Assets/UI";
import { EquipmentSlotTypes } from "@/Types/Character/Equipment";
import { ItemTypes } from "@/Types/Item";
import { click } from "@testing-library/user-event/dist/click";

type DetailWindowProps = {
  x: number;
  y: number;
  onClose: () => void;
  equipData?: EquipmentSlotTypes;
  itemData?: ItemTypes;
};

export const DetailWindow = ({
  x,
  y,
  onClose,
  equipData,
  itemData,
}: DetailWindowProps) => {
  return (
    <div style={{ left: x, top: y }} className="absolute z-[100]">
      {equipData ? <EquipmentDetailWindow data={equipData} /> : <></>}
      <button
        onClick={onClose}
        className="bg-menu-header-button absolute right-1 top-1 grid h-3 w-3 place-items-center rounded-full outline outline-1 outline-gray-500 duration-100 hover:text-blue-50"
      >
        <CloseIcon className="h-3 w-3" />
      </button>
    </div>
  );
};

const EquipmentDetailWindow = ({ data }: { data: EquipmentSlotTypes }) => {
  const {
    id,
    type,
    subtype,
    name,
    location,
    defense,
    property,
    weight,
    weaponLevel,
    requiresLevel,
    usableBy,
    cardSlots,
    portrait,
    description,
  } = data.itemData;
  const { upgradeLevel, cards } = data;

  const Name = () => (
    <div className="flex gap-1 pt-1">
      <span>{name}</span>
      <span>{cardSlots > 0 ? `[${cardSlots}]` : null}</span>
      <span>+{upgradeLevel}</span>
    </div>
  );

  return (
    <div className="grid gap-2">
      <div className="z-0 pr-1 grid min-h-[280px] w-full max-w-[280px] grid-cols-[87px_1fr] rounded border border-gray-400 bg-gray-50 text-sm text-gray-800 shadow-2xl outline outline-2 outline-gray-50 pb-4">
        <img
          src={portrait}
          alt=""
          className="ml-[5px] mt-[5px] border border-gray-400 shadow"
        />
        <div className="flex flex-col gap-1 pr-1">
          <Name />

          <p className="border-b border-dashed border-gray-300 pb-1">
            {description}
          </p>

          <p className="text-xs text-gray-400">ID: {id}</p>
          <p>
            <span className="text-gray-500">Type:</span> {type}{" "}
            {type !== "Armor" && <span>({subtype})</span>}
          </p>
          {type !== "Armor" ? (
            <p>Weapon Level: {weaponLevel}</p>
          ) : (
            <p>Armor Level: {weaponLevel}</p>
          )}
          {location && <p>Equip at: {location}</p>}
          {defense > 0 && <p>Defense: {defense}</p>}
          {property !== "Neutral" && <p>Property: {property}</p>}
          <p>Weight: {weight}</p>
        </div>

        <header className="bg-lines absolute -z-10 h-[25px] w-[99%] rounded-t border-b border-gray-400" />
      </div>

      {cardSlots > 0 && (
        <div className="z-10 flex rounded border border-gray-400 bg-gray-50 px-1 text-sm text-gray-800 shadow-2xl outline outline-2 outline-gray-50">
          {cards.length > 0 && <></>}
          <EmptyCardslots cardSlots={cardSlots}/>
        </div>
      )}
    </div>
  );
};

const EmptyCardslots = ({cardSlots}: {cardSlots:number}) => {
  const emptySlots = []

  for (let i = 0; i < cardSlots; i++) {
    emptySlots.push(<img src={require("@/Assets/UI/card-slot.png")} alt="" className="opacity-30" />)
  }

  return <>{emptySlots}</>
}