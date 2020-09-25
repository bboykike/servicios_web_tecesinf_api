import React, {useEffect}from 'react'
import styled from 'styled-components';
import NativeSelect from '@material-ui/core/NativeSelect';
import Api from '../../Helpers/Api';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));

    const Bsucursal = ({setActiveStep, idG, setIdG}) =>{
      //inicializamos en 0 
      const classes = useStyles();

      const IDcliente=idG;


      const continuar = () => {
        {setActiveStep((prevActiveStep) => prevActiveStep + 1)}
      };

      const handleBack = () => {
        {setActiveStep((prevActiveStep) => prevActiveStep - 1)}
      };
      const handleChange = (event) => {
        console.log(`Seleccionaste ${event.target.value}`);
        const id = event.target.value;
        {setIdG(id)}
      }

    const [data,setData]=React.useState([])
    useEffect(() => {       
        const GetData = async () =>{
          const response =  await Api.get(`GetSucursales/${IDcliente}`)
          {setIdG(0)}
          const sucursals = response.data

          setData(sucursals)
          console.log(data)
        };
        GetData()
        }, [] ) ; 


    return (
        <BuscarCard>
            <form>
                 <div className="datos">
                    <div>
                         <h1>SUCURSALES</h1>
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <div>
                        <NativeSelect style={{width:"80%"}} onChange={handleChange}>
                        <option value="">Selecciona</option>
                        {data.map(sucursals=>(
                            <option key={sucursals.IDsucursal} 
                                value={sucursals.IDsucursal}>
                                {sucursals.Nombre}
                            </option>
                        ))}
                        </NativeSelect>
                    {/*  */}
                         </div>
                         
                    </div>
                    <br/>
                    <br/>
                    <Buttons>
                    <div className="btn">
                     <Button
                      onClick={handleBack}
                      className={classes.backButton}
                     >
                        Regresar
                    </Button>
                    <Button disabled={idG === 0} variant="contained" color="primary" onClick={continuar}>Continuar</Button>
                    </div>
                    </Buttons>
                 </div>
            </form>
        </BuscarCard>

    )
}

const BuscarCard = styled.div`
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
            padding: 0;
        }
        &:nth-child(3){
            padding: 0;
        }
}

`
;

const Buttons = styled.div`
    display: flex;
    flex-direction: horizontal;
    align-items: center;
    .btn{
        align-content: center;
        width: 100%;
        display: flex;
        align-items: center;
    }
`;

export default Bsucursal;