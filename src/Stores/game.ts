import { Character } from "@/Types/Character/Base"
import { create } from "zustand"
import { CharacterDefault } from "@/Data/DefaultValues"


type State = {
    mainCharacter: Character

}

const useGameStore =  create<State>((set) => ({
    mainCharacter: CharacterDefault,

    updateStats : () => {
        set(state => ({}))
    }
}))