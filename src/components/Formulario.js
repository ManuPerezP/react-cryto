import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda";
import useCryptomoneda from "../hooks/useCryptomoneda";
import Error from './Error';
import axios from "axios";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;
`;

const Formulario = ({guardarMoneda,guardarCryptoMoneda}) => {
  const [listaCrypto, guardarCrypto] = useState([]);
  const [error, setError] = useState(false);

  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar de Estados Unidos" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
  ];
  const [moneda, SeleccionarMoneda, actualizarState] = useMoneda(
    "Elige tu Moneda",
    "",
    MONEDAS
  );
  const [cryptomoneda, SeleccionarCrypto] = useCryptomoneda(
    "Elige tu CryptoMoneda",
    "",
    listaCrypto
  );

  useEffect(() => {
    const consultarAPI = async () => {
      const api =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const resultado = await axios.get(api);
      guardarCrypto(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    //validar campo
    if (moneda === "" || cryptomoneda === "") {
                setError(true);
    return;
    }   

    setError(false);

    guardarMoneda(moneda);
    guardarCryptoMoneda(cryptomoneda);
  };

  return (
    <form onSubmit={onSubmit}>
        {error ? <Error mensaje='Todos los campos son obligatorios.'/> : null}
      <SeleccionarMoneda />
      <SeleccionarCrypto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
