import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { TextField, Button, NativeSelect  } from '@material-ui/core';
import { useHistory } from 'react-router';
import {Formik} from 'formik';
import Api from '../../Helpers/Api';
import {useCookies, Cookies} from 'react-cookie';
import Swal from 'sweetalert2';


const ClientesForm = ( {setOpen} ) =>{

    const [date, setDate]=React.useState("")
    const history = useHistory();
    const postData = (data) => {
        data.FechaReg=date
        Api.post('RegistroCliente', data)
        .then( rep => {setOpen( false )
        history.push('/Clientes')
        })
    }
    const getDate =()=> {
        var today = new Date();   
        const fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);   
        setDate(fecha)
    } 

    useEffect(() => {  
        getDate()
    }, [] ) ;

    const categorias = [
        {
            "nombre" : "Yucatán",
            "articulos" : ["Abalá","Acanceh","Akil","Baca","Bokobá","Buctzotz", "Cacalchén","Calotmul","Cansahcab","Cantamayec","Celestún","Cenotillo",
            "Chacsinkín","Chankom","Chapab","Chemax","Chichimilá","Chicxulub Pueblo","Chikindzonot","Chocholá","Chumayel","Conkal","Cuncunul","Cuzamá",
            "Dzán","Dzemul","Dzidzantún","Dzilam de Bravo","Dzilam González","Dzitás","Dzoncauich","Espita",
            "Halachó","Hocabá","Hoctún","Homún","Huhí","Hunucmá","Ixil","Izamal","Kanasín","Kantunil","Kaua","Kinchil","Kopomá",
            ,"Mama","Maní","Maxcanú","Mayapán","Mérida","Mocochá","Motul","Muna","Muxupip","Opichén","Oxkutzcab","Panabá","Peto","Progreso",
            "Quintana Roo","Río Lagartos","Sacalum","Samahil","San Felipe","Sanahcat","Santa Elena","Seyé","Sinanché","Sotuta","Sucilá","Sudzal","Suma",
            "Tahdziú","Tahmek","Teabo","Tecoh","Tekal de Venegas","Tekantó","Tekax","Tekit","Tekom","Telchac Pueblo","Telchac Puerto","Temax","Temozón","Tepakán",
            "Tetiz","Teya","Ticul","Timucuy","Tinum","Tixcacalcupul","Tixkokob","Tixmehuac","Tixpéhual","Tizimín","Tunkás","Tzucacab",
            "Uayma","Ucú","Umán","Valladolid","Xocchel","Yaxcabá","Yaxkukul","Yobaín"]
        },
        {
            "nombre" : "Campeche",
            "articulos" : ["Calkiní", " Campeche(San Francisco de Campeche)", "Carmen(Cuidad del Carmen)", "Champotón","Hecelchakán","Hopelchén","Palizada",
            "Tenabo","Escárcega","Calackmul","Candelaria","Seybaplaya"]
        },
        {
            "nombre" : "Quintana Roo",
            "articulos" : ["Cancún","Chetumal","Playa del Carmen","Cozumel","Felipe Carrillo Puerto","Tulum","Alfredo V. Bonfil","Isla Mujeres",
            "José María Morelos","Bacalar","Puerto Morelos","Kantunilkín","Leona Vicario","Puerto Aventuras","Calderitas","Tihosuco","Chunhuhub",
            "Nicolás Bravo","Señor","Javier Rojo Gómez","Dziuché","Álvaro Obregón","Tepich","Limones"]
        }
    ]

    const [idArticulos, setIdArticulos] = useState(-1);

    const handlerCargarArticulos = function(e){
        const opcion = e.target.value;
        console.log(opcion);

        setIdArticulos(opcion);
    }

    return(
        <ClientsCard>
            <div>
            <Formik
                initialValues={{stClient:{Status:'Activo'},client:{RFC:'', Cliente:'', Contacto:'', Telefono:'', Celular:'',
                Estado:'', Ciudad:'', Direccion:'', Cp:'', Observaciones:'', Email:'', FechaReg:date},sucursals:{Nombre:'',Direccion:''}}}
                onSubmit={(data, { setSubmitting})=>{
                setSubmitting(true);
                postData(data);
                console.log(JSON.stringify(data))
                //make async call
                setSubmitting(false);  
               Swal.fire({
                  position: 'top-center',
                  icon: 'success',
                  title: 'El cliente se guardo éxitosamente',
                  showConfirmButton: false,
                  timer: 1500
                }).then(function() {
                        window.location = "/Clientes";
                    });           
             }}>
                {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
             <form onSubmit={ handleSubmit } autoComplete="off">
             <div className="datos">
                    <div>
                        <p>NUEVO CLIENTE</p>
                    </div>
                        <div>
                            <TextField 
                            name="client.RFC"
                            inputProps={{
                                maxLength: 30,
                              }}
                            value={values.RFC}
                            onChange={handleChange}
                            onBlur={handleBlur}                       
                            label="RFC" />
                        </div>
                        <div>
                            <TextField 
                            name="client.Cliente"
                            inputProps={{
                                maxLength: 80,
                              }}
                            value={values.Cliente}
                            onChange={handleChange}
                            onBlur={handleBlur}                           
                            label="Cliente" />
                        </div>
                        <div>
                            <TextField
                            name="client.Contacto"
                            inputProps={{
                                maxLength: 50,
                              }}
                            value={values.Contacto}
                            onChange={handleChange}
                            onBlur={handleBlur}                           
                            label="Contacto" />
                        </div>
                        <div>
                            <TextField 
                            name="client.Email"
                            inputProps={{
                                maxLength: 50,
                              }}
                            value={values.Email}
                            onChange={handleChange}
                            onBlur={handleBlur}                          
                            label="Email" />
                        </div>
                        <div>
                            <TextField 
                            name="client.Direccion"
                            inputProps={{
                                maxLength: 80,
                              }}
                            value={values.Direccion}
                            onChange={handleChange}
                            onBlur={handleBlur}                          
                            label="Dirección" />
                        </div>
                        <div>
                            <TextField 
                            name="client.Cp"
                            inputProps={{
                                maxLength: 10,
                              }}
                            value={values.Cp}
                            onChange={handleChange}
                            onBlur={handleBlur}                          
                            label="Código Postal" />
                        </div>
                        <div>
                            <TextField 
                            name="client.Telefono"
                            inputProps={{
                                maxLength: 20,
                              }}
                            value={values.Telefono}
                            onChange={handleChange}
                            onBlur={handleBlur}                           
                            label="Telefono" />
                        </div>
                        <div>
                           <TextField 
                            name="client.Celular"
                            inputProps={{
                                maxLength: 20,
                              }}
                            value={values.Celular}
                            onChange={handleChange}
                            onBlur={handleBlur}                          
                            label="Celular"/>
                        </div>
                        <br/>
                        <div>
                            <NativeSelect 
                                name="client.Estado" id="selCategorias"
                                 required onClick={handlerCargarArticulos}
                                 onChange={handleChange}
                            onBlur={handleBlur}>
                                 <option value={-1}>Seleccione un estado</option>
                                 {
                                    categorias.map((item, i)=>(
                                        <option key={"categoria"+i} value={i} >{item.nombre}</option>
                                    ))
                                 }
                                
                            </NativeSelect>
                        </div>
                        <br/>
                        <div>
                            <NativeSelect name="client.Ciudad" id="selArticulos" required onChange={handleChange}
                            onBlur={handleBlur}>
                                <option value={-1}>Seleccione una cuidad</option>

                                 {
                                    idArticulos > -1 &&
                                    (
                                        categorias[idArticulos].articulos.map((item, i)=>(
                                            <option key={"articulo"+i} value={values.item}>{item}</option> 
                                        ))
                                    )
                                 }
                            </NativeSelect>
                        </div>

                       
                        <div>
                            <TextField  
                            name="client.Observaciones"
                            value={values.Observaciones}
                            onChange={handleChange}
                            onBlur={handleBlur}                          
                            label="Observaciones" />
                        </div>
                        <div>
                            <TextField  
                            name="sucursals.Nombre"
                            inputProps={{
                                maxLength: 40,
                              }}
                            value={values.Sucursal}
                            onChange={handleChange}
                            onBlur={handleBlur}                          
                            label="Nombre de la sucursal a registrar" />
                        </div>
                        <div>
                           
                        </div>
                    <br/>
             </div>
                <ButtonsStyle>
                    <Button disabled={isSubmitting}  type="submit" className="btn" variant="contained" color="primary">Guardar</Button>
                </ButtonsStyle>
                </form>
                )}
            </Formik>
        </div>
        </ClientsCard>
    )

}

const ClientsCard=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    .datos{
        div{   
        width: 400px;         
            padding: 0;
            &:nth-child(1){
                display: flex;
                flex-direction: horizontal;
                justify-content: space-around;
                padding: 0;
            }
            &:nth-child(2){
                padding: 0;
            }
            &:nth-child(3){
                padding: 0;
            }
            &:nth-child(4){
                padding: 0;
            }
            &:nth-child(5){
                padding: 0;
            }
            &:nth-child(6){
                padding:0;
            }
            &:nth-child(7){
                padding:0;
            }
            &:nth-child(8){
                padding:0;
            }
            &:nth-child(9){
                padding:0;
            }
            &:nth-child(10){
                flex-direction: horizontal;
                padding:0;
            }
            &:nth-child(11){
                padding:0;
            }
            &:nth-child(12){
                padding:0;
            }
            &:nth-child(13){
                padding:0;
            }
        }
    }
`;
const ButtonsStyle = styled.div`
    display: flex;
    flex-direction: horizontal;
    ${'' /* border-style: none;
    border-radius: 8px;
    width: 220px;
    background-color: #A4A4A4; */}

    .btn{
        align-items: center;
        align-content: center;
        width: 100%;
    }
`;
export default ClientesForm;