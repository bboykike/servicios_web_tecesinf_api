import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import Api from '../../Helpers/Api';
import { Button } from '@material-ui/core';
import { Dialog, DialogContent, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { Formik } from 'formik';
import Swal from 'sweetalert2';

const TableInforme = ({ servicios, setInfOpen }) => {
  const servicio = { servicios }
  const ID = servicio.servicios.IDServiceSE
  const [informes, setInformes] = React.useState([])
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [date, setDate] = React.useState("")
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  //obtener fecha
  const getDate = () => {
    var today = new Date();
    const fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    setDate(fecha)
  }

  const close = () => {
    { setInfOpen(false) }
  }
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const columns = [
    {
      title: "ID",
      field: "IDinforme"
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
  const PostData = async (data) => {
    console.log(data)
    const response = await Api.post('/InformeTecSEs', data)
    if (response != null) {
      handleClose();
      close();
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'El informe se agrego éxitosamente',
        showConfirmButton: false,
        timer: 1500
      }).then(function () {
        handleClose();
        close();
        window.location = "/SeguimientoSE";
      });
    } else {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'Ocurrio un error, por favor intentelo nuevamente',
        showConfirmButton: false,
        timer: 1500
      }).then(function () {
        window.location = "/SeguimientoSE";
      });
    }

  }

  useEffect(() => {
    const GetData = async () => {
      console.log('entra')
      const response = await Api.get(`BuscarInformeSE/${ID}`)
      setInformes(response.data);
      console.log(informes)
    };
    GetData()
    getDate()
  }, []);

  const NuevoInforme = () => {
    return (
      <div>
        <Formik
          initialValues={{ Fecha: date, Comentario: '', IDServiceSE: ID }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            console.log("submit", data)
            PostData(data)
            //make async call
            setSubmitting(false);
          }}
        >
          {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Typography align="center" variant="h6" gutterBottom>
                NUEVO INFORME
        </Typography>
              {/* {services.map(detalle=>( */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Fecha de registro"
                    value={values.Fecha}
                    disabled
                    // defaultValue={`${date}`}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="ID del servicio"
                    values={values.IDservicio}
                    defaultValue={`${ID}`}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    name="Comentario"
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
        title="Informes"
        columns={columns}
        data={informes}
        options={{
          actionsColumnIndex: -1,
          exportButton: true
        }}
      />
      <br />
      <Button onClick={handleClickOpen} color="primary" variant="contained">Agregar Informe</Button>
      <Button onClick={close} color="primary" variant="contained">Cerrar</Button>
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

export default TableInforme;
