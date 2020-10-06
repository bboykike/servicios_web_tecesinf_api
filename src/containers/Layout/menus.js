import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import GroupIcon from '@material-ui/icons/Group';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import BuildIcon from '@material-ui/icons/Build';
import { useHistory } from 'react-router';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const NestedList = () => {
  const classes = useStyles();
  //Usas estados
  const [opens, setOpens] = React.useState(false);
  const [cli, setCli] = React.useState(false);
  const [pre, setPre] = React.useState(false);
  const [empleados, setEmpleados] = React.useState(false);
  const [usuarios, setUsuarios] = React.useState(false);
  const [activos, setActivos] = React.useState(false);
  const history = useHistory();

  //FullCalendar
  const ActivosClick = () => {
    history.push('/Activos')
  }

  //Servicios
  const ServiciosClick = () => {
    history.push('/Servicios')
  }
  const UsuariosClick = () => {
    history.push('/Usuarios')
  }

  const SeguimientoClick = () => {
    history.push('/ServicioSE')
  }
  //Clientes
  const ListaClientes = () => {
    history.push('/Clientes')
  }

  //Empleados
  const ListaEmpleados = () => {
    history.push('/Usuarios')
  }
  //Seguimiento
  const Seg = () => {
    history.push('/Seguimiento')
  }
  const SegSE = () => {
    history.push('/SeguimientoSE')
  }

  const closeSesion = () => {
    history.push('/')
  }

  //
  const handleClick = () => {
    setOpens(!opens);
  };

  const CalendarPageClick = () => {
    setActivos(!activos)
  };

  const ClientesClick = () => {
    setCli(!cli);
  };

  const PresupuestoClick = () => {
    setPre(!pre);
  };
  const EmpleadosClick = () => {
    setEmpleados(!empleados);
  };

  const UserClick = () => {
    setUsuarios(!usuarios)
  }



  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Principal
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button >
        <ListItemIcon>
          <LockIcon />
        </ListItemIcon>
        <ListItemText onClick={ActivosClick} primary="ACTIVOS" />
      </ListItem>
      {/* <!--Servicios--> */}
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary="NUEVO SERVICIO" />
        {opens ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={opens} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText onClick={ServiciosClick} primary="CON EQUIPO" />
          </ListItem>
        </List>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText onClick={SeguimientoClick} primary="SIN EQUIPO" />
          </ListItem>
        </List>
      </Collapse>
      {/* <!--Clientes--> */}
      <ListItem button onClick={ClientesClick}>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="CLIENTES" />
        {cli ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={cli} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText onClick={ListaClientes} primary="LISTA" />
          </ListItem>
        </List>
      </Collapse>
      {/*Presupuestos*/}
      <ListItem button onClick={PresupuestoClick}>
        <ListItemIcon>
          <MonetizationOnIcon />
        </ListItemIcon>
        <ListItemText primary="SEGUIMIENTO DE SERVICIOS" />
        {pre ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={pre} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText onClick={Seg} primary="CON EQUIPO" />
          </ListItem>
        </List>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText onClick={SegSE} primary="SIN EQUIPO" />
          </ListItem>
        </List>
      </Collapse>
      {/* Empleados */}
      <ListItem button onClick={EmpleadosClick}>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText onClick={UserClick} primary="CUENTAS" />
        {cli ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={empleados} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText onClick={UsuariosClick} primary="AGREGAR" />
          </ListItem>
        </List>
        {/* <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary="Nuevo" />
          </ListItem>
        </List> */}
      </Collapse>
      <ListItem button >
        <ListItemIcon>
          <LockIcon />
        </ListItemIcon>
        <ListItemText onClick={closeSesion} primary="CERRAR SESIÓN" />
      </ListItem>
    </List>
  );
}

export default NestedList