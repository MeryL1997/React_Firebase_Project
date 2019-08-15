import React, { useState } from 'react';
import { AFrameRenderer, Marker } from 'react-web-ar';
import firebase from '../conexion/firebase';

export default function Ar (){  

  const [horarios, guardarHorarios] = useState([]);
  const consulta = ()=>{
    firebase.firestore().collection('horario').where('lab','==','Laboratorio 1')
      .onSnapshot((snapshot) => {
        const datos = snapshot.docs.map((dato) => ({
          id: dato.id,
          ...dato.data()
        }))
        guardarHorarios(datos);
        console.log(horarios)
      });

      firebase.firestore().collection('horario').where('lab','==','Laboratorio 2')
      .onSnapshot((snapshot) => {
        const datos = snapshot.docs.map((dato) => ({
          id: dato.id,
          ...dato.data()
        }))
        guardarHorarios(datos);
        console.log(horarios)
      });
  }

  return (
    <AFrameRenderer arToolKit={{ sourceType: 'webcam' }}>
      {consulta()}
      <Marker parameters={{
          preset: "pattern",
          type: "pattern",
          url: "https://github.com/MeryL1997/React_Firebase_Project/blob/master/src/components/marcadores/pattern%20de%20MArcadores/Lab1.patt"
        }}>
          <a-text
						rotation="-100 0 0"
						color="#0eff00"
						height="2.5"
						width="2.5"
						position="-0.5 0.1 0"
					/>
      </Marker>

      <Marker parameters={{
          preset: "pattern",
          type: "pattern",
          url: "https://github.com/MeryL1997/React_Firebase_Project/blob/master/src/components/marcadores/pattern%20de%20MArcadores/Lab2.patt"
        }}>
          <a-text
						rotation="-100 0 0"
						color="#0eff00"
						height="2.5"
						width="2.5"
						position="-0.5 0.1 0"
					/>
      </Marker>
      
    </AFrameRenderer>
  )
}