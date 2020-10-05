import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Api from '../../Helpers/Api';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { Dialog, DialogContent, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import EditarForm from '../DetallesForm/editar'

const VerMas = ({ servicios, setModalOpen }) => {
  const [services, setService] = React.useState([])
  const [equipos, setEquipos] = React.useState({})
  const IDtab = { servicios }
  const IDbusqueda = IDtab.servicios.IDservicio
  const ID = services.IDequipo
  const history = useHistory();
  //
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const cerrar = () => {
    setModalOpen(false)
  }


  const Next = () => {
    history.push(`/Ver/${services.IDservicio}`);
  }

  const Get = async () => {
    const response = await Api.get(`Equipos/${ID}`)
    const eq = response.data;
    setEquipos(eq)
  }
  const GetData = async () => {
    const response = await Api.get(`DetalleServicio/${IDbusqueda}`)
    const service = response.data;
    if (service != null) {
      setService(service[0])
      // console.log('Envias', ID)
    }

  }
    ;
  useEffect(() => {
    GetData()
  }, []);

  if (ID != null) {
    Get()
  }

  return (
    <DetallesCard>
      <Typography variant="h6" gutterBottom>
        DETALLES DE SERVICIO
        </Typography>
      {/* {services.map(detalle=>( */}
      <Grid key={services.IDservicio} container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Tipo de servicio"
            value={services.Tipo}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Fecha y hora asignada"
            value={services.FechaIn}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            label="Descripción del problema"
            value={services.Problema}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Estatus del servicio"
            value={services.Status}
            fullWidth
          />
        </Grid>
      </Grid>
      {/* ))} */}
      <br />
      <Typography variant="h6" gutterBottom>
        DETALLES DEL EQUIPO
        </Typography>
      <br />
      <Grid key={equipos.IDequipo} container spacing={3}>
        <Grid item xs={12}>
          <TextField
            multiline
            label="Tipo de Equipo"
            value={equipos.TipoEquipo}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField value={equipos.Marca} label="Marca" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Modelo"
            fullWidth
            value={equipos.Modelo}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="No. de serie"
            value={equipos.NoSerie}
            fullWidth
          />
        </Grid>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          services={services}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <EditarForm services={services} setOpen={setOpen} />
          </DialogContent>
        </Dialog>
        <Grid align="center" item xs={12}>
          <Button onClick={handleClickOpen} variant="contained" color="primary" >Actualizar</Button>
          <Button onClick={cerrar} variant="contained" color="primary" >Cerrar</Button>
        </Grid>
      </Grid>
    </DetallesCard>
  )
}

const DetallesCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
 `

export default VerMas;