import './header.css'

function Head() {
  return (
    <>
  <div className='div-header'>
    <div className='div-imagen-inicio'></div>
    <div className='div-imagen-logo'></div>
    <ul className="head">
        <li key={'welcome'} ><a href="/">Welcome</a></li>
        <li key={'home'} ><a href="/home">Home</a></li>
        <li key={'admin'} ><a href="/login">Admin</a></li>
        {/* <li ><a href="/create">Create</a></li> */}
    </ul>
    <div className='div-imagen-final'></div>
  </div>
  </>
  )
}

export default Head;