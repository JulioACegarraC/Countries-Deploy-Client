import {useSelector} from 'react-redux'
import Card from '../card/Card';
import './Cards.css'

function Cards({grupoCountries}) {
  const render = useSelector((state) => state.render);
  let countriesList = [];
  let k=10;
  let pagEnteras = Math.trunc(render.length/10);
  if (render.length<k) {
    k=render.length;
    for(let i=0 ; i< k ; i++){
      countriesList.push(render[i]);
    }
  } else if (grupoCountries>pagEnteras){
    for(let i=pagEnteras*10 ; i< render.length ; i++){
      countriesList.push(render[i]);
    }
  }else{
    for(let i=((grupoCountries*10)-k) ; i< (grupoCountries*10) ; i++){
      countriesList.push(render[i]);
    }
  }
  return (
      <div key='card-list' className='cards-list'>
        {countriesList?.map(country => <Card key={country.id} country = {country} />)}
      </div>
  )
}

export default Cards;