import React,{Fragment} from 'react'

const OpcionesLab = ({dato}) => {
    return (
        <Fragment>
            <option value={dato.lab}>{dato.lab}</option>
        </Fragment>
    )
}

export default OpcionesLab;