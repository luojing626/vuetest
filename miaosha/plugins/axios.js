import * as axios from 'axios'
let options = {}

if (process.server) {
    options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 8080}/api`
}




Vue.prototype.$axios = axios
axios.defaults.withCredentials = true
export default axios.create(options)