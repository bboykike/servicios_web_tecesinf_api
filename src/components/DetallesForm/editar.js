import React, {useEffect} from 'react'
import styled from 'styled-components';
import {TextField, Button, NativeSelect} from '@material-ui/core';
import {Formik} from 'formik';
import Api from '../../Helpers/Api';
import Swal from 'sweetalert2';

const EditarForm = ({setOpen, services}) =>{       
    const [empleados,setEmpleados]=React.useState([])
    const [service, setService]= React.useState({services})
    const[userN, setUser] = React.useState({}) 
    const [date, setDate] = React.useState("")

    const handleClose = () => {
        {setOpen(false);}
    };
    const usuarioInicial = async () =>{
      const resp =  await Api.get(`/Usuarios/${service.services.IDusuario}`)
      if(resp!=null){
          setUser(resp)
      }
    }
        //obtener fecha
        const getDate =()=> {
            var today = new Date();   
            const fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);   
            setDate(fecha)
        }

    useEffect(() => {       
        const GetData = async () =>{
          const response =  await Api.get('GetUsuarios');
          const empleado = response.data;
          setEmpleados(empleado);
          usuarioInicial()
        };          
            GetData()
            getDate()
            console.log(service)
        }, [] )
    const postData = async (data) => {
        const ID=service.services.IDusuario; 
        data.servicio.IDusuario=ID
        data.historial.IDusuario=ID
        data.historial.Fecha=date
        console.log('Nuevo valor', data)
        const res = await Api.put(`/ActualizarS/${ID}`, data)
        if(res.data===true){
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Se actualizo éxitosamente',
                showConfirmButton: false,
                timer: 1500
              }).then(function() {                    
                  window.location = "/Seguimiento";
              });
        }else{
            Swal.fire({
                position: 'top-center',
                icon: 'erro',
                title: 'Ocurrio un error inesperado, intente de nuevo',
                showConfirmButton: false,
                timer: 1500
              }).then(function() {                    
                  window.location = "/Seguimiento";
              });

        }
    }
    
    return (
     <Service>  
        <div>
        <Formik
            initialValues={{servicio:{IDservicio:service.services.IDservicio, 
            Tipo:service.services.Tipo, FechaIn:service.services.FechaIn,Problema:service.services.Problema,
             Encargado:service.services.IDusuario, IDcliente:service.services.IDcliente,IDusuario:'',IDequipo:service.services.IDequipo},
             historial:{Fecha:'', Comentario:'', IDservicio:service.services.IDservicio, IDusuario:''}}}
                onSubmit={(data, { setSubmitting})=>{
                setSubmitting(true);
                console.log('enviaste', data)
                postData(data);
                //make async call
                setSubmitting(false);
            }}
            >
            {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
           <form onSubmit={handleSubmit}>
            <div className="datos">
                <div>
                   <h1>ACTUALIZAR</h1>
                </div>
                <div>
                    <TextField label="Tipo de servicio"
                        name="servicio.Tipo"
                        defaultValue= {`${service.services.Tipo}`}
                        required
                        value={values.Tipo}
                        onChange={handleChange}
                        onBlur={handleBlur}           
                    />
                </div>
                <div>
                    <TextField label="Descripción del problema"
                        required
                        name="servicio.Problema"
                        defaultValue= {`${service.services.Problema}`}
                        value={values.Problema}
                        onChange={handleChange}
                        onBlur={handleBlur}                     
                    />
                </div>
                <br/>
                <div>
                <NativeSelect 
                         name="servicio.Encargado"
                         required
                         value={values.Encargado}
                         onChange={handleChange}
                         onBlur={handleBlur}     
                                      
                    >
                        <option  value={service.services.IDusuario}>{userN.data}</option>
                        {empleados.map(empleado=>(
                            
                            <option key={empleado.IDusuario} 
                                value={empleado.IDusuario}>
                                {empleado.UserName}
                            </option>
                        ))}
                </NativeSelect>
                </div>
                <div>
                    <TextField label="Motivo de la actualizacion"
                         required
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
                         defaultValue= {`${service.services.FechaIn}`}
                         InputLabelProps={{
                            shrink: true,
                          }}
                         value={values.FechaIn}
                         onChange={handleChange}
                         onBlur={handleBlur}                      
                    />
                </div>
            </div>
            <br/>
            <ButtonsStyle>
                    <Button  disabled={isSubmitting}  type="submit" className="btn" color="primary">Guardar</Button>
                    <Button  onClick={handleClose}  className="btn" color="primary">Cancelar</Button>
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

export default EditarForm;