import type CurrentMax from './CurrentMax';

export default interface PlayerOptions {
    id: number
    className: string
    name: string
    hp: CurrentMax,
    mana: CurrentMax
}