import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
        common: {'Authorization': `bearer ${process.env.REACT_APP_API_KEY}`}
    }
})