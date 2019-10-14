import axios from 'axios'

console.log(process.env)

export default axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
        common: {'Authorization': `bearer ${process.env.REACT_APP_API_KEY}`}
    }
})