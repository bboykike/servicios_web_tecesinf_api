import React, {useEffect}from 'react';
import AccesorioForm from '../../components/AccesoriosForm';
import styled from 'styled-components';
import TableAccesorio from '../../containers/Accesorios/tableAccesorios'
import { Button,  Dialog, DialogContent, useMediaQuery } from "@material-ui/core";
import { useHistory } from 'react-router';
import {useCookies, Cookies} from 'react-cookie';
import { useTheme } from "@material-ui/core/styles";

const AccesoriosContainer = () => {
    // const history = useHistory();
    // useEffect(() => {
    //     const getCookie = () => {
  
    //         const cookie = new Cookies();
    //         const IDu = cookie.get('ID');
    //         if(IDu===undefined){
    //             console.log(IDu,'tienes')
    //             history.push('/')
    //         }
    //     }
    //     getCookie();
    // }, [])
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
        <AccesorioContainer className="responsive">
            <div className="column">
            <TableAccesorio/>
            </div>
            <br/>
            <div className="column">
            <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogContent>  
                        <AccesorioForm setOpen={ setOpen } />
                    </DialogContent>
                </Dialog>
            </div>
            <Button variant="contained" color="primary" onClick={ handleClickOpen } >Agregar Accesorio</Button>
        </AccesorioContainer>

    )
}

const AccesorioContainer = styled.div`


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

        @media screen and (max-width: 750px){
            flex-direction: column;
        }
    }

`;
export default AccesoriosContainer;