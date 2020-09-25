import React, {useEffect} from 'react'
import styled from 'styled-components';
import {TextField, Button, NativeSelect} from '@material-ui/core';
import {Cookies} from 'react-cookie'
import { useHistory } from 'react-router';
import {Formik} from 'formik';
import Api from '../../Helpers/Api';
import Swal from 'sweetalert2';

const NuevoServicio = ({idG, client, setActiveStep}) =>{
    let fechaRegistro = new Date()
    
    const cookie = new Cookies();   
    const history = useHistory();        
    const idEquipos=idG;
    const idClient=client.IDcliente;
    const correo=client.Email;
    console.log(`${correo}`)
    const [empleados,setEmpleados]=React.useState([])
    const [cookiee, setCoo] = React.useState([])
    const [date, setDate]= React.useState("")
            //obtener fecha
            const getDate =()=> {
                var today = new Date();   
                const fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);   
                setDate(fecha)
            }

    const getCookie = () => {           
        // console.log(cookie.get('ID'));  
        const IDu = cookie.get('ID');
        // console.log('Recuperaste', IDu)
        setCoo(IDu)
    }  
    useEffect(() => {       
        const GetData = async () =>{
          const response =  await Api.get('GetUsuarios');
          const empleado = response.data;
          setEmpleados(empleado);
        };
            getCookie();
            GetData()
            getDate()
        }, [] )
        const ID=cookiee;

    const postData = async (data) => {
        data.services.IDusuario=ID
        data.history.IDusuario=ID
        // console.log('Nuevo valor', data)
        const res = await Api.post('RegistroServicio', data)
        if(res.data!==undefined){
            Swal.fire({
                  position: 'top-center',
                  icon: 'success',
                  title: 'La orden de servicio se guardo éxitosamente',
                  showConfirmButton: false,
                  timer: 1500
                }).then(function() {
                    const html= `<table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
                    <tr>
                        <td style="background-color: #ecf0f1; text-align: left; padding: 0">
                            <a href="">
                                <img width="20%" style="display:block; margin: 1.5% 3%" src="">
                            </a>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 0">
                            <img style="padding: 0; display: block" src="https://th.bing.com/th/id/OIP.PD-91UU8Y6BzTFr22hhxlwHaHa?pid=Api&rs=1" width="100%">
                        </td>
                    </tr>
                    
                    <tr>
                        <td style="background-color: #ecf0f1">
                            <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
                                <h2 style="color: #e67e22; margin: 0 0 7px">Hola ${client.Cliente}!</h2>
                                <p style="margin: 2px; font-size: 15px">
                                    Gracias por comunicarte, tu número de solicitud es #${res.data}<br><br>
                                    
                                    Nos comprometemos a responderte en menos de 2 horas hábiles (puede llevar un poco más de tiempo durante los fines de semana).<br><br>

                                    No dudes en contactarnos al teléfono asignado a soporte técnico 999 420 26 73 si deseas una retroalimentación más veloz o si no recibes noticias de nosotros lo suficientemente rápido.

                                </p>                          
                               
                                                              
                               <br><br>
                                <div style="width: 100%; text-align: center">
                                </div>
                                <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">TECESINF</p>
                            </div>
                        </td>
                    </tr>
                </table>`
                        const  email={
                            to: `${client.Email}`,
                            subject:  `SERVICIO TECESINF ${date}`,
                            body: html
                          }
                          // console.log(email)
                        Api.post('/Email', email).then(res=>res(history.push('/Seguimiento')))
                        window.location = "/Seguimiento";
                    });
            
        }else{
            Swal.fire({
              position: 'top-center',
              icon: 'error',
              title: 'Ocurrio un error, pongase en contacto con el administrador',
              showConfirmButton: false,
              timer: 1500
            });
        }     
    }

    return (
     <Service>  
        <div>
        <Formik
            initialValues={{services:{Tipo:'', FechaIn:'',Problema:'',
             Encargado:'', IDcliente:idClient,IDusuario:'',IDequipo:idEquipos, fechaRegistro},
             history:{Comentario:'', Fecha:date, IDservicio:'', IDusuario:''},
             status:{NombreStatus:'Iniciado', IDservicio:''}}}
                onSubmit={(data, { setSubmitting})=>{
                setSubmitting(true);
                console.log('enviaste', data)
                postData(data);
                //make async call
                setSubmitting(false);
            }}
            >
            {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
           <form onSubmit={handleSubmit} autoComplete="off">
            <div className="datos">
                <div>
                   <h1>NUEVO  SERVICIO</h1>
                </div>
                <div>
                    <TextField label="Tipo de servicio"
                        name="services.Tipo"
                        value={values.Tipo}
                        onChange={handleChange}
                        onBlur={handleBlur}  
                        required                   
                    />
                </div>
                <div>
                    <TextField label="Descripción del problema"
                        name="services.Problema"
                        value={values.Problema}
                        onChange={handleChange}
                        onBlur={handleBlur}    
                        required                 
                    />
                </div>
                <br/>
                <div>
                <NativeSelect 
                         name="services.Encargado"
                         required
                         value={values.Encargado}
                         onChange={handleChange}
                         onBlur={handleBlur}                    
                    >
                        <option value="Sin asignar">Empleado encargado del servicio</option>
                        {empleados.map(empleado=>(
                            
                            <option key={empleado.IDusuario} 
                                value={empleado.IDusuario}>
                                {empleado.UserName}
                            </option>
                        ))}
                </NativeSelect>
                </div>
                <div>
                    <TextField label="Comentario extra"
                         name="history.Comentario"
                         value={values.Comentario}
                         onChange={handleChange}
                         onBlur={handleBlur}                       
                    />
                </div>
                <br/>
                <div>
                    <TextField label="Fecha del servicio" type="datetime-local"
                         name="services.FechaIn"
                         defaultValue={`$date`}
                         InputLabelProps={{
                            shrink: true,
                          }}
                         value={values.FechaIn}
                         onChange={handleChange}
                         onBlur={handleBlur}                      
                    />
                </div>
                <div>
                    <TextField style={{display:"none"}}
                      name="services.fechaRegistro"
                      value={fechaRegistro}
                       onChange={handleChange}
                       onBlur={handleBlur} 
                    />
                </div>
            </div>
            <br/>
            <ButtonsStyle>
                    <Button  disabled={isSubmitting}  type="submit" className="btn" color="primary">Agregar</Button>
            </ButtonsStyle>
            </form>
            )}
         </Formik>
        </div>
     </Service>
    )
}

const Service = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
.datos{
    div{
        padding: 0;
        &:nth-child(1){
            display: flex;
            flex-direction: horizontal;
            justify-content: space-around;
            padding: 0;
        }
        &:nth-child(2){
            padding: 0;;
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
`
;

const ButtonsStyle = styled.div`
    display: flex;
    flex-direction: horizontal;
    align-items: center;
    .btn{
        align-content: center;
        width: 100%;
        display: flex;
        align-content: center;
    }
`;

export default NuevoServicio