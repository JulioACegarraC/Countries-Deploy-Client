import axios from 'axios';
import { useState,useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { getCountries } from '../../redux/actions/index'
import {validacion} from '../../validation';
import './Create.css'

function Create() {
  let allCountries = useSelector((state) => state.allCountries);
  let ordered=[];
  let [creada,setCreada] = useState (false);
  let [error,setError] = useState (false);
  let [errorMessage,setErrorMessage] = useState ('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountries());
  }, []);
  
  const ordenarCountries = (allCountries)=> { 
    if (allCountries){
      ordered = allCountries.sort((a,b)=> a.name.localeCompare(b.name));
    }
  }
  ordenarCountries(allCountries)
  let [errors,setErrors] = useState({
    name:"Campo Requerido",
    dificulty:"Campo Requerido",
    duration:"Campo Requerido",
    season:"Campo Requerido",
    CountryId:"Campo Requerido",
  })
  let [activityData,setActivityData] = useState({
    name:"",
    dificulty:"",
    duration:"",
    season:"",
    CountryId:[],
  });
  
  const onChange = (evento) => {
    let {value,name} = evento.target;
    if (name !== 'CountryId') {
      setActivityData ({...activityData, [name]:value});
      setErrors(
        validacion({
            ...activityData,
            [name]: value
        })
      )
    } else {
      if (activityData.CountryId.includes(value)) {
        setActivityData ({...activityData, [name]:activityData[name].filter(ele => ele !== value)});
        setErrors(
          validacion({
              ...activityData,
              [name]:activityData[name].filter(ele => ele !== value)
          })
        );
      } else {
        setActivityData ({...activityData, [name]:[...activityData[name],value]});
        setErrors(
          validacion({
              ...activityData,
              [name]:[...activityData[name],value]
          })
        );
      }
    }
}
  async function postActivity (activityData) {
    try {
       const URL = 'http://localhost:3001/activities';
       const data = (await axios.post( URL , activityData)).data
       return data;
      } catch (error) {
        return (error.message);
      }
    }
    const handleSubmit = async (evento) => {
      evento.preventDefault();
      const response = await postActivity(activityData);
      if (response.name===activityData.name) {
        setCreada(true);
      } else {
        setError(true);
        setErrorMessage('Actividad y País/es duplicados...No se ha creado la Actividad')
      }
    }
const handleCreada = (evento) => {
  document.getElementById('myform3').reset();
  setErrors({
    name:"Campo Requerido",
    dificulty:"Campo Requerido",
    duration:"Campo Requerido",
    season:"Campo Requerido",
    CountryId:"Campo Requerido",
  })
  setActivityData({
    name:"",
    dificulty:"",
    duration:"",
    season:"",
    CountryId:[],
  })
  setCreada(false);
}
const handleError = (evento) => {
  document.getElementById('myform3').reset();
  setErrors({
    name:"Campo Requerido",
    dificulty:"Campo Requerido",
    duration:"Campo Requerido",
    season:"Campo Requerido",
    CountryId:"Campo Requerido",
  })
  setActivityData({
    name:"",
    dificulty:"",
    duration:"",
    season:"",
    CountryId:[],
  })
  setError(false);
  setErrorMessage('');
}


  return (
    <div className='create-container'>
      {creada===true?<div className='create-modal-creada'>
        <p>{'Actividad Creada con Exito'}</p>
        <button onClick={handleCreada}>OK</button>
      </div>:null}
      {error===true?<div className='create-modal-error'>
        <p>{errorMessage}</p>
        <button onClick={handleError}>OK</button>
      </div>:null}
      <form id='myform3' onSubmit={handleSubmit}>
        <div className='create-form'>
          <h1>Crea una nueva Actividad Turistica</h1>
          {!errors.name && !errors.dificulty && !errors.duration && !errors.season && !errors.CountryId?<button  >Crear</button>:null}
          <div className='create-text-inputs'>
            <div className='inputs'>
              <label >Nombre de la Actividad</label>
              <input name='name' type="text" placeholder='nombre de la Actividad' onChange={onChange}/>
              <p>{errors.name && errors.name}</p>
            </div>
            <div className='inputs'>
              <label >Dificultad</label>
              <input name='dificulty' type="text" placeholder='nivel de dificultad escala de 1-5' onChange={onChange}/>
              <p>{errors.dificulty && errors.dificulty}</p>
            </div>
            <div className='inputs'>
              <label >Duracion</label>
              <input name='duration' type="text" placeholder='tiempo en cantidad de horas' onChange={onChange}/>
              <p>{errors.duration && errors.duration}</p>
            </div>
            <div className='inputs'>
              <label >Temporada</label>
              <input name='season' type="text" placeholder='Verano || Otoño || Invierno || Primaver' onChange={onChange}/>
              <p>{errors.season && errors.season}</p>
            </div>
          </div>
          {errors.CountryId && errors.CountryId?<p className='p-paises'>{errors.CountryId}</p>:null}
          <fieldset key='container-paises' className='paises'>
            {ordered?.map(country => 
              <div key={`container${country.id}`} className='paises-container'>
                <input key={country.id} type="checkbox" name="CountryId" onChange={onChange} value={country.id}  />
                <label key={country.name} for={country.id}>{country.name}</label>
                <img  className='flag'  src={country.flag} alt={country.id} />
              </div>)}
          </fieldset>
        </div>
      </form>
    </div>
  )
}

export default Create