import { MILLSECONDS_IN_SECOND, UPDATE_PER_SECONDS as UPDATE_PER_SECOND } from './consts'
import ObjectValidator from './ObjectValidator'
import { webSocketMessageSchema } from './schemas'
import type { WebSocketMessage } from './types'

type Callback<T> = (data: T) => void | Promise<void>
type Listener = { name: string, callback: Callback<any> }

export default class WebSocketManager {
    private static _ip = import.meta.env.PROD ? '/ws' : '/api/ws'
    private static _webSocket = new WebSocket(this._ip)

    private static _listeners: Record<string, Listener | undefined> = {}
    private static _isCreatedListener = false

    private static _createListeners() {
        if (this._isCreatedListener) return
        this._isCreatedListener = true

        this._webSocket.addEventListener('message', e => {
            try {
                const parsedValue: WebSocketMessage<any> = JSON.parse(e.data)
                if (!ObjectValidator.isValidatedObject(parsedValue, webSocketMessageSchema)) {
                    throw new Error(`Wrong message`)
                }

                const listener = this._listeners[parsedValue.type]
                if (listener) {
                    listener.callback(parsedValue.data)
                }
            }
            catch (e) {
                console.error(e)
            }
        })

        this._webSocket.addEventListener('error', e => {
            console.error('websocket error', e)
            this._webSocket = new WebSocket(this._ip)
        })

        this._webSocket.addEventListener('close', _ => {
            this._webSocket = new WebSocket(this._ip)
        })
    }

    static send<T>(name: string, data: T): void {
        const send = (id?: number) => {
            if (this._webSocket.readyState != WebSocket.OPEN) return false

            this._webSocket.send(JSON.stringify({ [name]: data }))
            console.log({
                data,
                name,
                title: 'WebSocketManager.send'
            })
            if (id) clearInterval(id)

            return true
        }

        if (send()) return
        let id = setInterval(() => {
            send(id)
        }, MILLSECONDS_IN_SECOND * UPDATE_PER_SECOND)
    }

    static on<T>(
        name: string,
        callback: Callback<T>
    ): void {
        this._createListeners()

        this._listeners[name] = {
            name,
            callback: data => {
                console.log({
                    data,
                    name,
                    title: 'WebSocketManager.on'
                })
                callback(data)
            }
        }
    }

    static off(name: string): void {
        this._listeners[name] = undefined
    }
}