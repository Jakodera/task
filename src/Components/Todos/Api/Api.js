import axios from 'axios';

const getJsonplaceholderData = async () => {

    let res, err;
    await axios.get('https://jsonplaceholder.typicode.com/todos/?_limit=10')
    .then((response) => {
        res = response;
    })
    .catch((error) => {
        err = { error: error.message || 'Unknown error' };
    });

    return { res, err };
};

export default getJsonplaceholderData;