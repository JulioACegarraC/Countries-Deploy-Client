import{ useLocation,Link, useNavigate} from 'react-router-dom'
import './Card.css'



function Card({country}) {
  
  const navigate = useNavigate();
  const location = useLocation().pathname;
  let id= '';
  let name= '';
  let flag= '';
  let capital= '';
  let continent= '';
  let subregion = '';
  let area = '';
  let population = '';
  if (country){
    id = country.id;
    name = country.name;
    flag = country.flag;
    continent = country.continent;
    capital = country.capital;
    subregion=country.subregion;
    area=country.area;
    population=country.population;
  }
  let activities = country.activities;

  const handleClose = ()=>  {
    navigate("/home");
  }



  return (
    <>
      <div id={id} className='card-container'>
      {location !== '/home'?<button className='close' onClick={handleClose}>X</button>:null}
      <Link to = {`/home/${id}`}>
        {location !== '/home'?<h3 className='texto'>Id: {id}</h3>:null}
        <h2 className='texto'>Nombre: {name}</h2>
        <h3 className='texto'>Continente: {continent}</h3>
        <img className='imagen' src={`${flag}`}></img>
      </Link>  
        {location !== '/home'?<h3 className='texto'>Capital: {capital}</h3>:null}
        {location !== '/home'?<h3 className='texto'>Subregion: {subregion}</h3>:null}
        {location !== '/home'?<h3 className='texto'>Area: {area} km2</h3>:null}
        {location !== '/home'?<h3 className='texto'>Poblacion: {population}</h3>:null}      
        {activities?.map(ele => 
          <div className='detail-activities'>
          <ul key={ele.id}>
            <li  key={ele.id} className='titulo'>Actividad : {ele.name}</li>
            <li  key={ele.id} >Nivel de Dificultad : {ele.dificulty}</li>
            <li  key={ele.id} >Duracion : {ele.duration}</li>
            <li  key={ele.id} >Temporada : {ele.season}</li>
          </ul>
          </div>
        )}     
      </div>
    </>
  )
}

export default Card;