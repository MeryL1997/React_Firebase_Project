import React,{useState, useRef} from 'react';
import Error from '../Error';

import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';
import firebase from '../conexion/firebase';

function EditarLab({lab, history}) {

    //Agregando los ref
    const nombreLabRef = useRef('');
    const descripcionlabRef = useRef('');
    const pattRef = useRef('');

    const [error, setError] = useState(false);

    const editarLab = async e =>{
        e.preventDefault();

        //validacion 
        const nuevoNombreLab = nombreLabRef.current.value,
               nuevoDescripcionlab = descripcionlabRef.current.value,
               nuevoPatt = pattRef.current.value;

        if (nuevoNombreLab==='' || nuevoDescripcionlab==='' || nuevoPatt==='') {
            setError(true);
            return;
        }
        setError(false);

        const editarL = {
            nombreLab: nuevoNombreLab,
            descripcionLab : nuevoDescripcionlab,
            patt : nuevoPatt
        }
        
        try {
            //Actualizando los datos en firebase
            firebase.firestore().collection('laboratorio').doc(lab.id   ).update(editarL)
            .then(Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Bien',
                text: 'Laboratorio editado con exito!',
                showConfirmButton: false,
                timer: 1500
            }))
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Hubo un error, vuelve a intentarlo!'
            })
        }
        //Redirigir al usuario 
        history.push('/');
    }
    return (
        <div className="jumbotron mt-5">
            <div className="col-md-8 mx-auto ">
                <h1 className="text-center">Editar Laboratorio</h1>

                {(error) ? <Error mensaje='Todos los campos son obligatorios' /> : null}

                <form className="mt-5" onSubmit={editarLab}>

                    <div className="form-group">
                        <label>Nombre Laboratorio</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nombrelab"
                            placeholder="Nombre Laboratorio"
                            ref={nombreLabRef}
                            defaultValue={lab.nombreLab}
                        />
                    </div>

                    <div className="form-group">
                        <label>Descripción del laboratorio</label>
                        <input
                            type="text"
                            className="form-control"
                            name="descripcion"
                            placeholder="Descripción"
                            ref={descripcionlabRef}
                            defaultValue={lab.descripcionLab}
                        />
                    </div>

                    <div className="form-group">
                        <label>Archivo .patt</label>
                        <textarea 
                            className="form-control" 
                            id="exampleFormControlTextarea1" 
                            rows="3" 
                            ref={pattRef}
                            defaultValue={lab.patt}></textarea>
                        
                    </div>
                    <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Laboratorio" />
                </form>
            </div>
        </div>
    )
}
export default withRouter(EditarLab);