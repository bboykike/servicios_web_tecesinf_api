import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import Api from '../../Helpers/Api';
import {Button} from '@material-ui/core';
import { Dialog, DialogContent, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { Formik } from 'formik';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

const  TableHistorial = ({servicios, setHistorialOpen}) => {
  const history = useHistory();
  const servicio = {servicios}
  // console.log(servicio)
  const ID = servicio.servicios.IDservicio
  const IDstatus = servicio.servicios.IDstatus
  const [informes, setInformes]= React.useState([])
  console.log(informes)  

  // Recolesta los comentarios de la table Historial
  const comentarioDEtalle = informes.map((informes, i) => informes.Comentario);



  const [open, setOpen]= React.useState(false);
  const theme = useTheme();
  const [date, setDate]= React.useState("")
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
          //obtener fecha
          const getDate =()=> {
            var today = new Date();   
            const fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);   
            setDate(fecha)
        }

  const handleClickOpen = () => {
    setOpen(true)
  }
  const closeModal=()=>{
    {setHistorialOpen(false)}
  }
  const handleClose = ()=>{
    setOpen(false)
  }
  const columns = [
    {
      title: "ID",
      field: "IDhistoria"
    },
    {
      title: "Fecha",
      field: "Fecha"
    },
    {
      title: "Comentario",
      field: "Comentario"
    }
  ];
 

 // plantilla del correo
      const Enviar = () =>{
      const html=`<table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
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
                                <h2 style="color: #e67e22; margin: 0 0 7px">Hola!</h2>
                                <p style="margin: 2px; font-size: 15px">
                                    Gracias, tu número de solicitud es #${servicio.servicios.IDservicio}<br><br>
                                    
                                    Se le informa que su servicio ${servicio.servicios.Tipo} ha finalizado el día ${date}.<br><br>

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
                to: `${servicio.servicios.Email}`,
                subject:  `SERVICIO TECESINF ${date}`,
                body: html
              }
      Api.post('/Email', email)}

  
  const PostData= async(data)=>{
      // console.log(data)
    const response = await Api.put(`/ActualizarSt/${IDstatus}`, data)
    if(response.data===true){
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Se ha finalizado con exito',
        showConfirmButton: false,
        timer: 1500
      }).then(function() {
        Enviar()
        handleClose()
        window.location = "/Seguimiento";
      }); 
      
    }else{
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'Ocurrio un error, por favor intente nuevamente',
        showConfirmButton: false,
        timer: 1500
      }).then(function() {       
        window.location = "/Seguimiento";
      }); 
    }

  }

  useEffect(() => {   
    const GetData = async () =>{
        const response =  await Api.get(`ListaHistorial/${ID}`)
        setInformes(response.data);
      };    
        GetData()
        getDate()
  }, [] ) ; 

  const NuevoInforme =()=>{
    return(
      <div>
      <Formik
      initialValues={{status:{IDstatus:servicio.servicios.IDstatus, NombreStatus:'Finalizado', IDservicio:ID},
      historial:{ Fecha: date, Comentario: '', IDservicio:ID, IDusuario:servicio.servicios.IDusuario }}}
      onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // console.log("submit", data)
          PostData(data)
          //make async call
          setSubmitting(false);
      }}
      >
      {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
      <form onSubmit={handleSubmit}>
         <Typography align="center" variant="h6" gutterBottom>
          FINALIZAR SERVICIO
        </Typography>
        {/* {services.map(detalle=>( */}
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <TextField
            label="Fecha de registro"
            defaultValue= {`${date}`}
            value={values.Fecha}
            disabled
            // defaultValue={`${date}`}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            name="historial.Comentario"
            required
            label="Descripción del informe"
            values={values.Comentario}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
          />
        </Grid>
        <Button color="primary" variant="contained" type="submit" disabled={isSubmitting} >Guardar</Button>
        <Button color="primary" variant="contained" onClick={handleClose}>Cerrar</Button>
        </Grid>
        </form>
         )}
       </Formik>
      </div>
    )
  }
  return (
    <>
    <MaterialTable
      title="Historial"
      columns={columns}
      data={informes}
      options={{
        actionsColumnIndex: -1,
        exportButton: true
      }}
    />
    <br/>
    <Button onClick={handleClickOpen} color="primary" variant="contained">Finalizar Servicio</Button>
    <Button onClick={closeModal} color="primary" variant="contained">Cerrar</Button>
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
>
      <DialogContent>  
      <NuevoInforme />
      </DialogContent>
      </Dialog>
    </>
  );

}




const LoginCard = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
width:80vw;
height:80vh;
border-radius: 25px;
`;

export default TableHistorial;



