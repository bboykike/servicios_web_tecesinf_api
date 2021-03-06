import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination'; 
import {Button} from '@material-ui/core';
import { useHistory } from 'react-router';
import {useParams} from 'react-router-dom';
import Api from '../../Helpers/Api';

const TableEquipos = ({idG, setIdG, setActiveStep}) =>{
  const id=idG;
  //Inicializamos el state de la tabla
  //Paginacion, Tablas que muestra e informacion
  const [page, setPage] = React.useState(0);  
  const [equipos, setEquipos] = React.useState([]);   
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const continuar = () => {
    {setActiveStep((prevActiveStep) => prevActiveStep + 1)}
  };

  const handleBack = () => {
    {setActiveStep((prevActiveStep) => prevActiveStep - 1)}
  };
  //Instanciamos la ruta
  const history = useHistory();
  //Iniciamos el push que va a recibir el ID del usuario
  function handleClick(rute) {
    {setIdG(rute)}
    continuar();
  }

  //utilizamos el use effect para definir que solo se recargue la primera vez
  //Con el uso de un async await

    useEffect(() => {   
      const GetData = async () =>{
          const response =  await Api.get(`GetEquipos/${id}`)
          setEquipos(response.data);
          console.log(equipos)
        };    
          GetData()
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
    <Paper  >  
    <TableContainer >  
      <Table stickyHeader aria-label="sticky table">  
      <TableHead>  
          <TableRow>  
            <TableCell>ID</TableCell>  
            <TableCell align="right">Equipo</TableCell>  
            <TableCell align="right">Marca</TableCell>  
            <TableCell align="center">NoSerie</TableCell>
          </TableRow>  
        </TableHead>  
        <TableBody>  
          {equipos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {  
            return (  
        <TableRow key={index} onClick={e=>handleClick(row.IDequipo)}>  
              <TableCell component="th" scope="row">  
                {row.IDequipo}  
              </TableCell>  
              <TableCell align="right">{row.TipoEquipo}</TableCell>  
              <TableCell align="right">{row.Marca}</TableCell>  
              <TableCell align="right">{row.NoSerie}</TableCell> 
        </TableRow>  
        
            );  
          })}  
        </TableBody>  
      </Table>  
    </TableContainer>  
    <TablePagination  
      rowsPerPageOptions={[5, 10, 15]}  
      component="div"  
      count={equipos.length}  
      rowsPerPage={rowsPerPage}  
      page={page}  
      onChangePage={handleChangePage}  
      onChangeRowsPerPage={handleChangeRowsPerPage}  
    />  
  </Paper>  
)
}

export default TableEquipos
