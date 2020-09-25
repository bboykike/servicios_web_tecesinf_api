import React,{useEffect} from 'react'
import styled from 'styled-components';
import {useHistory} from 'react-router';
import { TextField, Button, NativeSelect  } from '@material-ui/core';
import {Cookies} from 'react-cookie'
import {Formik} from 'formik';
import Api from '../../Helpers/Api';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';


const EquiposForm = ({setOpen}) =>{
    const {IDsucursal} = useParams()
    //Instanciamos
    const history = useHistory();
    //El replace para desesctructurar la pagina
    const go = () => history.push('/')
    //Validacion
    //Usamos el hook para que solo se ejecute una vez cada que se recargue la pagina
    //obtienes las cookies y si no encuentra tu token te saca y te manda al login 
    useEffect(() => {
        const getCookie = () => {
            const cookie = new Cookies();
            
            console.log(cookie.get('Token'));
            // if(cookie.get('id_user') === undefined || null) {
            //     go();
            // }
        }

        getCookie();
    }, [])
    //
    //inicializamos donde vamos a setear el array
    const postData = (data) => {
         Api.post('/RegistroEquipo', data)
        .then(res => {
            {setOpen( false )}
        })        
    }

    return (

        <EquipoForm>
            <div>
                <Formik
                    initialValues={{ equipos:{TipoEquipo: '', NomEquipo: '', Marca:'', Modelo:'', NoSerie:'',
                    IDsucursal:IDsucursal}, status:{Status:'', IDequipo:''}}}
                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true);
                        postData(data);
                        // console.log("submit", data)
                        Swal.fire({
                          position: 'top-center',
                          icon: 'success',
                          title: 'El equipo se guardo éxitosamente',
                          showConfirmButton: false,
                          timer: 1500
                        }).then(function (){
                          window.location = "/Equipos/" + IDsucursal;
                          //make async call
                          setSubmitting(false);
                        });
                    }}             
                >
            {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit}> 
        <div className="datos">
                    <div>
                        <p>NUEVO EQUIPO</p>
                    </div>                       
                    <div>
                    <TextField 
                        name="equipos.TipoEquipo"
                        value={values.TipoEquipo}
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        required                       
                        label="Tipo Equipo" 
                        />
                    </div>
                    <div>
                    <TextField 
                        name="equipos.NomEquipo"
                        value={values.NomEquipo}
                        onChange={handleChange}
                        onBlur={handleBlur}  
                        label="Nombre del equipo"
                        required/>
                    </div>
                    <div>
                    <TextField
                        name="equipos.Marca"
                        value={values.Marca}
                        onChange={handleChange}
                        onBlur={handleBlur}  
                        label="Marca"
                        required/>
                    </div>
                    <div>
                    <TextField 
                        name="equipos.Modelo"
                        value={values.Modelo}
                        onChange={handleChange}
                        onBlur={handleBlur}                           
                        label="Modelo" 
                        required/>
                     </div>
                    <div>
                    <TextField 
                        name="equipos.NoSerie"
                        value={values.Nombre}
                        onChange={handleChange}
                        onBlur={handleBlur}  
                        label="No. Serie" 
                        required/>
                    </div>
                    <div>
                    <NativeSelect 
                         name="status.Status"
                         required
                         value={values.Status}
                         onChange={handleChange}
                         onBlur={handleBlur}                    
                    >
                        <option value="">Status</option>
                        <option value="1">Activo</option>
                        <option value="2">Inactivo</option>
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
        </EquipoForm>
    )
}

const EquipoForm=styled.div`
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
        &:nth-child(6){
            padding:0;
        }
        &:nth-child(7){
            padding:0;
        }
        &:nth-child(8){
            padding:0;
        }
        &:nth-child(9){
            padding:0;
        }
        &:nth-child(10){
            flex-direction: horizontal;
            padding:0;
        }
        &:nth-child(11){
            padding:0;
        }
    }
}
`;
const ButtonsStyle = styled.div`
    display: flex;
    flex-direction: horizontal;
    ${'' /* border-style: none;
    border-radius: 8px;
    width: 220px;
    background-color: #A4A4A4; */}

    .btn{
        align-items: center;
        width: 40%;
    }
`;

export default EquiposForm