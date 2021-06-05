import {useState, useEffect} from 'react';
import axios from 'axios';

const useFlip = (initialFlipState = true) => {
    // set state with useState
    const [isFlipped, setIsFlipped] = useState(initialFlipState);
    // set function flip
    const flip = () => {
        setIsFlipped(isUp => !isUp);
    };

    return [isFlipped, flip];
}

const useAxios = (keyInLs, baseUrl) => {
    const [responses, setResponses] = useLocalStorage(keyInLs);

    // get a new response and update the responses
    const addResponseData = async (formatter = data => data, restUrl = "") => {
        const currentResponse = await axios.get(`${baseUrl}${restUrl}`);
        setResponses(currentResponses => [...currentResponses, formatter(currentResponse.data)]);
    };

    // empty the state array
    const removeResponses = () => setResponses([]);

    return [responses, addResponseData, removeResponses];
}


const useLocalStorage = (key, initialValue = []) => {
    if(localStorage.getItem(key)) {
        initialValue = JSON.parse(localStorage.getItem(key));
    }
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}

// export default useLocalStorage;

export {useFlip, useAxios, useLocalStorage};