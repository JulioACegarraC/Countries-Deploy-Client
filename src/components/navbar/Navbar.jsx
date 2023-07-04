import { useState,useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getActivities,getByName,orderCountries,filterCountries,getActivityByid, getCountries } from '../../redux/actions';
import './Navbar.css'

function Navbar({setGrupoCountries}) {
  const dispatch = useDispatch();
  const render = useSelector((state) => state.render);
  const countriesByName = useSelector((state) => state.countriesByName);
  const countriesByContinent = useSelector((state) => state.countriesByContinent);
  const countriesByActivity = useSelector((state) => state.countriesByActivity);
  const allActivities = useSelector((state) => state.allActivities)
  const errors = useSelector((state) => state.errors);
  let [error,setError] = useState(false);
  let [aux,setAux] = useState(false);
  let [searchString, setSearchString] = useState('');

  useEffect(() => {
    dispatch(getActivities());
  }, []);

  useEffect(() => {
    dispatch(getActivities());
  }, [render]);

  useEffect(() => {
    if (countriesByName.length===0) {document.getElementById('myform2').reset();}
    if (countriesByContinent.length===0) document.getElementById('myselect2').selectedIndex = 0;
  },[countriesByActivity,countriesByContinent,countriesByName])




  function handleChange(evento){
    evento.preventDefault();
    setSearchString(evento.target.value);
  }
  function handleSubmit (evento) {
    evento.preventDefault()
    setGrupoCountries(1)
    dispatch(getByName(searchString))
  }
  useEffect(() => {
    if (errors&&errors.error) setError(true)
 }, [errors]);
  const handleOrder = (evento) => {
    setGrupoCountries(1)
    dispatch(orderCountries(evento.target.value))
    if (aux === false) setAux(true);
    else setAux(false);
  }

  const  handleFilter = (evento) => {
    setGrupoCountries(1)
    dispatch(filterCountries(evento.target.value))
  }

  const handleActivities = (evento) => {
    setGrupoCountries(1);
    dispatch(getActivityByid(evento.target.value))
  }
  const searchAllCountries = (evento) => {
    setGrupoCountries(1);
    dispatch(getCountries())
  }
  const handleError = (evento) => {
    document.getElementById('myform2').reset();
    setError(false);
  }

  return (
  <div className='navbar'>
    {error===true?<div className='nav-modal'>
      <p>{errors.error}</p>
      <button onClick={handleError}>OK</button>
    </div>:null}
    <button onClick={searchAllCountries} >Ver all countries</button>
    <form  id="myform2" onSubmit={handleSubmit}>
      <input type="text" placeholder='Paìs que deseas visitar'onChange={handleChange}/>
      <button>Buscar país</button>
    </form >
    <select id='myselect2' onChange={handleFilter}>
      <option key='all' value="All">All</option>
      <option key='africa' value="Africa">Africa</option>
      <option key='antartica' value="Antarctica">Antarctica</option>
      <option key='asia' value="Asia">Asia</option>
      <option key='europa' value="Europe">Europe</option>
      <option key='northamerica' value="North America">North America</option>
      <option key='oceania' value="Oceania">Oceania</option>
      <option key='southamerica' value="South America">South America</option>
    </select>
    <select id='myselect3 ' onChange={handleActivities}>
      <option value="principal">Actividades</option>
      {allActivities?.map (ele => <option key={ele.id} value={ele.id}>{ele.name}</option> )}
    </select>
    <button value="MENOS" onClick={handleOrder}>Menor Población</button>
    <button value="MAS" onClick={handleOrder}>Mayor Población</button>
    <button value="A" onClick={handleOrder}>Ascedente</button>
    <button value="D" onClick={handleOrder}>Descedente</button>
  </div>
  )
}

export default Navbar;