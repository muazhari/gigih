import React from 'react'
import axios from "axios";

export type UseFetchType = [
        any | undefined,
    boolean,
        Error | undefined
]

export default function useFetch(url: string, method: string, body: any): UseFetchType {
    const [data, setData] = React.useState<any | undefined>()
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<Error | undefined>()

    React.useEffect(() => {
        axios
            .create({
                baseURL: url,
            })
            .request({
                method: method,
                data: body
            })
            .then((result) => {
                return result.data
            })
            .then((result) => {
                setData(result)
            })
            .catch((error: Error) => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [url, method, body])

    return [
        data,
        loading,
        error
    ]
}
