import { useEffect } from 'react';
import{useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Card from '../../components/card/Card';
import { getByid } from '../../redux/actions';
import './Detail.css'

function Detail() {
  const {id} = useParams();
  const detail = true;
  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);
  useEffect(() => {
    dispatch(getByid(id));
  }, [dispatch]);
  return (
    <div>
      <div className='detail-nav'>
        <h1>Detail</h1>
      </div>
      <div className='detail-container'>
        <Card country={country} detail = {detail} />
      </div>
    </div>
  )
}

export default Detail;