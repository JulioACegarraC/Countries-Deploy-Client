import axios from 'axios'

export const GET_COUNTRIES = 'GET_COUNTRIES'
export const GET_ACTIVITIES = 'GET_ACTIVITIES'
export const GET_COUNTRIESBYNAME = 'GET_COUNTRIESBYNAME'
export const GET_COUNTRIESBYID = 'GET_COUNTRIESBYID'
export const GET_COUNTRIESBYACTIVITY = 'GET_COUNTRIESBYACTIVITY'
export const FILTER = 'FILTER'
export const ORDER = 'ORDER'
export const ERROR = 'ERROR'
export const NAVIGATE = 'NAVIGATE'

export const getCountries = () => {
    const endpoint = 'http://localhost:3001/countries';
   return async (dispatch) => {
    try {   
        const response = await axios.get(endpoint) 
        const { data } = response
        return dispatch({
            type: GET_COUNTRIES,
            payload: data,
        })
    } catch (error) {
        return dispatch({
            type: ERROR,
            payload: error.response
        })
    }  
   };
}
export const getActivities = () => {
    const endpoint = 'http://localhost:3001/activities';
   return async (dispatch) => {
    try {   
        const response = await axios(endpoint) 
        const { data } = response
        return dispatch({
            type: GET_ACTIVITIES,
            payload: data,
        })
    } catch (error) {
        return dispatch({
            type: 'ERROR',
            payload: error.response.data
        })
    }  
   };
}
export const getByName = (name) => {
    const endpoint = `http://localhost:3001/countries/?name=${name}`;
   return async (dispatch) => {
    try {   
        const response = await axios.get(endpoint) 
        const { data } = response
        return dispatch({
            type: GET_COUNTRIESBYNAME,
            payload: data,
        })
    } catch (error) {
        return dispatch({
            type: ERROR,
            payload: error.response.data
        })
    }  
   };
}
export const loginUser = (email,password) => {
   return async (dispatch) => {
    try {
        const adminsBD = (await axios("http://localhost:3001/administrador")).data
        let access = false;
        for (const admin of adminsBD) {
            if (admin.Email === email && admin.Password === password) {
                access=true;
            }
        }
        return dispatch({
            type:NAVIGATE,
            payload:access
        })
    } catch (error) {
        return dispatch({
            type: ERROR,
            payload: error.response.data
        })
    }  
   };
}
export const getByid = (id) => {
    const endpoint = `http://localhost:3001/countries/${id}`;
    return async (dispatch) => {
    try {   
        const response = await axios.get(endpoint) 
        const { data } = response
        return dispatch({
            type: GET_COUNTRIESBYID,
            payload: data,
        })
    } catch (error) {
        return dispatch({
            type: ERROR,
            payload: error.response.data
        })
    }  
   };
}
export const getActivityByid = (id) => {
    const endpointActivities = `http://localhost:3001/activities/${id}`;
    const endpointCountries = `http://localhost:3001/countries`;
    return async (dispatch) => {
    try {   
        const responseActivities = await axios.get(endpointActivities) 
        const dataActivities = responseActivities.data
        let countriesId =[];
        if(typeof dataActivities === 'object') {countriesId = dataActivities.map( ele => ele.CountryId)}
        const allCountries = (await axios.get(endpointCountries)).data;
        let data =[]
        for ( let i= 0 ; i< countriesId.length ; i++){
            const filter = allCountries.filter(ele => ele.id === countriesId[i])
            if (filter) data.push(filter[0])
        }
        return dispatch({
            type: GET_COUNTRIESBYACTIVITY,
            payload: data,
        })
    } catch (error) {
        return dispatch({
            type: ERROR,
            payload: error.response.data
        })
    }  
   };
}
export const filterCountries = (continent) => {
    return{
        type: FILTER,
        payload: continent
    }
}
export const orderCountries = (orden) => {
    return {
        type: ORDER,
        payload: orden
    }
}