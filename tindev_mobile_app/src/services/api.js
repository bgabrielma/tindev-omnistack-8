import { Platform } from 'react-native'
import { AUTH_SECRET } from 'react-native-dotenv'
import axios from 'axios'

export default axios.create({
    baseURL: Platform.OS === 'ios' ? 'http://localhost:3333' : 'http://10.0.3.2:3333',
    headers: {
        common: {
          Authorization: `bearer ${AUTH_SECRET}`
        }
    }
})