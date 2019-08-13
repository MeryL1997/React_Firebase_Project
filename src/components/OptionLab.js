import React,{Fragment} from 'react'

const OptionLab = ({dato}) => {
    return (
        <Fragment>
            <option value={dato.nombreLab}>{dato.nombreLab}</option>
        </Fragment>
    )
}

export default OptionLab