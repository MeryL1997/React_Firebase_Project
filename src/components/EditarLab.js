import React, {useState, useRef} from 'react';
import Error from './Error';
import Swal from 'sweetalert2';
import firebase from './conexion/firebase';
import {withRouter} from 'react-router-dom';

function EditarLab ({producto, history}){

    const DetalleLabRef = useRef('');
    const nombreLabRef = useRef('');
    const pattRef = useRef('');
    const [error] = useState(false);
    
    const editarLab = async e =>{
        e.preventDefault();

        //validacion 
        const nuevoNombreLab = nombreLabRef.current.value,
               nuevoDetallelab = DetalleLabRef.current.value,
               nuevoPatt = pattRef.current.value;

        if (nuevoNombreLab==='' || nuevoDetallelab==='' || nuevoPatt==='') {
            //setError(true);
            return;
        }
        //setError(false);

        const editarL = {
            lab: nuevoNombreLab,
            detalle : nuevoDetallelab,
            patt : nuevoPatt
        }
        
        try {
            //Actualizando los datos en firebase
            firebase.firestore().collection('laboratorio').doc(producto.id).update(editarL)
            .then(Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Naizu',
                text: 'El Laboratorio se ha editado con exito',
                showConfirmButton: false,
                timer: 1500
            }))
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Hubo un error, porfavor intente denuevo'
            })
        }
        //Redirigir al usuario 
        history.push('/productos');
    }

    return(
            
            <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Añadir Laboratorio</h1>

            {(error) ? <Error mensaje='Todos los campos son obligatorios'/>: null}

            <form
                className="mt-5"
                onSubmit={editarLab}
            >
                <div className="form-group">
                    <label>Nombre del Laboratorio</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre Lab"
                        ref = {nombreLabRef}
                        defaultValue={producto.lab}
                    />
                </div>

                <div className="form-group">
                    <label>Detalle del Laboratorio</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="Detalle"
                        placeholder="Descripcion del Laboratorio"
                        ref = {DetalleLabRef}
                        defaultValue={producto.detalle}
                    />
                </div>

                <div className="form-group">
                    <label>Patt del laboratorio</label>
                    <textarea 
                        className="form-control" 
                        name="Patt del Laboratorio"
                        placeholder="patt"
                        ref = {pattRef}
                        defaultValue={producto.patt}
                    />
                </div>


                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Lab" />
            </form>
        </div>
    )

}
export default withRouter(EditarLab);