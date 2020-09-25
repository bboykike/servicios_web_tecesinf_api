import React, {useEffect} from 'react'
import styled from 'styled-components';
import { TextField, Button, CardActions } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../../firebase'
import Api from '../../Helpers/Api'
import {useParams} from 'react-router-dom';
import {Formik} from 'formik';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Swal from 'sweetalert2';

const useStyles = makeStyles({
    root: {
      maxWidth: 355,
    },
    media: {
      height: 140,
    },
  });
const ImageForm = ({servicios, setEvidenciaOpen}) =>{
    //Variables
    const Ser ={servicios}
    const id =Ser.servicios.IDservicio
    const [dir, setDir]= React.useState('https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/1179806/1160/772/m1/fpnw/wm0/photo-camera-icon-01-.jpg?1460642657&s=f0e1493bc7609b0dbac1aaf309fb2f03')  
    const [come, setCome]=React.useState('')
    const classes = useStyles();
    //Api conexiones
    const PostData = async () =>{
        const data={
            Foto:dir,
            Comentario:come,
            IDservicio:id    
        }
      const response = await Api.post('/Imagenes', data)
      if(response.data!=null){
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'La imagen se guardo éxitosamente',
            showConfirmButton: false,
            timer: 1500
            }).then(function (){
                window.location = "/Seguimiento";
            });
      }
    }
    const handleClose = () => {
        {setEvidenciaOpen(false)}
    }
    //Comprimimos el archivo usando esta funcion
        //Obtener valores de los forms
    const Changed =(e)=> {
    //Comprimimos el archivo usando esta funcion
        //Obtener valores de los forms
            //Recuperamos la imagen
            if(e===null)
            {
                Swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'Ha ocurrido un error, por favor intente nuevamente',
                showConfirmButton: false,
                timer: 1500
                }).then(function (){
                    window.location = "/Seguimiento";
                });
            }else{
           let input = e.target;
            let reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            reader.onload = function(){
                let dataURL = reader.result;
                setDir(dataURL)
            }}
        
    }
    const handleText=(e)=>{
        setCome(e.target.value)
    }
    const handleSave = () =>{
        PostData();
        
    }
    return (
        <ImagenCard>
        <Typography align="center" variant="h6" gutterBottom>
        AGREGAR EVIDENCIA
      </Typography>
      <Grid align="center" container spacing={3}>
      <Grid item xs={12}>
             <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={`${dir}`}
                    />
                </CardActionArea>
             </Card>
     </Grid>
             <br/>
             <Grid item xs={12}>
                 <TextField
                 type="file"
                 id="newIM"
                 name="Foto"
                 placeholder="Subir imagen"
                 onChange={(e)=>{Changed(e)}}
                 />
                 </Grid>
                 <br/>
                 <Grid item xs={12}>
                 <TextField
                 required
                 label="Comentario"
                 required
                 name="Comentario"
                 onChange={handleText}
                 style={{width:"50%"}}
                 />
                 </Grid>
            <br/>
            <Grid item xs={12}>
                 <Button type="submit" onClick={handleSave} variant="contained"  color="primary">Guardar</Button>            
                 <Button type="submit" onClick={handleClose} variant="contained"  color="primary">Cerrar</Button> 
                 </Grid>
             </Grid>
        </ImagenCard>
    )
}

const ImagenCard=styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`;

export default ImageForm