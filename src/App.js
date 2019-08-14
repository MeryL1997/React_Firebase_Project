import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import AR from './components/realidad/Ar';
import './App.css';
import Header from './components/Header';
import Producto from './components/Labs';
import EditarProducto from './components/EditarLab';
import AgregarProducto from './components/crearLab';
import EditarHorario from './components/EditarHorario';
import firebase from './components/conexion/firebase';
import Horarios from './components/Horarios';
import AgregarHorario from './components/crearHorario';

function App() {

  const [productos, guardarProdutos] = useState([]);
  const [recargarProductos, guardarRecargarProductos] = useState(true);
  const [Autentication, setAutentication] = useState(false);
  const [horarios, guardarHorarios] = useState([]);
  

  useEffect(() =>{

    if(recargarProductos){
      firebase.firestore().collection('lab').onSnapshot((snapshot)=>{
        const datos = snapshot.docs.map((dato)=>({
          id: dato.id,
          ...dato.data()
        }))
        
        guardarProdutos(datos);
      });
      
    }
    guardarRecargarProductos(false);
    firebase.firestore().collection('horario').onSnapshot((snapshot) => {
      const datos = snapshot.docs.map((dato) => ({
        id: dato.id,
        ...dato.data()
      }))
      guardarHorarios(datos);
    });

    firebase.auth().onAuthStateChanged((user)=> {

      if (user) {
        return setAutentication(true);
      } else {
        return setAutentication(false);
      }
  
    })
  
  },[recargarProductos]); 
  
  return (
    <Router>
      <Header/>
      <main className="container mt-5">
      <Switch>
        <Route exact path="/" render = {()=> (
          <Login recargar={guardarRecargarProductos} />
        )} ></Route>
            <Route exact path = "/productos" 
               render={()=>(
                 <Producto
                  productos = {productos} auth={Autentication}
                 />
               )}
            />
            <Route exact path = "/horarios" 
               render={()=>(
                 <Horarios
                  horarios = {horarios} auth={Autentication}
                 />
               )}
            />
            <Route exact path = "/productos/nuevo" render ={() =>(<AgregarProducto guardarRecargarProductos={guardarRecargarProductos} auth={Autentication}
            />)}/>
            <Route exact path="/horarios/nuevo"
            render={() => (
              <AgregarHorario
                datos={productos}
                auth={Autentication}
              />
            )} />
                <Route exact path="/arjs"
                component={AR}
              />

            <Route exact path = "/productos/editar/:id" 
             render ={props => {
               //tomar el ID del producto
               const idProducto = props.match.params.id;

               //el producto que se pasa al state
               const producto = productos.filter(producto => producto.id ===
                idProducto);

               return(
                 <EditarProducto
                 producto={producto[0]}/>
               )
              
              }}/>
              <Route exact path="/horarios/editar/:id"
               render={props => {
              // tomar el id del horario
              const idHorario = props.match.params.id;

              //el lab que se pasa al state
              const horario = horarios.filter(horario => horario.id ===
                idHorario);
              return (
                <EditarHorario
                  horario={horario[0]}
                  datos={productos}
                //guardarRecargarLaboratorios={guardarRecargarLaboratorios}
                />
              )
            }}
          />
      </Switch>
      </main>
      <p className="mt-4 p2 text-center"></p>
    </Router>
  );
}
export default App;