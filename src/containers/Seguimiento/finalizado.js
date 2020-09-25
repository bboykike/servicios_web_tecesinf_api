import React from 'react';
import FinalizadoForm from '../../components/SeguimientoForm/finalizadoList';
import styled from 'styled-components';



const FinalizadoContainer = () => {

    return (
        <ServicioContainer className="responsive">
            <label>SERVICIOS FINALIZADOS</label>
            <br/>
            <div className="column">
                <FinalizadoForm/> 
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
@media screen and (max-width: 800px){ 
    display: flex;
    flex-direction: horizontal;
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


        flex-direction: column;

        .column{
            margin-bottom: 24px;
            &:nth-child(1){
                width: 100%  
            }
        }

    }

`;

export default FinalizadoContainer;