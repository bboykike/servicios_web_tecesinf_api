import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Api from '../../Helpers/Api';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import {useParams} from 'react-router-dom';
import { Dialog, DialogContent, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import EditarForm from '../DetallesSEForm/editar'

const VerMas =({servicios, setModalOpen})=>{
    const services={servicios}
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
    const cerrar =()=>{
      setModalOpen(false)

    }


    useEffect(() => {       

        }, [] ) ; 


    return (
        <DetallesCard>
        <Typography  variant="h6" gutterBottom>
          DETALLES DE SERVICIO
        </Typography>
        {/* {services.map(detalle=>( */}
        <Grid key={services.servicios.IDServiceSE} container spacing={3}>
        <Grid item xs={12} sm={6}>
        <TextField
            label="Tipo de servicio"
            value={services.servicios.Tipo}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Fecha y hora asignada"
            value={services.servicios.FechaIn}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            label="Descripción del problema"
            value={services.servicios.Problema}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Estatus del servicio"
            value={services.servicios.Status}
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
                        <EditarForm services={services} setOpen={ setOpen } />
                    </DialogContent>
                </Dialog>
        <Grid align="center" item xs={12}>
        <Button onClick={handleClickOpen}  variant="contained" color="primary" >Actualizar</Button>
        <Button onClick={cerrar} variant="contained" color="primary" >Cerrar</Button>
        </Grid>
      </Grid>
    </DetallesCard>
    )
}

const DetallesCard=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
 ` 

export default VerMas;