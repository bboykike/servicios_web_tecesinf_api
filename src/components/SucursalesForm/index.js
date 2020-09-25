import React from 'react';
import styled from 'styled-components';
import { TextField, Button} from '@material-ui/core';
import {Formik} from 'formik';
import Api from '../../Helpers/Api';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const SucursalForm = ({setOpen}) =>{
    const {IDcliente} = useParams()
    const postData = (data) => {
            Api.post('/Sucursales', data)
            .then( rep => {setOpen( false )});
    }

    return(
        <SucursalCard>
            <div>
            <Formik
                    initialValues={{ Nombre: '', Direccion: '', IDcliente:IDcliente }}
                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true);
                        postData(data);
                        // console.log("submit", data)
                        Swal.fire({
                          position: 'top-center',
                          icon: 'success',
                          title: 'La sucursal se guardo éxitosamente',
                          showConfirmButton: false,
                          timer: 1500
                        }).then(function (){
                          window.location = "/Sucursales/" + IDcliente;
                          //make async call
                          setSubmitting(false);
                        });
                        
                    }}
                >
                    {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                    <div className="datos">
                    <div>
                        <p>NUEVA SUCURSAL</p>
                    </div>
                         <div>
                        <TextField label="Nombre de la sucursal"
                            name="Nombre"
                            value={values.Nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}                        
                        />
                        </div>
                         <div>
                        <TextField  label="Direccion"
                             name="Direccion"
                             value={values.Direccion}
                             onChange={handleChange}
                             onBlur={handleBlur}                         
                        />
                        </div>
                        <br/>
                        </div>
                <ButtonsStyle>
                    <Button disabled={isSubmitting}  type="submit" className="btn" variant="contained" color="primary">Agregar</Button>
                </ButtonsStyle>                 
                </form>
                 )}
             </Formik>
        </div>
        </SucursalCard>
    )
}
const SucursalCard=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    .datos{
        div{
            width:90%
            padding: 0;
            &:nth-child(1){
                display: flex;
                flex-direction: horizontal;
                justify-content: space-around;
                padding: 0;
            }
            &:nth-child(2){
                padding: 0;
            }
            &:nth-child(3){
                padding: 0;
            }
            &:nth-child(4){
                padding: 0;
            }
            &:nth-child(5){
                padding: 0;
            }
        }
    }
`;

const ButtonsStyle = styled.div`
    display: flex;
    flex-direction: horizontal;
    align-items: center;
    ${'' /* border-style: none;
    border-radius: 8px;
    width: 220px;
    background-color: #A4A4A4; */}

    .btn{
        align-items: center;
        align-content: center;
        width: 100%;
    }
`;

export default SucursalForm;