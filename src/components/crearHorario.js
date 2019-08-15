import React, {useState} from 'react';
import OptionLab from './OptionLab';
import Error from './Error';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';
import firebase from './conexion/firebase';


function AddHorario({datos, history, recargar}) {
    //States para cada uno de los campos
    const [nombreDoc, setnombreDocente] = useState('');
    const [materia, setMateria] = useState('');
    const [horaini, setHoraini] = useState('');
    const [horafin, setHorafin] = useState('');
    const [lab, setLaboratorio] = useState('');
    const [dia, setDia] = useState('');
    const [error, setError] = useState(false);

    const agregarHorario = async e => {
        e.preventDefault();

        //Validacion de que todos los campos esten llenos
        if (nombreDoc==='' || materia==='' || horaini==='' || horafin==='' || lab==='' || dia==='') {
            setError(true);
            return;
        }
        setError(false);

        //Creando el nuevo horario
        
        try {
            firebase.firestore().collection('horario')
            .add({
                nombreDoc,
                materia,
                horaini,
                horafin,
                lab,
                dia
            }).then(()=>{
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Bien',
                    text: 'Horario creado con exito!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
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
        history.push('/horario');
    }

    return (
        <div className="jumbotron mt-5">
            <div className="col-md-8 mx-auto ">
                <h1 className="text-center">Añadir Nuevo Horario</h1>
                {(error) ? <Error mensaje='Todos los campos son obligatorios' /> : null}
                <form className="mt-50" onSubmit={agregarHorario}>

                    <div className="form-group">
                        <label>Nombre Docente</label>
                        <input
                            type="text"
                            className="form-control"
                            name="docente"
                            placeholder="Docente"
                            onChange={e => setnombreDocente(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Materia</label>
                        <input
                            type="text"
                            className="form-control"
                            name="materia"
                            placeholder="Materia"
                            onChange={e => setMateria(e.target.value)}
                        />
                    </div>
                    <div className="form row">
                        <div className="form-group col-md-6">
                            <label>Hora inicio</label>
                            <input
                                type="time"
                                className="form-control"
                                name="horaini"
                                placeholder="Materia"
                                onChange={e => setHoraini(e.target.value)}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Hora Fin</label>
                            <input
                                type="time"
                                className="form-control"
                                name="horafin"
                                placeholder="Materia"
                                onChange={e => setHorafin(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Laboratorio</label>
                        <select className="form-control" name="laboratorio" onChange={e => setLaboratorio(e.target.value)}>
                            <option>Seleccione un laboratorio</option>
                            {datos.map(dato => (
                                <OptionLab key={dato.id} dato={dato} />
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Día</label>
                        <select className="form-control" name="dia" onChange={e => setDia(e.target.value)}>
                            <option>Seleccione un día</option>
                            <option value="Lunes">Lunes</option>
                            <option value="Martes" >Martes</option>
                            <option value="Miercoles">Miercoles</option>
                            <option value="Jueves">Jueves</option>
                            <option value="Viernes">Viernes</option>
                        </select>
                    </div>

                    <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-secondary btn-block py-3" value="Agregar Laboratorio" />
                </form>
            </div>
        </div>
    )
}
export default withRouter(AddHorario);