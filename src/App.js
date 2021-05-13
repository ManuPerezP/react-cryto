import React,{useEffect, useState} from 'react';
import styled from "@emotion/styled";
import imagen from "./cryptomonedas.png";
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spiner from './components/Spinner';
import axios from "axios";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {

const [moneda,guardarMoneda] = useState('');
const [cryptoMoneda,guardarCryptoMoneda] = useState('');
const [cargando,guardarCargando] = useState(false);
const [cotizacion, guardarCotizacion] = useState({});

useEffect(()=>{

const cotizaCriptomoneda = async ()=>{
  if(moneda === '') return

  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoMoneda}&tsyms=${moneda}`;

  const resultado = await axios.get(url);

  guardarCargando(true);

  setTimeout(()=>{
     guardarCotizacion(resultado.data.DISPLAY[cryptoMoneda][moneda]);
     guardarCargando(false);
  },3000);

}

cotizaCriptomoneda();

},[moneda, cryptoMoneda]);

const componente = (cargando) ? <Spiner/>: <Cotizacion cotizacion={cotizacion}/>;

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="img cripto" />
      </div>
      <div>
        <Heading>Cotiza cryptomonedas al instante.</Heading>
        <Formulario guardarMoneda={guardarMoneda} guardarCryptoMoneda={guardarCryptoMoneda}/>
          {componente}
      </div>
    </Contenedor>
  );
}

export default App;
