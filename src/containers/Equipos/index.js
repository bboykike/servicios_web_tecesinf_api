import React from 'react';
import EquiposForm from '../../components/EquiposForm';
import styled from 'styled-components';
import TableEquipos from '../../containers/Equipos/tableEquipos';
import { TextField, Button, NativeSelect, Dialog, DialogContent, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";


const EquiposContainer = () => {
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
        <EquipoContainer className="responsive">
            <div className="column">
                <TableEquipos/>
            </div> 
            <div className="column">
            <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogContent>  
                        <EquiposForm setOpen={ setOpen } />
                    </DialogContent>
                </Dialog>
            </div>
            <Button variant="contained" color="primary" onClick={ handleClickOpen } >Agregar Equipo</Button>
        </EquipoContainer>

    )
}
//NO MOVER, solo dios sabe como funciona

/*PARA FUTUROS DESARROLLADORES

    Si piensas que puedes hacer un diseño mobile first
    sumale 1 al contador: 1
*/
const EquipoContainer = styled.div`
    display: flex;
    flex-direction: column;

        .column{
            &:nth-child(1){
                flex: 1;
            }
             &:nth-child(2){
                flex: 2;
                background-color: #FAFAFA;
                justify-content: center;
            }
        }

    @media screen and (max-width: 800px){
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

export default EquiposContainer