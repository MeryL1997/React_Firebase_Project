import React, {useState} from 'react';
import Error from '../Error';

import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';
import firebase from '../conexion/firebase';

function AddLab({history, recargar}) {
 
    const [nombreLab, setNombreLab] = useState('');
    const [descripcionLab, setDescripcionlab] = useState('');
    const [patt, setPatt] = useState('');
    const [error, setError] = useState(false);

    const agregarLab = async e => {
        e.preventDefault();
        //Validacion del formulario
        if (nombreLab==='' || descripcionLab==='' || patt==='') {
            setError(true);
            return;
        }
        setError(false);
        
        //Creando el nuevo laboratorio
        
        try {
            firebase.firestore().collection('laboratorio').add({
                descripcionLab,
                nombreLab,
                patt
            }).then(
                Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Bien',
                text: 'Laboratorio creado con exito!',
                showConfirmButton: false,
                timer: 1500
              }));
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Hubo un error, vuelve a intentarlo!'
            })
        }
        //Enviando una señal para que se vuelva a hacer una consulta cuando se ha ingresado algo nuevo
        recargar(true);
        //Redirigir a la pagina del inicio
        history.push('/');
    }

    return (
        <div className="jumbotron mt-5">
            <div className="col-md-8 mx-auto ">
                <h1 className="text-center">Agregar Nuevo Laboratorio</h1>

                {(error) ? <Error mensaje='Todos los campos son obligatorios' /> : null}

                <form className="mt-5" onSubmit={agregarLab}>

                    <div className="form-group">
                        <label>Nombre Laboratorio</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nombrelab"
                            placeholder="Nombre Laboratorio"
                            onChange={e => setNombreLab(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Descripción del laboratorio</label>
                        <input
                            type="text"
                            className="form-control"
                            name="descripcion"
                            placeholder="Descripción"
                            onChange={e => setDescripcionlab(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Archivo .patt</label>
                        <textarea 
                            className="form-control" 
                            id="exampleFormControlTextarea1" 
                            rows="3" 
                            onChange={e => setPatt(e.target.value)}></textarea>
                        
                    </div>
                    <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Laboratorio" />
                </form>
            </div>
        </div>
    )
}
export default withRouter(AddLab);