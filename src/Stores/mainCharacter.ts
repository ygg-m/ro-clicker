import { Character } from "@/Types/Character/Base"
import { create } from "zustand"
import { CharacterDefault } from "@/Data/DefaultValues"


type State = {
    mainCharacter: Character

}

const useMainCharacterStore =  create<State>((set) => ({
    mainCharacter: CharacterDefault,


    // actions
    basicAttack: () => {
        const randomNumber = Math.random() * (0.2 - -0.8) + -0.8;
        const attack = useMainCharacterStore.getState().mainCharacter.stats.sideStats.attack;
        const randomAttack = Math.floor(attack + attack * randomNumber);


    }, 


    updateStats: () => {
        set(state => ({}))
    }
}))

export default useMainCharacterStore