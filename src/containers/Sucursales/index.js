import React from 'react';
import styled from 'styled-components';
import TableSucursales from '../../containers/Sucursales/tableSucursales';
import { Button, Dialog, DialogContent, useMediaQuery  } from '@material-ui/core';
import { useTheme } from "@material-ui/core/styles";
import SucursalForm from "../../components/SucursalesForm";


const Sucursalescontainer = () => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <ClienteContainer className="responsive">
            <div className="column">
                <TableSucursales/>
            </div>
            <div className="column">
            <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogContent>  
                        <SucursalForm setOpen={ setOpen } />
                    </DialogContent>
                </Dialog>
            </div>
            <Button variant="contained" color="primary" onClick={ handleClickOpen } >Agregar Sucursal</Button> 
        </ClienteContainer>

    )

}
//NO MOVER, solo dios sabe como funciona

/*PARA FUTUROS DESARROLLADORES

    Si piensas que puedes hacer un diseño mobile first
    sumale 1 al contador: 1
*/
const ClienteContainer = styled.div`


    display: flex;
    flex-direction: column;

        .column{
            justify-content: center;
            &:nth-child(1){
                flex: 1;
                
            }
             &:nth-child(2){
                flex: 2;
                background-color: #FAFAFA;
                justify-content: center;
            }
        }
        .asd{
            justify-content: center;
            align-items: center;
        }

        @media screen and (max-width: 750px){
            flex-direction: column;
        
        .column{
            margin-bottom: 24px;
            &:nth-child(1){
                width: 100%  
            }
            &:nth-child(2){
                background-color: ##A4A4A4;
                justify-content: center;
            }
        }

    }

`;
export default Sucursalescontainer;