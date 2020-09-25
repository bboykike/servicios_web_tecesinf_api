import React from 'react';
import './App.css';
import Clientes from './Pages/clientes';
import Layout from './containers/Layout';
import {Route, Switch, Redirect} from 'react-router-dom';
import Login from './Pages/login';
import Equipos from './Pages/equipos';
import Accesorios from './Pages/accesorios';
import Menu from './Pages/menu';
import Users from './Pages/users';
import Sucursales from './Pages/sucursales';
import Seguimiento from './Pages/seguimiento';
import Detalles from './Pages/detalles';
import Image from './Pages/image';
import Blog from './components/HomeForm';
import SeleccionM from './Pages/SeleccionM';
import SeguimientoSEs from './Pages/seguimientoSE';
import {useCookies, Cookies} from 'react-cookie';
import CalendarPage from "./Pages/fullcalendarPage";


const App = () => {  
  const [auth, setAuth] = React.useState(false)

  return (
    <div className="App">
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/home" component={Blog} />
        <Layout>
        <Route  path="/Activos" component={CalendarPage} />

        <Route  path="/Clientes" component={Clientes} />
        <Route  setAuth={setAuth} path="/Servicios" component={Menu} /> 


        {/* <Route  path="/Clientes" component={Clientes} />  */}
        <Route  path="/Equipos/:IDsucursal" component={Equipos}/>
        <Route exact path="/Accesorios/:IDequipo" component={Accesorios}/> 
        {/* <Route  exact path="/Servicios" component={Menu}/>   */}
        <Route  path="/Usuarios" component={Users}/>
        <Route exact path="/Sucursales/:IDcliente" component={Sucursales}/>
        <Route  path="/Seguimiento" component={Seguimiento}/>
        <Route exact path="/Detalles/:IDservicio" component={Detalles}/>       
        <Route exact path="/Ver/:IDservicio" component={Image}/>   
        <Route exact path="/ServicioSE" component={SeleccionM}/> 
        <Route exact path="/SeguimientoSE" component={SeguimientoSEs}/> 
        </Layout>
      </Switch>
    </div>
  );
}
const NotFound = () =>{
  return(
    <div>
      <h1>404</h1>
    </div>
  )
}
const PrivateRoute = ({auth, component: Component, ...rest})=>{
  return(
    <Route
    {...rest}
    render={
      props=>auth ?
      (<Component {...props}/>)
      : (<Redirect to ={{pathname: "/"}}/>)
    }
    />
  )
}


export default App;
