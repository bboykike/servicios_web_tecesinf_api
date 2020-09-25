import React from 'react';
import TablePrueba from '../../components/SeguimientoForm';
import styled from 'styled-components';
import {Button} from '@material-ui/core';



const SeguimientoContainer = () => {

    return (
        <ServicioContainer className="responsive">
            <label>TODOS MIS SERVICIOS</label>
            <br/>
            <div className="column">
                <TablePrueba/> 
                <br/>
                <Button align="center" variant="contained" color="primary" >Ver servicios sin asignar</Button>
            </div>
        </ServicioContainer>

    )
}
//NO MOVER, solo dios sabe como funciona

/*PARA FUTUROS DESARROLLADORES

    Si piensas que puedes hacer un diseño mobile first
    sumale 1 al contador: 1
*/
const ServicioContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
        .column{
            &:nth-child(1){
                flex: 1;
            }
             &:nth-child(2){
                flex: 2;
                background-color: #FAFAFA;
                justify-content: center;
            }
        }

        @media screen and (max-width: 800px){ 
        flex-direction: column;

        .column{
            margin-bottom: 24px;
            &:nth-child(1){
                width: 100%  
            }
        }

    }

`;

export default SeguimientoContainer