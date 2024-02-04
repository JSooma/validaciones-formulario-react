import React from 'react'
import {useForm} from './../../hooks/useForm'
import { Message } from '../Message/Message';
import { Loader } from '../Loader/Loader';

const initialForm = {//Valores iniciales del formulario.
    name: "",
    email: "",
    topic: "",
    comments: ""
};

let errors = {
};//Por cada error que tengamos se va a ir almacenando una propiedad en esta variable. 


//Validaciones que tendrá el formulario, expresiones regulares y que no contenga campos vacíos.
const validationsForm = (form, event) => {//Recibe como propiedad la variable de estado form la cual contiene los datos del formulario.
 
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexComments = /^.{1,255}$/;

  //Es necesario que cada mensaje de error tenga el mismo nombre en el objeto "errors" que el campo del formulario que está dando el error, para no generar confuciones.
  if(event.target.name === "name") {//Si el elemento que origina el evento es igual a "name" entonces hace las siguientes validaciones.
    if(!form.name.trim()){//Si el input "name" está vacío asgina el siguiente mensaje de error.
      errors.name = "No pudes dejar el campo vacío";
    }else if (!regexName.test(form.name.trim())) {//Si el input "name" no cumple la expresión regular asgina el siguiente mensaje de error.
      errors.name = "Solo puedes usar letras y espacios vacíos";
    }else {//En caso de que se cumplan las validaciones se elimina la propiedad que se haya generado por el error.
      delete errors.name;
    }
  }

  if(event.target.name === "email") {//Si el elemento que origina el evento es igual a "email" entonces hace las siguientes validaciones.
    if(!form.email) {//Si el input "email" está vacío asgina el siguiente mensaje de error.
      errors.email = "No pudes dejar el espacio vacío";
    } else if(!regexEmail.test(form.email.trim())) {//Si el input "email" no cumple la expresión regular asgina el siguiente mensaje de error.
      errors.email = "Formato de correo invalido";
    } else {//En caso de que se cumplan las validaciones se elimina la propiedad que se haya generado por el error.
      delete errors.email;
    }
  }

  if(event.target.name === "topic") {//Si el elemento que origina el evento es igual a "topic" entonces hace las siguientes validaciones.
    if(!form.topic){//Si el input "topic" está vacío asgina el siguiente mensaje de error.
      errors.topic = "No pudes dejar el espacio vacío";
    }else {//En caso de que se cumplan las validaciones se elimina la propiedad que se haya generado por el error.
      delete errors.topic;
    }
  }

  if(event.target.name === "comments") {//Si el elemento que origina el evento es igual a "comments" entonces hace las siguientes validaciones.
    if(!form.comments){//Si el input "comments" está vacío asgina el siguiente mensaje de error.
      errors.comments = "No pudes dejar el espacio vacío";
    } else if(!regexComments.test(form.comments.trim())) {//Si el input "comments" no cumple la expresión regular asgina el siguiente mensaje de error.
      errors.comments = "Solo puedes escribir 255 caracteres";
    } else {//En caso de que se cumplan las validaciones se elimina la propiedad que se haya generado por el error.
      delete errors.comments;
    }
  }

  return errors;//Retorna el objeto con todos los errores de validaciones.

}


//Componente Formulario.
export const Validations = () => {

  //Destructuración del Custom Hook.
  let {form,
    errors, 
    loading, 
    response, 
    handleChange, 
    handleKeyUp, 
    handleSubmit} = useForm(initialForm, validationsForm);


  return (
    <>
      <div className='section w-full min-h-screen flex flex-col justify-center items-center '>
        <h1 className='section__h1 text-white text-center mt-0'>Validaciones con React.JS</h1>
        <form className='section__form bg-white flex-col w-3/4 p-16 flex justify-center items-center border rounded-lg sm:w-3/5 lg:w-2/5' onSubmit={handleSubmit} autoComplete='off'>
          <label className='section__label text-stone-900 mb-3 font-semibold'>Nombre:</label>
          <input className='section__input p-2 w-3/4 text-stone-900 mb-6 outline-none border border-stone-900 rounded-sm' type='text' name='name' value={form.name} onChange={handleChange} onKeyUp={handleKeyUp} required/>
          {errors.name && <p className='section__error text-white bg-red-500 text-center w-3/4 p-2 -mt-6 mb-6'>{errors.name}</p>}
          <label className='section__label text-stone-900 mb-3 font-semibold'>Correo:</label>
          <input className='section__input p-2 w-3/4 text-stone-900 mb-6 outline-none border border-stone-900 rounded-sm' type='email' name='email' value={form.email} onChange={handleChange} onKeyUp={handleKeyUp} required/>
          {errors.email && <p className='section__error text-white bg-red-500 text-center w-3/4 p-2 -mt-6 mb-6'>{errors.email}</p>}
          <label className='section__label text-stone-900 mb-3 font-semibold'>Tema a tratar:</label>
          <input className='section__input p-2 w-3/4 text-stone-900 mb-6 outline-none border border-stone-900 rounded-sm' type='text' name='topic' value={form.topic} onChange={handleChange} onKeyUp={handleKeyUp} required></input>
          {errors.topic && <p className='section__error text-white bg-red-500 text-center w-3/4 p-2 -mt-6 mb-6'>{errors.topic}</p>}
          <label className='section__label text-stone-900 mb-3 font-semibold'>Comentario:</label>
          <textarea className='section__txtarea p-2 w-3/4 text-stone-900 mb-6 outline-none border border-stone-900 rounded-sm resize-none' name='comments' value={form.comments} onChange={handleChange} onKeyUp={handleKeyUp} required></textarea>
          {errors.comments && <p className='section__error text-white bg-red-500 text-center w-3/4 p-2 -mt-6 mb-6'>{errors.comments}</p>}
          <input className='section__submit p-3 w-3/4 text-white bg-stone-900 border border-stone-900 rounded-md cursor-pointer hover:bg-stone-700 transition delay-150' type='submit' value='Enviar'/>
        </form>
        {loading && <Loader/>}
        {response && <Message msg="Los datos han sido enviados" bgColor="#02801c"/>}
      </div>
    </>
  )
}

/*Los inputs tiene el atributo "value" para poder tener controlado nuestro input a traves de la variable del estado, 
es decir, que lo que haya en la variable del estado es lo que se mostrará en el input.

El evento "onKeyUp" va a ejecutar las validaciones de los inputs del formulario cada que se presione una tecla (función handleKeyUp).

Cuando "loading" sea igual a true va a mostrarse en pantalla el componente "Loader".
Cuando "response" sea igual a true va a mostrarse en pantalla el componente "Response".

*/
