export default class ServerFetch {
    private static _ip = import.meta.env.PROD ? '/' : '/api'

    static async post<T>(body: object): Promise<[T | string, number]> {
        const res = await fetch(ServerFetch._ip, {
            body: JSON.stringify(body),
            mode: 'cors',
            method: 'post'
        })

        const data: T & {error?: string} = await res.json()
        if(data.error !== undefined) {
            console.error(`Server Error: ${data.error}`)
            return [data.error, res.status]
        }
        return [data, res.status]
    }
}