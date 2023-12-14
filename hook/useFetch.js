import {useState, useEffect} from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    //TODO: fix data fetching
    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {...query},
        headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.request(options);
            setData(response.data.data);
            setLoading(false)
        } catch (error) {
            setError(error);
            alert('There is an error');
            console.log(error)
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData()
    }, []);

    const refetch = () => {
        setLoading(true)
        fetchData().then()
    }

    return {data, loading, error, refetch}
}

export default useFetch;