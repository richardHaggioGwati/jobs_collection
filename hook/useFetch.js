import { useState, useEffect } from "react";
import axios from "axios";
import {RAPID_API_KEY} from '@env'
import {isLoaded} from "expo-font";

const rapidApiKey = RAPID_API_KEY

const useFetch = ({endpoint, query}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {...query},
        headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.request(options)
            setData(response.data.data)

            setLoading(false)
        } catch (error) {
            setError(error)
            alert('They is an error')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData().then()
    }, []);

    const refetch = () => {
        setLoading(true)
        fetchData().then()
    }

    return [data, loading, error, refetch]
}
