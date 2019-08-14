import React from 'react';
import HorarioLista from './crud_administrador/HorarioLista';

export default function Horarios({horarios, recargar}) {
    return (
        <div className="jumbotron mt-5">
            <legend className="mb-4 text-center text-uppercase font-weight-bold" >Listado Horarios</legend>
            <ul className="list-group mt-5">
                {horarios.map(horario => (
                    <HorarioLista key={horario.id} horario={horario} recargar={recargar} />
                ))}
            </ul>
        </div>
    )
}
