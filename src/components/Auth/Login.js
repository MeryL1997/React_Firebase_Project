import React, {useState} from 'react';
import firebase from '../conexion/firebase';
import {withRouter} from 'react-router-dom';
import Swal from 'sweetalert2';

function Login({history,recargar}) {

    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');

    const  logeo  = async e =>{
        e.preventDefault();
        try {
            await firebase.auth().signInWithEmailAndPassword(email, passWord);
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Excelente',
                text: 'Usuario logeado con éxito!',
                showConfirmButton: false,
                timer: 1500
            })
            recargar(true);
            history.replace('/laboratorios');
        } catch (error) {
            console.log(error.message);
            if(error.message==='The password is invalid or the user does not have a password.'){
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'La contraseña ingresaste es incorrecta!',
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

    return (
        <div className="row justify-content-center mt-3 mb-3">
            <div className="col-md-5 mb-2">
                <div className="card mt-5 mb-2">
                    <div className="card-body mb-2">
                        <h2 className="text-center py-4 mb-2">
                            Iniciar Sesión
                        </h2>
                        <form onSubmit={logeo}>
                            <div className="form-group">
                                <label>Email:</label>
                                <input 
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={e=>setEmail(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Password:</label>
                                <input 
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    required
                                    value={passWord}
                                    onChange={e=>setPassWord(e.target.value)}
                                />    
                            </div>    

                            <input 
                                type="submit"
                                className="btn btn-success btn-block mt-5"
                                value="Iniciar Sesión"
                            />
                            <br/>
                            <p className="text-left"><small><code><i>Si aún no tienes una cuenta ponte en contacto con el administrador de la página.</i></code></small></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default withRouter(Login);