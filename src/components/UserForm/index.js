import React,{useEffect} from 'react';
import styled from 'styled-components';
import { TextField, Button, Select, MenuItem,NativeSelect  } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Formik } from 'formik';
import Api from '../../Helpers/Api';
import Swal from 'sweetalert2';


const UserForm = () => {
    const [roles, setRoles] = React.useState([])
    const postData= async(data)=>{
        console.log('Envias', data)
        const response = await Api.post('/RegistroUsuario', data)
        console.log(response)
    }
    useEffect(() => {       
        const GetData = async () =>{
          const response =  await Api.get(`/Roles`)
          const rol = response.data
          setRoles(rol)
          console.log(rol)
        };
        GetData()
        }, [] ) ; 
    return (
        <UserCard>
          <Formik
            initialValues={{usuarios:{ UserName: '', Pass: '',IDdetalle:'', IDrol:'' }, 
            detalles:{Nombre:'', Apellido:'', Direccion:'', Area:'',Foto:''},
            status:{status:'Activo',IDdetalle:'',}}}
            onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            postData(data);
            console.log("submit", data)
                        //make async call
            setSubmitting(false);
                Swal.fire({
                  position: 'top-center',
                  icon: 'success',
                  title: 'El usuario se agrego éxitosamente',
                  showConfirmButton: false,
                  timer: 1500
                }).then(function(){
                    window.location = "/Usuarios";
                });
              }}
            >
              {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit}>       
            <Typography align="center" variant="h6" gutterBottom>
          NUEVA CUENTA
        </Typography>
        {/* {services.map(detalle=>( */}
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            label="Usuario"
            name="usuarios.UserName"
            value={values.UserName}
            onChange={handleChange}
            onBlur={handleBlur}  
            inputProps={{
                maxLength: 15,
              }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="usuarios.Pass"
            value={values.Pass}
            onChange={handleChange}
            onBlur={handleBlur}  
            label="Contraseña"
            type="password"
            inputProps={{
                maxLength: 20,
              }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            multiline
            name="detalles.Nombre"
            value={values.Nombre}
            onChange={handleChange}
            onBlur={handleBlur}  
            label="Nombre"           
            fullWidth
          />
        </Grid>
        <Grid item xs={12}  sm={6}>
          <TextField
            name="detalles.Apellido"
            value={values.Apellido}
            onChange={handleChange}
            onBlur={handleBlur} 
            label="Apellido"         
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="detalles.Direccion"
            value={values.Direccion}
            onChange={handleChange}
            onBlur={handleBlur} 
            label="Dirección"          
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            multiline
            name="detalles.Area"
            value={values.Area}
            onChange={handleChange}
            onBlur={handleBlur}  
            label="Area"           
            fullWidth
          />
        </Grid> 
        <Grid item xs={12}>
        <NativeSelect style={{width:"80%"}} 
                    name="usuarios.IDrol"
                    value={values.IDrol}
                    onChange={handleChange}
                    onBlur={handleBlur} 
        >
                        <option value="">Selecciona un rol</option>
                        {roles.map(rol=>(
                            <option key={rol.IDrol} 
                                value={rol.IDrol}>
                                {rol.Nombre}
                            </option>
                        ))}
         </NativeSelect>
        </Grid>
        <Grid align="center" item xs={12}>
        <Button align="center"  type="submit"  variant="contained" color="primary" >Registrar</Button>
        </Grid>
      </Grid>
            </form>
             )}
           </Formik>
        </UserCard>
    )
}

const UserCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    .datos{
        div{
            margin: 5px;
            height: 50px;
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
export default UserForm
