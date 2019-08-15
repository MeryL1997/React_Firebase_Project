import React,{useState} from 'react';
import firebase from '../conexion/firebase';
import {withRouter} from 'react-router-dom';
import Swal from 'sweetalert2';

function Login({history,recargar}){
     
    const [Correo, setCorreo] = useState('');
    const [Contraseña, setContraseña] = useState('');

    const  logeo  = async e =>{
        e.preventDefault();
        try {
            await firebase.auth().signInWithEmailAndPassword(Correo, Contraseña);
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Exito',
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
         <div className="form-group">
             <form onSubmit={logeo}>
                 <div className="form-signin col-md-5 mx-auto">
                 <label for="exampleInputEmail1">Email address</label>
                 <input type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"
                 value={Correo} onChange={e=>setCorreo(e.target.value)} />
                 <div class="form-group"></div>
                 <label for="exampleInputEmail1">Password</label>
                 <div class="col-md-12 text-center "></div>
                 <input type="password" name="password" id="password" class="form-control" aria-describedby="emailHelp" placeholder="Enter Password" 
                 value={Contraseña} onChange={e=>setContraseña(e.target.value)}/>
                 <br />
                 <div class="col-md-12 text-center mb-3">
                     <button type="submit" class=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
                 </div>
                 </div>
             </form>
         </div>
     )
}
export default withRouter(Login);
//</div><div class="form-group"> </div>