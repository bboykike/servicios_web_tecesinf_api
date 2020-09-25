import React from 'react';
import VerMas from '../../components/DetallesForm';
import styled from 'styled-components';



const DetallesContainer = () => {

    return (
        <ServicioContainer className="responsive">
            <div className="column">
                <VerMas/>
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
    flex-direction: column;
    display: flex;
    flex-direction: horizontal;
    @media screen and (max-width: 800px){
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
    }

`;
export default DetallesContainer;