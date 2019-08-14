import React from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import firebase from './conexion/firebase';

function LabLista({producto}){

    const eliminarProducto = id =>{
        Swal.fire({
            title: '¿Desea eliminarlo?',
            text: "No se podran recuperar al ser eliminados",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText:'Cancelar'
          }).then(async(result) => {
            if (result.value) {
  
              try {
                  firebase.firestore().collection('laboratorio').doc(id).delete()
                  .then(
                      Swal.fire(
                          'Laboratorio Eliminado',
                          'El Laboratorio ha sido eliminado con exito.',
                          'success'
                      )
                  )    
              } catch (error) {
                  console.log(error);
                  Swal.fire({
                      type: 'error',
                      title: 'Error',
                      text: 'Hubo un error, porfavor vuelva a intentarlo'
                  })
              }
  
            }
          })
    }
    
    return(
        <li  className="list-group-item d-flex justify-content-between align-items-center">
            <p>
                {producto.lab} {' '}
                <span className="font-weight-bold">{producto.detalle}</span>
            
            </p>

            <div>
                <Link
                to = {`/productos/editar/${producto.id}`}
                className="btn btn-success mr-2">
                Editar</Link>

                <button
                type="button"
                className="btn btn-danger"
                onClick ={()=> eliminarProducto(producto.id)}
                >
                    Eliminar &times;
                </button>

            </div>

        </li>
    )
}

export default LabLista;