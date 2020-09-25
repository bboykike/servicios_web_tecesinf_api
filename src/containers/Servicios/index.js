import React from 'react';
import NuevoServicio from '../../components/ServiciosForm';
import styled from 'styled-components';



const ServiciosContainer = () => {

    return (
        <ServicioContainer className="responsive">
            <div className="column">
                <NuevoServicio/>
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
    flex-direction: horizontal;

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

export default ServiciosContainer