import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NuevoServicio from '../../components/ServiciosForm'
import Bcliente from '../../components/ServiciosForm/buscarCliente'
import Bsucursal from '../../components/ServiciosForm/buscarSucursal'
import Bequipo from '../../components/ServiciosForm/buscarEquipo'
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexDirection: 'column',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
 
function getSteps() {
  return ['CLIENTE', 'SUCURSAL', 'EQUIPO', 'NUEVO SERVICIO'];
}



const MenuForm = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [idG, setIdG] = React.useState([])
  const [client, setClient]= React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  }; 

  const getStepContent = (stepIndex) =>{
    switch (stepIndex) {
      case 0:
        return <Bcliente
        setActiveStep={setActiveStep}
        setIdG={setIdG}
        setClient={setClient}
        />;
      case 1:
        return <Bsucursal
        setActiveStep={setActiveStep}
        setIdG={setIdG}
        idG={idG}
        />
      case 2:
        return <Bequipo
        setActiveStep={setActiveStep}
        setIdG={setIdG}
        idG={idG}
        />     
      case 3:
        return (<NuevoServicio
          idG={idG}
          client={client}
          setActiveStep={setActiveStep}
        />);
      default:
        return 'Opcion no encontrada';
    }
  }
  return (
    <ServiciosCard>
     <Grid className={classes.root} container spacing={3}>
     <Grid item xs={12}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </Grid>
      <Grid item xs={12}>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>{getStepContent(activeStep)}</div>
            <div>
             
            </div>
          </div>
        )}
      </div>
      </Grid>
      </Grid>
    </ServiciosCard>
  );
}
const ServiciosCard=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
 ` 

export default  MenuForm;

