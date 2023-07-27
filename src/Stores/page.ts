import { create } from "zustand"
import { EquipmentSlotTypes } from "@/Types/Character/Equipment";
import { ItemTypes } from "@/Types/Item";

interface DetailWindowData {
  x: number;
  y: number;
  equipData?: EquipmentSlotTypes,
  itemData?: ItemTypes
};

interface State {
  detailWindows: DetailWindowData[];
  handleDetailWindow: (e: React.MouseEvent,
    equipData?: EquipmentSlotTypes,
    itemData?: ItemTypes) => void;
  handleCloseDetailWindow: (index: number) => void;
}

const usePageStore = create<State>((set) => ({
  detailWindows: [],
  handleDetailWindow: (
    e: React.MouseEvent,
    equipData?: EquipmentSlotTypes,
    itemData?: ItemTypes
  ) => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    const detailData: DetailWindowData = { x, y };
    if (equipData) {
      detailData.equipData = equipData;
    } else if (itemData) {
      detailData.itemData = itemData;
    }
    set((state) => ({ detailWindows: [...state.detailWindows, detailData] }));
  },
  handleCloseDetailWindow: (index: number) => {
    set((state) => ({
      detailWindows: state.detailWindows.filter((_, i) => i !== index),
    }));
  },
}));

export default usePageStore