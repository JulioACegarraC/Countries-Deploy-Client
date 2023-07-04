
import { GET_COUNTRIES ,ERROR,GET_COUNTRIESBYNAME,GET_COUNTRIESBYID,ORDER,FILTER,GET_ACTIVITIES,GET_COUNTRIESBYACTIVITY,NAVIGATE} from "../actions";
let initialState = {
    render:[],
    allCountries:[],
    countriesByName:[],
    countriesByContinent:[],
    countriesByActivity:[],
    country:[],
    allActivities:[],
    access: '',
    errors:{},
}
function rootReducer(state = initialState , {type , payload}){
    switch (type) {
        case GET_COUNTRIES:
            return {
                ...state,
                allCountries:payload,
                render:payload,
                countriesByActivity:[],
                countriesByContinent:[],
                countriesByName:[],
                country:[],
                errors:{},
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                allActivities:payload
            }
        case GET_COUNTRIESBYNAME:
            let response = [];
            let aTrabajar = [...state.render];
            let filteredName = [];
            if(state.countriesByName.length>0&&state.countriesByContinent.length>0&&state.countriesByActivity.length>0) {
                aTrabajar=[];
                for (const country of state.countriesByActivity) {
                    filteredName=state.countriesByContinent.filter(ele => ele.id===country.id)
                    if(filteredName.length>0) aTrabajar.push(filteredName[0]);
                }
            };
            if(state.countriesByName.length>0&&state.countriesByContinent.length===0&&state.countriesByActivity.length===0) aTrabajar=[...state.allCountries];
            if(state.countriesByName.length>0&&state.countriesByContinent.length>0&&state.countriesByActivity.length===0) aTrabajar=[...state.countriesByContinent];
            if(state.countriesByName.length>0&&state.countriesByContinent.length===0&&state.countriesByActivity.length>0) aTrabajar=[...state.countriesByActivity];
            for (const ele1 of aTrabajar) {
                const filtered = payload.filter(ele => ele.id === ele1.id)
                if(filtered.length>0) response.push(filtered[0])
            }
            if (response.length===0){
                return {
                    ...state,
                    errors:{error:'No existen paises con es nombre, dentro de la busqueda previa'}
                }
            }   else {
                return {
                    ...state,
                    countriesByName:response,
                    render:response
                }
            }
        case GET_COUNTRIESBYID:
            return{
                ...state,
                country:payload
            }
        case FILTER:
            let filtered = [];
            let aTrabajar2 = [...state.render];
            if(state.countriesByName.length>0&&state.countriesByContinent.length>0&&state.countriesByActivity.length>0) {
                aTrabajar2=[];
                for (const country of state.countriesByName) {
                    filtered=state.countriesByActivity.filter(ele => ele.id===country.id)
                    if(filtered.length>0) aTrabajar2.push(filtered[0]);
                }
            };
            if (payload === 'All'&&state.countriesByName.length>0&&state.countriesByContinent.length>0&&state.countriesByActivity.length>0) {
                return {
                    ...state,
                    render:aTrabajar2
                }
            }
            if (payload === 'All'&&state.countriesByName.length===0&&state.countriesByContinent.length>=0&&state.countriesByActivity.length>0) {
                return {
                    ...state,
                    render:state.countriesByActivity
                }
            }
            if (payload === 'All'&&state.countriesByName.length>0&&state.countriesByContinent.length>=0&&state.countriesByActivity.length===0) {
                return {
                    ...state,
                    render:state.countriesByName
                }
            }
            if (payload === 'All'&&state.countriesByName.length===0&&state.countriesByContinent.length>=0&&state.countriesByActivity.length===0) {
                return {
                    ...state,
                    render:state.allCountries
                }
            }
            if(state.countriesByName.length===0&&state.countriesByContinent.length>0&&state.countriesByActivity.length===0) aTrabajar2=[...state.allCountries];
            if(state.countriesByName.length>0&&state.countriesByContinent.length>0&&state.countriesByActivity.length===0) aTrabajar2=[...state.countriesByName];
            if(state.countriesByName.length===0&&state.countriesByContinent.length>0&&state.countriesByActivity.length>0) aTrabajar2=[...state.countriesByActivity];
            filtered = aTrabajar2.filter(country => country.continent === payload)
            if (filtered.length === 0){
                return {
                    ...state,
                    errors:{error:'No existen paises dentro de ese continente, dentro de la busqueda previa'}
                }
            } else {
                return {
                    ...state,
                    countriesByContinent: filtered,
                    render:filtered
                }
            }
        case GET_COUNTRIESBYACTIVITY:
            let aTrabajar3 = [...state.render]
            let filteredActivity=[];
            let respuesta=[];
            if(state.countriesByName.length>0&&state.countriesByContinent.length>0&&state.countriesByActivity.length>0) {
                aTrabajar3=[];
                for (const country of state.countriesByName) {
                    filteredActivity=state.countriesByContinent.filter(ele => ele.id===country.id)
                    if(filteredActivity.length>0) aTrabajar3.push(filteredActivity[0]);
                }
            };
            if (payload.length===0&&state.countriesByName.length>0&&state.countriesByContinent.length>0&&state.countriesByActivity.length>0) {
                return {
                    ...state,
                    render:aTrabajar3
                }
            }
            if(payload.length===0&&state.countriesByName.length===0&&state.countriesByContinent.length===0&&state.countriesByActivity.length>=0){
                return {
                    ...state,
                    render:state.allCountries,
                    countriesByActivity:[],
                }
            }
            if(payload.length===0&&state.countriesByName.length>0&&state.countriesByContinent.length===0&&state.countriesByActivity.length>=0){
                return {
                    ...state,
                    render:state.countriesByName
                }
            }
            if(payload.length===0&&state.countriesByName.length>=0&&state.countriesByContinent.length>=0&&state.countriesByActivity.length>=0){
                return {
                    ...state,
                    render:state.countriesByContinent
                }
            }
            if(state.countriesByName.length===0&&state.countriesByContinent.length===0&&state.countriesByActivity.length>0) aTrabajar3=[...state.allCountries];
            if(state.countriesByName.length>0&&state.countriesByContinent.length===0&&state.countriesByActivity.length>0) aTrabajar3=[...state.countriesByName];
            if(state.countriesByName.length===0&&state.countriesByContinent.length>0&&state.countriesByActivity.length>0) aTrabajar3=[...state.countriesByContinent];

            for (const country of aTrabajar3) {
                filteredActivity= payload.filter(ele => ele.id===country.id);
                if (filteredActivity.length>0) respuesta.push(filteredActivity[0])
            }
            if (respuesta.length === 0){
                return {
                    ...state,
                    errors:{error:'No existen paises con esa actividad, dentro de la busqueda previa'}
                }
            } else {
                return {
                    ...state,
                    countriesByActivity: payload,
                    render:respuesta
                }
            }
        case ORDER:
            let order =[]
            let aTrabajar1 = [...state.render]
            switch (payload) {
                case 'MENOS':
                    order = aTrabajar1.sort((a,b) => a.population - b.population);
                    break;
                case 'MAS':
                    order = aTrabajar1.sort((a,b) => b.population - a.population);
                    break;
                case 'A':
                    order = aTrabajar1.sort((a,b)=> a.name.localeCompare(b.name));
                    break;
                case 'D':
                    order = aTrabajar1.sort((a,b)=> b.name.localeCompare(a.name));
                    break
                default:
                    order = [];
                    break;
            }
            return {
                ...state,
                render: order
            }
        case NAVIGATE:{
            return{
                ...state,
                access:payload,
            }
        }
        case ERROR:
            return {
                ...state,
                errors:payload, 
            }
        default:
            return{ ...state};
    }
}
export default rootReducer;