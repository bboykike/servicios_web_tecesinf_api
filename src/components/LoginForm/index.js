import React, {useEffect} from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { TextField, Button,Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import {useCookies, Cookies} from 'react-cookie';
import Api from '../../Helpers/Api';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Backgroud from '../../image/SIV.png';
import Swal from 'sweetalert2';


const LoginForm = () => {
    //Luis
    const classes = useStyles();
    //Instanciamos el push a la siguiente pagina despues del logueo
    const history = useHistory();
    const [idUse, setIDuse] = React.useState(0)
    const [cookie, setCookie] = useCookies(["Token"]);
    const [cookies, setCookies] = useCookies(["ID"]);
    const go = () => history.push('/Servicios')

    //Usamos el post data para validar el logueo
    const postData = async (data) => {
        const response = await Api.post('Login', data)
        //Creamos token en el api y lo recuperamos para guardarlo en una cookie
        const IDusuario = response.data;
        setIDuse(IDusuario);

        
        
        const token = '1234567890';
        setCookie('Token', token, {path: '/'});
        setCookies('ID', IDusuario, {path: '/'});
        if(IDusuario===undefined)
        {
          // console.log('No hay usuario')
          Swal.fire(
              'ERROR',
              'EL usuario y/o la contraseña no son correctos',
              'error'
            )
        }else{  history.replace('/Clientes')}

        // console.log(IDusuario);
    }
    useEffect(() => {
        const getCookie = () => {
            const cookie = new Cookies();
            // console.log(cookie.get('ID'));
        }
        getCookie();

    }, [])
    //inicializamos los valores spara vaidar los tokens
    return (
        <LoginCard>
            <Grid container component="main" className={classes.root} >
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper} >
          <Avatar className={classes.avatar}>
              <AccountCircleIcon />          
          </Avatar>
          <Typography component="h1" variant="h5">
          Iniciar sesión
          </Typography>
                {/* formato para logueo */}
                
                <Formik
                    initialValues={{ UserName: '', Pass: '' }}
                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true);
                        postData(data);
                        // console.log("submit", data)
                        //make async call
                        setSubmitting(false);
                    }}
                >
                    {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
                        <form onSubmit={handleSubmit} autoComplete="off">       
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Usuario"
                                    inputProps={{
                                      maxLength: 15,
                                    }}
                                    autoFocus
                                    name="UserName"
                                    value={values.UserName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />                          
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    inputProps={{
                                      maxLength: 20,
                                    }}
                                    label="Contraseña"
                                    type="password"
                                    autoComplete="current-password"
                                    name="Pass"
                                    value={values.Pass}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />                        
                           
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={isSubmitting}
                            >
                            Iniciar sesión
                            </Button>
                        </form>
                    )}
                </Formik>
                </div>
                </Grid>
          </Grid>
        </LoginCard>
    )
}
const LoginCard = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
width:80vw;
height:80vh;
border-radius: 25px;
`;

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: `url(${Backgroud})`, 
      backgroundColor: //
      
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default LoginForm;

