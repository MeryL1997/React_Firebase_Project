import React, {Fragment} from 'react';
import LaboratorioLista from './LabLista';

function Labs ({productos, auth}){
    return(
        <Fragment>
            {auth ? (
            <div>
                <h1 className="text-center">Laboratorios</h1>
                <ul className="List-group mt-5">

                    {productos.map(producto =>(
                        <LaboratorioLista
                        key={producto.id}
                        producto={producto}>
                        </LaboratorioLista>

                    ))}
                </ul>
            </div>
            ): <hi>Usted no tiene permitido esta acción</hi> } 
        </Fragment>
    )

}
export default Labs;
