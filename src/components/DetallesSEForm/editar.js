import React, {useEffect} from 'react'
import styled from 'styled-components';
import {TextField, Button, NativeSelect} from '@material-ui/core';
import {Formik} from 'formik';
import Api from '../../Helpers/Api';
import Swal from 'sweetalert2';

const EditarForm = ({setOpen, services}) =>{       
    const [empleados,setEmpleados]=React.useState([])

    const service = {services}
    const IDservicio = services.servicios.IDServiceSE
    const[userN, setUser] = React.useState({}) 
    const [date, setDate] = React.useState("")

    const handleClose = () => {
        {setOpen(false);}
    };
    const usuarioInicial = async () =>{
      const resp =  await Api.get(`/Usuarios/${services.servicios.IDusuario}`)
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
            console.log('tienes',service)
        }, [] )
    const postData = async (data) => {
        const IDservi = services.servicios.IDServiceSE; 
        const ID=services.servicios.IDusuario; 
        data.servicios.IDusuario=ID
        data.historial.IDusuario=ID
        data.historial.Fecha=date
         console.log('Nuevo valor', data)
        const res = await Api.put(`/ActualizarSE/${IDservi}`, data)
        if(res.data===true){
            Swal.fire({
                  position: 'top-center',
                  icon: 'success',
                  title: 'Los datos se actualizaron éxitosamente',
                  showConfirmButton: false,
                  timer: 1500
                }).then(function(){
                    window.location = "/SeguimientoSE";
                });
        }else{
            Swal.fire({
                  position: 'top-center',
                  icon: 'error',
                  title: 'No se ha podido actualizar los datos, por favor intente de nuevo',
                  showConfirmButton: false,
                  timer: 1500
                }).then(function(){
                    window.location = "/SeguimientoSE";
                });
        }
    }
    
    return (
     <Service>  
        <div>
        <Formik
            initialValues={{servicios:{IDServiceSE:services.servicios.IDServiceSE, 
            Tipo:services.servicios.Tipo, FechaIn:services.servicios.FechaIn,Problema:services.servicios.Problema,
             Encargado:services.servicios.IDusuario, Cliente:services.servicios.IDcliente,IDusuario:''},
             historial:{Fecha:date, Comentario:'', IDServiceSE:services.servicios.IDServiceSE, IDusuario:''}}}
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
                        name="servicios.Tipo"
                        defaultValue= {`${services.servicios.Tipo}`}
                        required
                        value={values.Tipo}
                        onChange={handleChange}
                        onBlur={handleBlur}           
                    />
                </div>
                <div>
                    <TextField label="Descripción del problema"
                        required
                        name="servicios.Problema"
                        defaultValue= {`${services.servicios.Problema}`}
                        value={values.Problema}
                        onChange={handleChange}
                        onBlur={handleBlur}                     
                    />
                </div>
                <br/>
                <div>
                <NativeSelect 
                         name="servicios.Encargado"
                         required
                         value={values.Encargado}
                         onChange={handleChange}
                         onBlur={handleBlur}     
                                      
                    >
                        <option  value={services.servicios.IDusuario}>{userN.data}</option>
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
                         name="servicios.FechaIn"
                         defaultValue= {`${services.servicios.FechaIn}`}
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