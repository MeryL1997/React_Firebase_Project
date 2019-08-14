import React,{useState, useRef} from 'react';
import Error from '../Error';
import OptionLab from '../OptionLab';

import firebase from '../conexion/firebase';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom'

function EditarHorario({history,datos, horario}) {

    //Generando los ref
    const nombreDocenteRef = useRef('');
    const materiaRef = useRef('');
    const horainiRef = useRef('');
    const horafinRef = useRef('');
    const laboratorioRef = useRef('');
    const diaRef = useRef('');

    //State
    const [error, setError] = useState(false);

    const editar = async e =>{
        e.preventDefault();

        //validacion

        const nuevoNombreDocente = nombreDocenteRef.current.value,
                nuevaMateria = materiaRef.current.value,
                nuevaHoraini = horainiRef.current.value,
                nuevaHorafin = horafinRef.current.value;
        
        if (nuevoNombreDocente==='' || nuevaMateria===''|| nuevaHoraini==='' || nuevaHorafin==='') {
            setError(true);
            return;
        }
        setError(false);
        
        //Obteniendo los valores del formulario
        const editarH = {
            nombreDocente: nuevoNombreDocente,
            materia : nuevaMateria,
            horaini : nuevaHoraini,
            horafin : nuevaHorafin,
            laboratorio : laboratorioRef.current.value,
            dia : diaRef.current.value
        }

        try {
            //Actualizando los datos en firebase
            firebase.firestore().collection('horario').doc(horario.id).update(editarH)
            .then(Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Bien',
                text: 'Horario editado con exito!',
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
        history.push('/horarios');
    }
    return (
        <div className="jumbotron mt-5">
            <div className="col-md-8 mx-auto ">
                <h1 className="text-center">Editar Horario</h1>

                {(error) ? <Error mensaje='Todos los campos son obligatorios' /> : null}

                <form className="mt-50" onSubmit={editar}>

                    <div className="form-group">
                        <label>Nombre Docente</label>
                        <input
                            type="text"
                            className="form-control"
                            name="docente"
                            placeholder="Docente"
                            ref={nombreDocenteRef}
                            defaultValue={horario.nombreDocente}
                        />
                    </div>

                    <div className="form-group">
                        <label>Materia</label>
                        <input
                            type="text"
                            className="form-control"
                            name="materia"
                            placeholder="Materia"
                            ref={materiaRef}
                            defaultValue={horario.materia}
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
                                ref={horainiRef}
                                defaultValue={horario.horaini}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Hora Fin</label>
                            <input
                                type="time"
                                className="form-control"
                                name="horafin"
                                placeholder="Materia"
                                ref={horafinRef}  
                                defaultValue={horario.horafin} 
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Laboratorio</label>
                        <select className="form-control" name="laboratorio" ref={laboratorioRef} defaultValue={horario.laboratorio}>
                            <option>Seleccione un laboratorio</option>
                            {datos.map(dato => (
                                <OptionLab key={dato.id} dato={dato} />
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Día</label>
                        <select className="form-control" name="dia" ref={diaRef} defaultValue={horario.dia}>
                            <option>Seleccione un día</option>
                            <option value="Lunes">Lunes</option>
                            <option value="Martes" >Martes</option>
                            <option value="Miercoles">Miercoles</option>
                            <option value="Jueves">Jueves</option>
                            <option value="Viernes">Viernes</option>
                        </select>
                    </div>

                    <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Laboratorio" />
                </form>
            </div>
        </div>
    )
}
export default withRouter(EditarHorario);