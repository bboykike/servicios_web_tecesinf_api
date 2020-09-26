import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination'; 
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useHistory } from 'react-router';
import Api from '../../Helpers/Api';
import { Cookies} from 'react-cookie'
import { Dialog, DialogContent, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import  VerMas from '../DetallesSEForm'
import  TableInforme from '../InformeSEForm'
import TableHistorial from '../HistorialSEForm'
import ImagenForm from '../UpImageSE'
import Swal from 'sweetalert2';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});



const TablePrueba =()=>{
       const cookie = new Cookies(); 
       const history = useHistory();
       const [cookiee, setCoo] = React.useState(['ID'])
        //Listado que trae el API
        const [listado, setListado] = React.useState([])
        // console.log(listado)
        //Inicializamos el state de la tabla
        //Paginacion, Tablas que muestra e informacion
        const [page, setPage] = React.useState(0);  
        const [equipos, setEquipos] = React.useState([]);   
        const [rowsPerPage, setRowsPerPage] = React.useState(5);
        //SetEvents
        const handleChangePage = (event, newPage) => {  
          setPage(newPage);  
        };  
        
        const handleChangeRowsPerPage = event => {  
          setRowsPerPage(+event.target.value);  
          setPage(0);  
        }; 

          //Peticiones
              const getCookie = () => {           
                console.log(cookie.get('ID'));  
                const IDu = cookie.get('ID');
                // console.log('Recuperaste', IDu)
                setCoo({ID:IDu})
            }   

        useEffect(() => {  
            const GetData = async () =>{
                const response =  await Api.get(`ServicioListSE/${ID}`)
                setListado(response.data);

            };   
                getCookie()
                const ID= cookie.cookies.ID
                GetData()

        }, [] ) ; 
        // funcion para las tablas
        const theme = useTheme();
        const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
        const classes = useRowStyles();
        //MODALES
        const [infOpen, setInfOpen]= React.useState(false);
        const [evidenciaOpen, setEvidenciaOpen]= React.useState(false)
        const [historialOpen, setHistorialOpen]= React.useState(false)
        const [modalOpen, setModalOpen] = React.useState(false);
        const [servicios, setServicios]=React.useState([])
        const setTrue = ()=>{setModalOpen(true)}
        const setEvidencia = ()=>{setEvidenciaOpen(true)}
        const setHistorial = ()=>{setHistorialOpen(true)}
        const setInfo = ()=>{setInfOpen(true)}

        const mOpen = (row) => {
          setServicios(row)
          setTrue()
        };
        const openInfo=(row)=>{
          setServicios(row)
          setInfo()
        }
        const openEvidencia=(row)=>{
          setServicios(row)
          setEvidencia()
        }
        const openHistorial=(row)=>{
          setServicios(row)
          setHistorial()
        }
        const infoClose=()=>{
          setInfOpen(false)
        }
        const modalClose = () => {
          setModalOpen(false);
        };
        const eviClose = () => {
          setEvidenciaOpen(false);
        };
        const hisClose = () => {
          setHistorialOpen(false);
        };
        //

  
    return(
      <div>
      <Paper>
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Cliente</TableCell>
              <TableCell align="center">Tipo</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {listado.map((row) => (
              <Row key={row.IDServiceSE} row={row} /> 
               
            ))}
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
   {/* {show ? <Modal/> : null} */}
   </div>
    )

    function Row(props) {
      const { row } = props;     
      const [open, setOpen] = React.useState(false);
      const closeView=()=>{
        setOpen(!open)
      }
      return (
        <>
          <TableRow  className={classes.root}>
            <TableCell component="th" scope="row">
              {row.IDServiceSE}
            </TableCell>
            <TableCell align="center">{row.Cliente}</TableCell>
            <TableCell align="center">{row.Tipo}</TableCell>
            <TableCell align="center">{row.Status}</TableCell>
            <TableCell >
              <IconButton aria-label="expand row" size="small" onClick={(closeView)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Typography variant="h6" gutterBottom component="div">
                    Opciones
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" onClick={e=>mOpen(row)}>Detalles</TableCell>
                        <TableCell align="center" onClick={e=>openInfo(row)} >Inf Tecnico</TableCell>
                        <TableCell align="center" onClick={e=>openEvidencia(row)}>Evidencias</TableCell>
                        <TableCell align="center" onClick={e=>openHistorial(row)}>Historial</TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
          {/* Detalles */}
          <Dialog
                    fullScreen={fullScreen}
                    open={modalOpen}
                    onClose={modalClose}
                    aria-labelledby="responsive-dialog-title"
          >
                    <DialogContent>  
                    <VerMas servicios={servicios} setModalOpen={ setModalOpen } />
                    </DialogContent>
          </Dialog>
          {/* Informes tecnicos */}
          <Dialog
                    fullScreen={fullScreen}
                    open={infOpen}
                    onClose={infoClose}
                    aria-labelledby="responsive-dialog-title"
          >
                    <DialogContent>  
                    <TableInforme servicios={servicios} setInfOpen={ setInfOpen } />
                    </DialogContent>
          </Dialog>
          {/* Evidencias */}
          <Dialog
                    fullScreen={fullScreen}
                    open={evidenciaOpen}
                    onClose={eviClose}
                    aria-labelledby="responsive-dialog-title"
          >
                    <DialogContent>  
                    <ImagenForm servicios={servicios} setEvidenciaOpen={ setEvidenciaOpen } />
                    </DialogContent>
          </Dialog>
          {/* Historial */}
          <Dialog
                    fullScreen={fullScreen}
                    open={historialOpen}
                    onClose={hisClose}
                    aria-labelledby="responsive-dialog-title"
          >
                    <DialogContent>  
                    <TableHistorial servicios={servicios} setHistorialOpen={ setHistorialOpen } />
                    </DialogContent>
          </Dialog>
        </> 
      );
    }
}

export default TablePrueba
