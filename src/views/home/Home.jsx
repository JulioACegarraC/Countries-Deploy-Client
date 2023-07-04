import { useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {getCountries} from '../../redux/actions/index'
import Cards from '../../components/cards/Cards';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import './Home.css'

function Home() {
  const dispatch = useDispatch();
  //! Estado Global***************************************************************
  const render = useSelector((state) => state.render);
  const errors = useSelector((state) => state.errors);

  //! Estado Local****************************************************************
  let [grupoCountries,setGrupoCountries] = useState(1);
  let [error,setError] = useState(false);
  //! Variables Locales***********************************************************
  
  let paginas = 0;
  paginas = Math.ceil(render.length /10);

  //! Acciones cuando se monta el componente**********************************
  useEffect(() => {
    if (errors&&errors.error==='No cuenta con actividades registradas aun') setError(true)
    if (render.length===0)dispatch(getCountries());
  }, []);

  const handlePage = (evento) => {
    setGrupoCountries(evento.target.value);
  }

  const handleError = (evento) => {
    setError(false);
  }
  
  return (
    <div>
      <Navbar setGrupoCountries ={setGrupoCountries} />
      {error?<div className='home-modal'>
        <p>{errors.error}</p>
        <button onClick={handleError}>OK</button>
      </div>:null}
      <div className='home'>
        <Cards grupoCountries={grupoCountries} />
      </div>
      <Footer handlePage={handlePage} paginas={paginas} />
    </div>
  )
}

export default Home;