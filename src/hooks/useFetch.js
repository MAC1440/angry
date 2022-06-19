import { useState, useEffect } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        fetch(url).then(response => {
            if (!response.ok) { throw Error('Error') }
            return response.json()
        }).then(
            (data) => {
                setIsPending(false)
                setData(data)
                setError(null)
            }
        ).catch(
            (error) => {
                setIsPending(false)
                setError(error.message)
            }
        )
    }, [url])

    return { data, isPending, error }

}

export default useFetch