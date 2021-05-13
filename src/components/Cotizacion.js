import React from 'react';
import styled from '@emotion/styled';



const ResultadoDiv = styled.div`
    color:#FFF;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
    font-size:18px;

    span {
        font-weight: bold;
    }
    
`;

const Precio = styled.p`
    font-size:30px;
    span {
        font-weight: bold;
    }
`;

const Cotizacion = ({cotizacion})=>{
    if(Object.keys(cotizacion).length === 0) return null;

    console.log(cotizacion);

return(
    <ResultadoDiv>
        <Precio>El precio es: <span>{cotizacion.PRICE}</span></Precio>
        <Info>El precio más alto del dia: <span>{cotizacion.HIGHDAY}</span></Info>
        <Info>El precio más bajo del dia: <span>{cotizacion.LOWDAY}</span></Info>
        <Info>Variación ultimas 24 horas: <span>{cotizacion.CHANGEPCT24HOUR}</span></Info>
        <Info>Última Actualización: <span>{cotizacion.LASTUPDATE}</span></Info>

    </ResultadoDiv>
)
}

export default Cotizacion;
