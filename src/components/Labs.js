import React from 'react';
import LabLista from './LabLista';

const Labs = ({laboratorios, recargar}) => {
    return (
        <div className="jumbotron mt-5">
            <legend className="mb-4 text-center text-uppercase font-weight-bold" >Listado Laboratorios</legend>
            <ul className="list-group mt-5">
                {laboratorios.map(laboratorio => (
                    <LabLista key={laboratorio.id} laboratorio={laboratorio} recargar={recargar} />
                ))}
            </ul>
        </div>
    )
}
export default Labs
