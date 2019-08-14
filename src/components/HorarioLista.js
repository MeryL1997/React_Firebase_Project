import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import firebase from './conexion/firebase';

function HorarioLista({ horario }) {


    const eliminarHorario = id => {
        console.log('eliminando', id);
        Swal.fire({
            title: '¿Desea Eliminarlo?',
            text: "Una vez borrado no se podran recuperar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'

        }).then(async (result) => {
            if (result.value) {
                try {
                    firebase.firestore().collection('horario').doc(id).delete()
                        .then(
                            Swal.fire(
                                'Eliminado!',
                                'Horario eliminado con exito',
                                'success'
                            )
                        )
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        text: 'Ha ocurrido un error, porfavor vuelva a intentarlo mas tarde'
                    })
                }
            }
        })
    }



    return (
        <li className="list-group-item d-flex justify-content-between alig-items-center">
            <p>
                Docente: {horario.nombreDoc}<br></br>
                Materia: {horario.materia}<br></br>
                Dia: {horario.dia}<br></br>
                {horario.horarioini} {'-'} {horario.horariofin} {'-'} {horario.laboratorio}

            </p>
            <div>
                <Link to={`/horarios/editar/${horario.id}`} className="btn btn-success mr-2">Editar</Link>

                <button type="button" className="btn btn-danger"
                    onClick={() => eliminarHorario(horario.id)}>Eliminar &times;
                </button>
            </div>
        </li>
    )
}

export default HorarioLista;