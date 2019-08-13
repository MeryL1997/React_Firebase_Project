import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import firebase from './conexion/firebase';

const LabLista = ({laboratorio}) => {
    const eliminarLaboratorio = id =>{
        //Eliminar los registros
        Swal.fire({
          title: '¿Esta seguro?',
          text: "Una vez eliminado no se puede recuperar!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Eliminar',
          cancelButtonText:'Cancelar'
        }).then(async(result) => {
          if (result.value) {

            try {
                firebase.firestore().collection('laboratorio').doc(id).delete()
                .then(
                    Swal.fire(
                        'Eliminado!',
                        'El Laboratorio ha sido eliminado.',
                        'success'
                    )
                )    
            } catch (error) {
                console.log(error);
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: 'Hubo un error, vuelve a intentarlo!'
                })
            }

          }
        })
    }
    return (
        <li  className="list-group-item d-flex justify-content-between align-items-center">
             <p>
                {laboratorio.nombreLab}
             </p>
             <div className="">
                 <Link to={`/laboratorios/detalle/${laboratorio.id}`} className="btn btn-success mr-2" >Ver <span role="img" aria-label="sheep">👁</span></Link>
                <Link to={`/laboratorios/editar/${laboratorio.id}`} className="btn btn-success mr-2" >Editar <span role="img" aria-label="sheep" >🔧</span></Link>
                <button className="btn btn-danger" type="button" onClick={()=>eliminarLaboratorio(laboratorio.id)} >Eliminar &#88;</button>
            </div>
        </li>
    )
}
export default LabLista;
