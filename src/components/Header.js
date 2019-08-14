import React, {useState} from "react";
import { Link, withRouter } from 'react-router-dom';
import firebase from './conexion/firebase';
import Swal from 'sweetalert2';


 function Header({history}) {

    const logout =()=>{
        firebase.auth().signOut();
        Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Nice',
            text: 'Cuenta Cesarrada con exito',
            showConfirmButton: false,
            timer: 1500
        })
        history.replace('/');
    }
    const [Autentication, setAutentication] = useState(false);
    firebase.auth().onAuthStateChanged((user)=> {

        if (user) {
          return setAutentication(true);
        } else {
          return setAutentication(false);
        }
    
      })

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            {Autentication ? ( 
            <div className="container">
                <Link to="/productos" className="navbar-brand">
                    Sistema de Laboratorios
            </Link>

                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link
                            to="/productos"
                            className="nav-link"
                        >Laboratorios</Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            to="/productos/nuevo"
                            className="nav-link"
                        >Nuevo Laboratorio</Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            to="/horarios"
                            className="nav-link"
                        >Horarios</Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            to="/horarios/nuevo"
                            className="nav-link"
                        >Agregar Horarios</Link>
                    </li>
                    
                </ul>
                <button className="btn btn-sm btn-outline-primary my-2 my-sm-0" onClick={logout} >Cerrar Sesión</button>

            </div>
            ):<Link to="/login" className="navbar-brand">Laboratorios</Link> }
        </nav>
    )
}

export default withRouter(Header);