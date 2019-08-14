import React,{useState} from 'react';
import firebase from '../conexion/firebase';
import {withRouter} from 'react-router-dom';
import Swal from 'sweetalert2';

function Login({history,recargar}){
     
    const [Correo, setCorreo] = useState('');
    const [Contraseña, setContraseña] = useState('');

    const  logeando  = async e =>{
        e.preventDefault();
        try {
            await firebase.auth().signInWithEmailAndPassword(Correo, Contraseña);
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Nice',
                text: 'Ingreso con Éxito',
                showConfirmButton: false,
                timer: 1500
            })
            recargar(true);
            history.replace('/productos');
        } catch (error) {
            console.log(error.message);
            if(error.message==='The password is invalid or the user does not have a password.'){
                Swal.fire({
                    type: 'error',
                    title: 'Bad',
                    text: 'Contraseña Incorrecta',
                })
            }else if(error.message==='There is no user record corresponding to this identifier. The user may have been deleted.'){
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'El correo que ingresaste es incorrecto!',
                })
            }
            
        }
    }
    
    
     return(
        
         <div id="logreg-forms">
             <form onSubmit = {logeando} className="form-signin col-md-5 mx-auto">
                 <h1 className="h3 mb-3 font-weight-normal text-center"> Iniciar Sesion</h1>
                 <input type="email" id="inputEmail" className="form-control" placeholder="Usuario" required="Este campo es requerido" autofocus="" 
                  onChange={e=>setCorreo(e.target.value)}
                 />
                 <br/>
                 <input type="password" id="inputPassword" className="form-control" placeholder="Contraseña" required="Este campo es requerido" 
                 onChange={e=>setContraseña(e.target.value)}
                 />
                 <br/>
                 <input type = "submit" className="btn btn-success font-weight-bold text-uppercase " value ="Iniciar Sesion"/>
                 
             </form>
         </div>
         

     )
}
export default withRouter(Login);