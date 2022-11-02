import axios from "axios";
import cookieUtil from "src/util/cookieUtil";
import { ECookieName } from "src/util/utilModel";
import config from './config'


const options = {
    timeout: 0,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookieUtil.get(ECookieName.COOKIE_TOKEN)}`
    }
}

const loader = document.querySelector('.globalLoader');

const api = axios.create({
    baseURL: config.affiliateApiUrl,
    ...options
});


api.interceptors.request.use(function (config) {
    if (loader) { loader.classList.add('globalLoaderShow') }
    return config;
}, function (error) {
    // Do something with request error
    if (loader) { loader.classList.remove('globalLoaderShow') }
    return Promise.reject(error);
});

api.interceptors.response.use(function (response) {
    if (loader) { loader.classList.remove('globalLoaderShow') }
    return response;
}, function (error) {
    if (loader) { loader.classList.remove('globalLoaderShow') }
    return Promise.reject(error);
});

api.interceptors.response.use((response) => response, (error) => {
    // whatever you want to do with the error
    let responseCode = error.response ? error.response.status : null;
    throw error;
  });

// LOGIN API STARTS HERE

export const login = (params) => {
    return api.post('/Account/credentialAccess', params)
}

// LOGIN API ENDS HERE

//EMPLOYEES API STARTS
export const getEmployeeDetails = (params) => {
       return api.get(`/EmployeeAPI/LoadEmployeeList?PageCount=${params.page}&PageLimit=${params.limit}`)
}

export const getEmployeeDetailsCSV = () => {
    return api.get(`/EmployeeAPI/LoadEmployeeList`)
}

export const getEmployeeDetailsById = (params) => {
    return api.get(`/EmployeeAPI/LoadEmployeeDetails?Employee_ID=${params}`, params)
}
export const saveEmployee = (params) => {
    return api.post(`/EmployeeAPI/SaveEmployee`, params)
}
//EMPLOYEES API ENDS

//CUSTOMERS API STARTS
export const getCustomersList = (params) => {
        return api.get(`/PartnerAPI/LoadCustomerList?PageCount=${params.page}&PageLimit=${params.limit}`)
}

export const getCustomerDetailsCSV = () => {
    return api.get(`/PartnerAPI/LoadCustomerList`)
}

export const getCustomerById = (params) => {
    return api.get(`/PartnerAPI/LoadCustomerDetails?Customer_Id=${params}`, params)
}
export const getCustomerAddressInfo = (params) => {
    return api.get(`/PartnerAPI/LoadCustomerAddressDetails?Customer_Id=${params}`, params)
}
export const getCustomerRemarks = (params) => {
    return api.get(`/PartnerAPI/LoadCustomerRemarks?Customer_Id=${params}`, params)
}
export const getCustomerExtras = (params) => {
    return api.get(`/PartnerAPI/LoadCustomerExtraInfo?Customer_Id=${params}`, params)
}

export const saveCustomers = (params) => {
    return api.post('PartnerAPI/SavePartner', params)
}

//CUSTOMERS API ENDS

//MASTER API STARTS

export const loadMaster = (params) => {
    return api.get(`/MaterAPI/LoadMultipleMaster?MasteType=${params}`, params)
}

//MASTER API ENDS

export default api;