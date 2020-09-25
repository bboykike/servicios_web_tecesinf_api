import React from 'react';
import styled from 'styled-components';
import { TextField, Button, NativeSelect  } from '@material-ui/core';
import {Formik} from 'formik';
import Api from '../../Helpers/Api';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const AccesorioForm = ({setOpen}) =>{
         const {IDequipo} = useParams();
        //inicializamos donde vamos a setear el array
        const postData = (data) => {
            Api.post('/Accesorios', data)
           .then(res => {
               {setOpen( false )}
           })        
       }
    return(
        <AccesorioCard>
            <div> 
                <Formik
                    initialValues={{ Nombre:'',Marca:'', NoSerie:'',Status:'', IDequipo:IDequipo}}
                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true);
                        postData(data);
                        // console.log("submit", data)
                        Swal.fire({
                          position: 'top-center',
                          icon: 'success',
                          title: 'El accesorio se guardo éxitosamente',
                          showConfirmButton: false,
                          timer: 1500
                        }).then(function (){
                          window.location = "/Accesorios/" + IDequipo;
                          //make async call
                          setSubmitting(false);
                        });
                        
                    }}             
                >
            {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
             <form onSubmit={handleSubmit}>
        <div className="datos">
                    <div>
                        <p>NUEVO ACCESORIO</p>
                    </div>
                        <div>
                        <TextField label="Nombre del accesorio" 
                         name="Nombre"
                         required
                         inputProps={{
                            maxLength: 25,
                          }}
                         value={values.Nombre}
                         onChange={handleChange}
                         onBlur={handleBlur}                       
                        />
                        </div>
                        <div>
                        <TextField  label="Marca"
                         name="Marca"
                         required
                         inputProps={{
                            maxLength: 25,
                          }}
                         value={values.Marca}
                         onChange={handleChange}
                         onBlur={handleBlur}    />
                        </div>
                        <div>
                        <TextField label="No serie del equipo al que pertenece" 
                          name="NoSerie"
                          required
                          value={values.NoSerie}
                          inputProps={{
                            maxLength: 30,
                          }}
                          onChange={handleChange}
                          onBlur={handleBlur}                          
                        />
                        </div>
                        <div>
                        <NativeSelect
                          name="Status"
                          required
                          value={values.Status}
                          onChange={handleChange}
                          onBlur={handleBlur}                             
                        >
                            <option value="">Estatus del acceserio</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                            <option value="Otro">Otro</option>
                        </NativeSelect>
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
        </AccesorioCard>

    )
}
const AccesorioCard=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    .datos{
        div{
          width: 300px;
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

export default AccesorioForm
