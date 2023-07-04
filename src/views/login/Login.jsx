import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import axios from "axios";
import { validacionAdmin } from "../../validation";
import './Login.css'
import { loginUser } from "../../redux/actions";

function Login(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errors = useSelector((state) => state.errors);
    const access = useSelector((state) => state.access);
    let [error,setError] = useState(false);
    let [errorUsuario,setErrorUsuario] = useState(false);

    useEffect(() => {
        if (errors&&errors.error==='No cuenta con administradores aun') setError(true)
      }, [errors]);
    
    useEffect(() => {
        if(access===false) setErrorUsuario(true);
        if(access===true){
            navigate('/create')
        }
    }, [access]);


    let [userData,setUserData] = useState({
        email:"",
        password:"",
    });
    let [errorsInput,setErrorsInput] = useState({
        email:"Campo requerido",
        password:"Campo requerido",
    });

    const onChange = (evento) => {
        let {value,name} = evento.target;
        setUserData ({...userData, [name] : value});
        setErrorsInput(
            validacionAdmin({
                ...userData,
                [name]: value
            })
        )
    }
    const handleSubmit = async (evento) => {
        evento.preventDefault();
        dispatch(loginUser(userData.email,userData.password));
        if(access===false) acceessLocal=false
    }
    const handleError = (evento) => {
        document.getElementById('myform').reset();
        setErrorsInput({
            email:"Campo requerido",
            password:"Campo requerido",
        })
        setError(false);
      }
    const handleErrorUsuario = (evento) => {
        document.getElementById('myform').reset();
        setErrorsInput({
            email:"Campo requerido",
            password:"Campo requerido",
        })
        setErrorUsuario(false);
      }

    return (
        <div className="login-container">
            {error===true?<div className='login-modal'>
                <p>{errors.error}</p>
                <button onClick={handleError}>OK</button>
            </div>:null}
            {errorUsuario===true?<div className='login-modal'>
                <p>Error de Usuario y/o Contraseña</p>
                <button onClick={handleErrorUsuario}>OK</button>
            </div>:null}
            <div className="login-fila-1">
                <div className="login-image-1"></div>
                <div className="login-image-2"></div>
                <div className="login-image-3"></div>
            </div>
            <div className="login-fila-2">
                <form id="myform"  className='login-form' onSubmit={handleSubmit}>
                    <div>
                    <label className='login-form-label'  >E-mail</label>
                    <input className= 'login-form-input' name='email' type="text"  onChange={onChange}/>
                    <p className='login-form-label'>{errorsInput.email && errorsInput.email}</p>
                    <label className='login-form-label' >Password:</label>
                    <input name='password' type="password" onChange={onChange} />
                    <p className='login-form-label'>{errorsInput.password && errorsInput.password}</p>
                    {!errorsInput.email && !errorsInput.password?<button  >Ingresar</button>:null}
                    </div>
                </form>
                <div className="login-image-4"></div>
                <div className="login-image-5"></div>
            </div>
            <div className="login-fila-3">
                <div className="login-image-6"></div>
                <div className="login-image-7"></div>
                <div className="login-image-8"></div>
            </div>
        </div>
    )
 }

export default Login;