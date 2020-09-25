import React from 'react';
import ImageForm from '../../components/UpImageForm';
import styled from 'styled-components';



const ImageContainer = () => {

    return (
        <IMGContainer className="responsive">
            <div className="column">
                <h2> EVIDENCIAS FOTOGRAFICAS</h2>
            </div>
            <br/>
            <div className="column">
                <ImageForm/>
            </div>
        </IMGContainer>

    )
}
//NO MOVER, solo dios sabe como funciona

/*PARA FUTUROS DESARROLLADORES

    Si piensas que puedes hacer un diseño mobile first
    sumale 1 al contador: 1
*/
const IMGContainer = styled.div`
display: flex;
flex-direction: column;
align-content: center;
align-items: center;
.column {
  justify-content: center;
  &:nth-child(1) {
    flex: 1;
  }
  &:nth-child(2) {
    flex: 2;
    background-color: #fafafa;
    justify-content: center;
  }
}


@media screen and (max-width: 750px) {
  flex-direction: column;
  display: flex;
  align-content: center;
  align-items: center;
  .column {

    &:nth-child(1) {
      width: 100%;
      justify-content: center;
    }

    &:nth-child(2) {
      background-color: ##a4a4a4;
      justify-content: center;
    }
  }
}
`;

export default ImageContainer