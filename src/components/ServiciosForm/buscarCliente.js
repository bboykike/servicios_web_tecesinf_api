import React, {useEffect}from 'react'
import styled from 'styled-components';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination'; 
import Api from '../../Helpers/Api';
import {Button, TextField, Dialog, DialogContent, useMediaQuery } from '@material-ui/core';
import ClientesForm from "../../components/ClientesForm";
import { useHistory } from 'react-router';
import { useTheme } from "@material-ui/core/styles";

const Bcliente = ({setAuth, setActiveStep, setIdG, setClient}) =>{ 
  const history = useHistory();

  const [page, setPage] = React.useState(0);   
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data,setData]=React.useState([])
  //MODAL
      const [open, setOpen] = React.useState(false);
      const theme = useTheme();
      const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

      const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    //BUSCADOR
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [filteredData, setFilteredData] = React.useState([]);

    useEffect(() => {
      setFilteredData(
        data.filter(data =>
          data.Cliente.toLowerCase().includes(search.toLowerCase()) )
      );
    }, [search, data]);

  const handleChangePage = (event, newPage) => {  
    setPage(newPage);  
  };  
  
  const handleChangeRowsPerPage = event => {  
    setRowsPerPage(+event.target.value);  
    setPage(0);  
  }; 
      //------------

      const handleClick = (event) => {
        const id = event  ;
        console.log(id)
        {setIdG(id.IDcliente)}
        {setClient(id)}
        {setActiveStep((prevActiveStep) => prevActiveStep + 1)}
        };

      const NuevoCliente = () =>{       
        history.push('/Clientes')
      }

    useEffect(() => {       
        const GetData = async () =>{
          setLoading(true);
          const response =  await Api.get('ListaClientes')
          setLoading(false);
          const clients = response.data.clients;
          setData(clients)
          console.log(data)
                //Iniciamos en 0
          {setActiveStep(0)}
          
        };
        GetData()
        }, [] ) ; 

        if (loading) {
          return <p>Cargando...</p>;
        }

    return (
        <BuscarCard>
            <form>
                 <div className="datos">
                    <div>
                         <h1>LISTA CLIENTES</h1>
                     </div>
                         <br/>
                         <br/>
                         <div>
                        <TextField
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search />
                            </InputAdornment>
                          ),
                        }}
                        type="text"
                        placeholder="Buscar por nombre"
                        onChange={e => setSearch(e.target.value)}
                      />
                      </div>
                   </div>     
                        <TableCard>
                          <div>
                        <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                        >
                            <DialogContent>  
                                <ClientesForm setOpen={ setOpen } />
                            </DialogContent>
                        </Dialog>
                        </div>
                    <Paper align="center" >  
                          <TableContainer >  
                            <Table stickyHeader aria-label="sticky table">  
                            <TableHead>  
                                <TableRow>  
                                  <TableCell align="center">RFC</TableCell>  
                                  <TableCell align="center">Cliente</TableCell>  
                                  <TableCell align="center">Telefono</TableCell>  
                                </TableRow>  
                              </TableHead>  
                              <TableBody>  
                                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
                                  return (  
                              <TableRow key={row.IDcliente} onClick={e=>handleClick(row)} >   
                                    <TableCell align="center">{row.RFC}</TableCell>  
                                    <TableCell align="center">{row.Cliente}</TableCell>  
                                    <TableCell align="center">{row.Telefono}</TableCell>  
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
                        <br/>
                        <Button variant="contained" color="primary" onClick={handleClickOpen}>Agregar Nuevo Cliente</Button>
                    </TableCard>
            </form>
        </BuscarCard>

    )
}

const BuscarCard = styled.div`
flex-direction: column;
justify-content: center;
.datos{
    div{            
        padding: 0;
        &:nth-child(1){
            display: flex;
            justify-content: center;
            padding: 0;
        }   
}
`;
const TableCard = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
}
`;


export default Bcliente;