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
export const deletePo = params => { return axios.post(`${host}/api/mainpo/delete`, params) }
export const queryDecl = params => { return axios.post(`${host}/api/mainpo/queryDeclitem`, params) }
export const savePo = params => { return axios.post(`${host}/api/mainpo/save`, params) }
export const getComcode = params => { return axios.post(`${host}/api/mainpo/getComcode`, params) }
export const getUser = params => { return axios.get(`${host}/api/values`) }
export const getPrePO = params => { return axios.post(`${host}/api/mainpo/GetPrePO`, params) }
export const queryPR = params => {return axios.post(`${host}/api/mainpo/queryPR`, params) }
