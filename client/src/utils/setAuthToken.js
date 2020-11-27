import axios from 'axios';

const setAuthToken = token => {
    if(token) {
        // If token exist, Apply token to every request
        axios.defaults.headers.common['Authorization'] = token;
    }else {
        // If the token doesn't exist, Delete the authentication header
        delete axios.defaults.headers.common['Authorization']
    }
}

export default setAuthToken;