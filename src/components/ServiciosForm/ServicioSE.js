import React, {useEffect} from 'react'
import styled from 'styled-components';
import {TextField, Button, NativeSelect} from '@material-ui/core';
import {Cookies} from 'react-cookie'
import {Formik} from 'formik';
import Api from '../../Helpers/Api';
import Swal from 'sweetalert2';

const ServicioSEs = ({idG, client, setActiveStep}) =>{
    let fechaRegistroSE = new Date()

    const cookie = new Cookies();           
    const idEquipos=idG;
    const idClient=client.IDcliente;
    const correo =client.Email
    console.log(correo)
    const [fechas, setDate] = React.useState("")
    const [empleados,setEmpleados]=React.useState([])
    const [cookiee, setCoo] = React.useState([])

    const getCookie = () => {           
        console.log(cookie.get('ID'));  
        const IDu = cookie.get('ID');
        console.log('Recuperaste', IDu)
        setCoo(IDu)
    }  
    //obtener fecha
    const getDate =()=> {
        console.log('entra')
        var today = new Date();   
        const fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);   
        setDate(fecha)
    }
    //Use effect para recargar 1 vez
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
        data.servicio.IDusuario=ID
        data.historial.Fecha=fechas
        data.historial.IDusuario=ID
        console.log('Nuevo valor', data)
        const res = await Api.post('RegistroSE', data)
        if(res.data!==undefined){
            Swal.fire({
                  position: 'top-center',
                  icon: 'success',
                  title: 'La orden de servicio se guardo éxitosamente',
                  showConfirmButton: false,
                  timer: 1500
                }).then(function() {

                // Plantilla del correo electronico que se envía al cliente cuando es dado de alta una orden de servicio :)
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
                        subject:  `SERVICIO TECESINF ${fechas}`,
                        body: html
                      }
                    Api.post('/Email', email)
                window.location = "/SeguimientoSE";

            });
            
        }else{
            Swal.fire(
              'ERROR',
              'Ocurrio un error, contacta al administrador',
              'error'
            )
        }

        // .then( Api.post('/Email', email))      
    }


    return (
     <Service>  
        <div>
        <Formik
            initialValues={{servicio:{Tipo:'', FechaIn:'',Problema:'',
             Encargado:'', Cliente:idClient,IDusuario:'', fechaRegistroSE},
             historial:{Comentario:'', Fecha:fechas, IDServiceSE:'', IDusuario:''},
             status:{Status:'Iniciado', IDservicio:''}}}
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
                        name="servicio.Tipo"
                        value={values.Tipo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required                     
                    />
                </div>
                <div>
                    <TextField label="Descripción del problema"
                        name="servicio.Problema"
                        value={values.Problema}
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        required                    
                    />
                </div>
                <br/>
                <div>
                <NativeSelect 
                         name="servicio.Encargado"
                         value={values.Encargado}
                         onChange={handleChange}
                         onBlur={handleBlur} 
                                            
                    >
                        <option value="">Empleado encargado del servicio</option>
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
                         name="historial.Comentario"
                         value={values.Comentario}
                         onChange={handleChange}
                         onBlur={handleBlur}                       
                    />
                </div>
                <br/>
                <div>
                    <TextField type="datetime-local"
                         name="servicio.FechaIn"
                         InputLabelProps={{
                            shrink: true,
                          }}
                         value={values.FechaIn}
                         onChange={handleChange}
                         onBlur={handleBlur}  
                         required                    
                    />
                </div>
                <div>
                    <TextField style={{display: "none"}}
                        name="servicio.fechaRegistroSE"
                        value={fechaRegistroSE}
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

export default ServicioSEs