import axios from 'axios'

// let host = 'http://172.20.168.57/ericapi'
let host = 'http://localhost:54346'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

export const queryZL11 = params => {
    return axios.post(`${host}/api/zl11/query`, params, {
        baseURL: '/api',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
export const deleteZL11 = params => { return axios.post(`${host}/api/zl11/delete`, params) }
export const queryDecl = params => { return axios.post(`${host}/api/mainpo/queryDeclitem`, params) }
export const saveZL11 = params => { return axios.post(`${host}/api/zl11/Save`, params) }
export const getComcode = params => { return axios.post(`${host}/api/mainpo/getComcode`, params) }
export const lockZL11 = params => { return axios.post(`${host}/api/zl11/LockClick`, params) }

