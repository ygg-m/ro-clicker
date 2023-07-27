import { create } from "zustand"
import { persist } from "zustand/middleware";
import { EquipmentSlotTypes } from "@/Types/Character/Equipment";
import { ItemTypes } from "@/Types/Item";
import { useRef } from "react";

interface DetailWindowData {
  x: number;
  y: number;
  equipData?: EquipmentSlotTypes;
  itemData?: ItemTypes;
}

interface State {
  // Items Detail Window
  detailWindows: DetailWindowData[];
  handleDetailWindow: (
    e: React.MouseEvent,
    equipData?: EquipmentSlotTypes,
    itemData?: ItemTypes
  ) => void;
  handleCloseDetailWindow: (index: number) => void;

  // Show Page Stuff
  // Stats Above Main Player
  isStatsAbovePlayerActive: boolean;
  showStatsAbovePlayer: () => void;
  hideStatsAbovePlayer: () => void;
  toggleStatsAbovePlayer: () => void;

  // Name Below Main Player
  isNameBelowPlayerActive: boolean;
  showNameBelowPlayer: () => void;
  hideNameBelowPlayer: () => void;
  toggleNameBelowPlayer: () => void;

  // Options Modal
  isOptionsMenuOpen: boolean;
  showOptionsMenu: () => void;
  hideOptionsMenu: () => void;

  // Refs
}

const usePageStore = create<State>()(
  persist(
    (set) => ({
      // Item Details Window
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
        set((state) => ({
          detailWindows: [...state.detailWindows, detailData],
        }));
      },
      handleCloseDetailWindow: (index: number) => {
        set((state) => ({
          detailWindows: state.detailWindows.filter((_, i) => i !== index),
        }));
      },

      // Show Page Stuff
      // Stats Above Main Player
      isStatsAbovePlayerActive: false,
      showStatsAbovePlayer: () => set({ isStatsAbovePlayerActive: true }),
      hideStatsAbovePlayer: () => set({ isStatsAbovePlayerActive: false }),
      toggleStatsAbovePlayer: () =>
        set((state) => ({
          isStatsAbovePlayerActive: !state.isStatsAbovePlayerActive,
        })),

      // Name Below Main Player
      isNameBelowPlayerActive: false,
      showNameBelowPlayer: () => set({ isNameBelowPlayerActive: true }),
      hideNameBelowPlayer: () => set({ isNameBelowPlayerActive: false }),
      toggleNameBelowPlayer: () =>
        set((state) => ({
          isNameBelowPlayerActive: !state.isNameBelowPlayerActive,
        })),

      // Options Modal
      isOptionsMenuOpen: false,
      showOptionsMenu: () => set({ isOptionsMenuOpen: true }),
      hideOptionsMenu: () => set({ isOptionsMenuOpen: false }),
    }),
    { name: "options" }
  )
);

export default usePageStore