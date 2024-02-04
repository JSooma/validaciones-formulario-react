import { useState } from 'react'
import { helpHttp } from '../helpers/helpHttp';

/*Este Custom Hook va a contener toda la lógica que posteriormente el formulario va a usar.
Los custom Hooks se tratan como simples funciones, no como componentes.
*/
export const useForm = (initialForm, validationsForm) => {
/*Recibe dos parametros, initialForm para los valores iniciales del formulario,
validateForm la cual es una función que va a recibir el Hook con todas las validaciones del formulario.

** Los parametros no se destructuran en los Custom Hooks **
*/

    //Variables de estado.
    const [form, setForm] = useState(initialForm);//Estado para la información del formulario.
    const [errors, setErrors] = useState({});//Estado para el manejo de los errores, guarda un objeto con los mensajes de error según el input.
    const [loading, setLoading] = useState(false);//Estado para el loader.
    const [response, setResponse] = useState(false);/*Estado que confirma que el formulario se ha procesado correctamente, 
    con esta variable se deja un mensaje de confirmación una vez enviado el formulario.*/

    const handleChange = (event) => {//Función que maneja el evento onChange de los inputs del formulario.
        const {name, value} = event.target;//Destructuración de los datos del objeto que origina el evento.

        setForm({//Se actualiza la variable de estado Form con los datos del formulario.
            ...form, [name]: value
        });

    }

    const handleKeyUp = (event) => {//Función que maneja el evento onBlur (el evento se activa cada que el input deje de estar focused) de los inputs del formulario.
        handleChange(event)// Cada vez que se active el evento onKeyUp se van a actualizar los datos del formulario.
        
        setErrors(validationsForm(form, event));/* Actualiza la variable de estado "errors" con el objeto
            devuelto de la función "validationsForm", dicho objeto contiene los mensajes de error de las validaciones.
        */
    }

    const handleSubmit = (event) => {//Función que maneja el evento onSubmit.
        event.preventDefault();//Cancelación del evento que viene por defecto.

        if(Object.keys(errors).length === 0) {//Si la longitud del objeto errors es igual a 0 (si no hay errores en las validaciones del formulario).
            setLoading(true);//Activación del loader al momento de enviar el formulario.
            helpHttp().post(`https://formsubmit.co/ajax/${form.email}`,//Utilización del helper para la petición POST. 
            {body: form, headers: {"Content-type": "application/json", Accept: "application/json"}})
            .then(res => {//Manejo de la respuesta de la petición.
                setLoading(false);//Una vez que se obtenga la respuesta se oculta el loader.
                setResponse(true);//Confirmo que el fomulario se ha procesado correctamente.
                setForm(initialForm);//Reseteo de los datos del formulario.
                setTimeout(() => {
                    setResponse(false);/*Después de 5 segundos se vuelve falso la variable de estado
                    que permite mostrar el mensaje de que el formulario se procesó correctamente.*/
                }, 5000);
            });
        } else {//En caso de que haya un error que no haga nada.
            alert("Tienes que cumplir correctamente con todos los datos del formulario.");
        }
    }

    return {//Se retornan todas las variables de estado y todas funciones manejadoras de eventos.
        form,
        errors,
        loading,
        response,
        handleChange,
        handleKeyUp,
        handleSubmit
    }

}
