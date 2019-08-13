import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from './components/conexion/firebase';

//Import de componentes
import Header from './components/Header';
import AddLab from './components/AddLab';
import Horarios from './components/Horarios';
import AddHorario from './components/AddHorario';
import Labs from './components/Labs';
import EditarHorario from './components/EditarHorario';
import EditarLab from './components/EditarLab';
import DetalleHorario from './components/DetalleHorario';
import DetalleLab from './components/DetalleLab';

function App() {
  //En el brazo de pruebas
  
  const [laboratorios, setLaboratorios] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [recargar, setRecargar] = useState(true);

  useEffect(() => {
    if (recargar) {
      firebase.firestore().collection('laboratorio').onSnapshot((snapshot)=>{
        const datos = snapshot.docs.map((dato)=>({
          id: dato.id,
          ...dato.data()
        }))
        setLaboratorios(datos);
      });
      firebase.firestore().collection('horario').onSnapshot((snapshot)=>{
        const datos = snapshot.docs.map((dato)=>({
          id: dato.id,
          ...dato.data()
        }))
        setHorarios(datos);
      });
    }

    //Cambiar a false la recarga, para que no se este consultando a la API a cada momento
    setRecargar(false)
    
  }, [recargar])
  
  return (
    <Router>
      <Header />
      <main className="container mb-5 ">
        <Switch>
          <Route exact path="/" render={()=>(
            <Labs laboratorios={laboratorios} recargar={setRecargar}/>
          )} />

          <Route exact path="/nuevo-laboratorio"  render={()=>(
            <AddLab recargar={setRecargar} />
          )} />

          <Route exact path="/horarios" render={()=>(
            <Horarios horarios={horarios} recargar={setRecargar}/>
          )} />

          <Route exact path="/nuevo-horario" render={()=>(
            <AddHorario datos={laboratorios} recargar={setRecargar} />
          )} />

          <Route exact path="/horarios/editar/:id" render={props=> {
            //Tomando el id del horario
            const idHorario = props.match.params.id;
            //horario que se pasa al state 
            const horario = horarios.filter(horario => horario.id === idHorario);
            return (
              <EditarHorario horario={horario[0]} datos={laboratorios} recargar={setRecargar} />
            )
          }}/>
          <Route exact path="/laboratorios/editar/:id" render={props=>{
            //Tomando el id del lab
            const idLab = props.match.params.id;
            //lab que se pasa al state 
            const lab = laboratorios.filter(lab => lab.id === idLab);
            return (
              <EditarLab lab={lab[0]} recargar={setRecargar} />
            )
          }} />

          <Route exact path="/horarios/detalle/:id" component={DetalleHorario} /> 

          <Route exact path="/laboratorios/detalle/:id" component={DetalleLab}/>
        </Switch>
      </main>
      <footer id="sticky-footer" className="py-4 bg-dark text-white-50">
        <div className="container text-center">
          <small>Copyright &copy; webtechq.com</small>
        </div>
      </footer>
    </Router>
  );
}

export default App;
