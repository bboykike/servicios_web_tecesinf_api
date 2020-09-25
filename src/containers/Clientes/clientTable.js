import React, {useEffect} from 'react';
import Api from '../../Helpers/Api';
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination'; 
import { Button} from '@material-ui/core';
import { useHistory } from 'react-router';

const TableClients = () =>{

    //Inicializamos el state de la tabla
    //Paginacion, Tablas que muestra e informacion
    const [page, setPage] = React.useState(0);  
    const [data, setData] = React.useState([]);   
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    //Instanciamos la ruta
    const history = useHistory();
    //Iniciamos el push que va a recibir el ID del usuario
    function handleClick(rute) {
      history.push(`/Sucursales/${rute}`);
    }
  
    //utilizamos el use effect para definir que solo se recargue la primera vez
    //Con el uso de un async awaits
      useEffect(() => {       
      const GetData = async () =>{
        const response =  await Api.get('ListaClientes')
        const clients = response.data.clients;
        setData(clients)
      };
      GetData()
        console.log('seguardo',data);  
      }, [] ) ; 

        //SetEvents
        const handleChangePage = (event, newPage) => {  
          setPage(newPage);  
        };  
        
        const handleChangeRowsPerPage = event => {  
          setRowsPerPage(+event.target.value);  
          setPage(0);  
        }; 
        //Prop para comunicarnos con otro componente donde se pasa la informacion

    return(    
      <Paper >  
      <TableContainer >  
        <Table stickyHeader aria-label="sticky table">  
        <TableHead>  
            <TableRow>  
              <TableCell align="left">ID</TableCell>  
              <TableCell align="left">RFC</TableCell>  
              <TableCell align="left">Cliente</TableCell>  
              <TableCell align="left">Telefono</TableCell>  
              <TableCell align="center">Acciones</TableCell>  
            </TableRow>  
          </TableHead>  
          <TableBody>  
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
              return (  
          <TableRow key={row.IDcliente} >  
                <TableCell align="left" component="th" scope="row">  
                  {row.IDcliente}  
                </TableCell>  
                <TableCell align="left">{row.RFC}</TableCell>  
                <TableCell align="left">{row.Cliente}</TableCell>  
                <TableCell align="left">{row.Telefono}</TableCell>  
                <TableCell align="center">                
                  <Button  onClick={e=>handleClick(row.IDcliente)}>Sucursales</Button>                
                </TableCell>
          </TableRow>  
          
              );  
            })}  
          </TableBody>  
        </Table>  
      </TableContainer>  
      <TablePagination  
        rowsPerPageOptions={[5, 10, 15]}  
        component="div"  
        count={data.length}  
        rowsPerPage={rowsPerPage}  
        page={page}  
        onChangePage={handleChangePage}  
        onChangeRowsPerPage={handleChangeRowsPerPage}  
      />  
    </Paper>  
  )
}

export default TableClients