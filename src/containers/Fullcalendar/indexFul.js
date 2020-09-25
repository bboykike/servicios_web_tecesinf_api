import React from 'react';
import styled from 'styled-components';
// import FullCalendar from '../../components/FullCalendar';
import FullCalendario from '../../components/FullCalendar/fullcalendar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


const Fulltyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));




const FullContainer = () => {
    const classes = Fulltyles();

    return (
        <FullContainerr className="responsive">
            <div className="column">
                <FullCalendario />
            </div>

        </FullContainerr>

    )
}
//NO MOVER, solo dios sabe como funciona

/*PARA FUTUROS DESARROLLADORES

    Si piensas que puedes hacer un diseño mobile first
    sumale 1 al contador: 1
*/
const FullContainerr = styled.div`
    display: flex;
    flex-direction: horizontal;

        .column{
            &:nth-child(1){
                flex: 1;
            }
             &:nth-child(2){
                flex: 2;
                background-color: #A4A4A4;
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
                background-color: #A4A4A4;
                justify-content: center;
            }
        }
    }
`;




export default FullContainer;


