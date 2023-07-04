function validacion(activity) { // {email:"",password:""}
    const errors = {};
    
    if (activity.name.length ===0 ) errors.name = 'El Nombre es un campo obligatorio';
    if (activity.name.length >0 && activity.name.length <5) errors.name = 'El Nombre debe tener al menos 5 caracteres';
    if (activity.name.length > 200 ) errors.name = 'El Nombre es demasiado largo';

    if (activity.dificulty.length ===0) errors.dificulty = 'La dificultad es un campo obligatorio'
    if (!Number(activity.dificulty)) errors.dificulty = 'La dificultad debe ser un numero en las escala del 1 al 5 siendo 1 lo mas sencillo y 5 lo mas complejo'
    if (Number(activity.dificulty)<1 || Number(activity.dificulty)>5) errors.dificulty = 'La dificultad debe ser un numero valido'

    if (!Number(activity.duration)) errors.duration = 'La duracion debe ser un numero decimal de horas, como ejemplo una actividad que demora una hora y media se representa 1.5'
    if (Number(activity.duration)< 0.5) errors.duration = 'La duracion minima de una actividad turistica es de media hora, 0.5'
    if (Number(activity.duration)>72) errors.duration = 'La duracion maxima de una actividad turistica es de 3 dias, 72'

    if (activity.season.length ===0) errors.season = 'Debes seleccionar una temporada para cada actividad'
    if (activity.season !== 'Verano' && activity.season !== 'Otoño' && activity.season !== 'Invierno' && activity.season !== 'Primavera') errors.season = 'La temporada debe ser o Verano o Invierno o Primaver u Otoño'
    
    if (activity.CountryId.length ===0) errors.CountryId = 'Debes seleccionar al menos 1 pais';
    return errors   
};

function validacionAdmin(admin) { // {email:"",password:""}
    const errors = {};
    
    const regexEmail = /\S+@\S+\.\S+/;
    const regexPass = new RegExp ("[0-9]");
    if (!regexEmail.test(admin.email)) errors.email = "El E-mail no es valido";
    if (admin.email.length>35) errors.email = "Maximo 35 caracteres";
    if (admin.password.length <6 || admin.password.length >10 ) errors.password = "El pasword debe contener entr 6 y 10 caracteres";
    if (!regexPass.test(admin.password)) errors.password = "El passwor debe contener al menos 1 numero";
    return errors;
};

export {validacion,validacionAdmin}
