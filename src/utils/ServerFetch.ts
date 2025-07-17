export default class ServerFetch {
    private static _ip = import.meta.env.PROD ? '/' : '/api'

    static async post<T>(body: object, type: 'json' | 'text' | 'blob' = 'json'): Promise<[T | string, number]> {
        const res = await fetch(ServerFetch._ip, {
            body: JSON.stringify(body),
            mode: 'cors',
            method: 'post'
        })

        const data: any = await res[type]()
        if(data.error !== undefined) {
            console.error(`Server Error: ${data.error}`)
            return [data.error, res.status]
        }
        return [data, res.status]
    }
}