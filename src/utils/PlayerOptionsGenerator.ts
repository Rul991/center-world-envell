import type CurrentMax from '../interfaces/CurrentMax';
import type PlayerOptions from '../interfaces/PlayerOptions';

export default class PlayerGenerator {
    private static _createCurrentMax(num: number): CurrentMax {
        return {
            current: num,
            max: num
        }
    }

    static message(text: string, status: number, className: string): PlayerOptions {
        const currentMax = PlayerGenerator._createCurrentMax(-status)
        return {id: 0, name: text, mana: currentMax, hp: currentMax, className}
    }

    static frisk(text: string): PlayerOptions {
        return PlayerGenerator.message(text, 200, '-_-')
    }

    static cool(text: string, status: number): PlayerOptions {
        return PlayerGenerator.message(text, status, '^-^')
    }

    static error(status: number, text = 'Не могу получить игроков'): PlayerOptions {
        return PlayerGenerator.message(text, status, '@~@')
    }

    static empty(): PlayerOptions {
        return PlayerGenerator.frisk('Нет активных игроков')
    }
}