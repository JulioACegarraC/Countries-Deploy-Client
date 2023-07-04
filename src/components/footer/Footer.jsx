import './Footer.css'

function Footer({paginas,handlePage}) {
  let arr = [];
    for (let i = 0; i < paginas; i++) {
        arr[i]=i+1;
    }

 
  return (
  <div  className='footer'>
    <div key={'footer-imagen-1'} className='imagen-inicio'></div>
    <ul key={'paginado'} className="foot">
        {arr.length!==0?arr.map(ele => <li key={ele} value={ele} onClick={handlePage} >{ele}</li>):null}
    </ul>
    <div key={'footer-imagen-2'} className='imagen-final'></div>
  </div>
  )
}

export default Footer;