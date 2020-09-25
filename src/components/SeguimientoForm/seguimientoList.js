import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router';
import Api from '../../Helpers/Api';
import { Cookies} from 'react-cookie'
const cookie = new Cookies(); 


const ContinuarForm = () => {
    const history = useHistory();
    const [cookiee, setCoo] = React.useState(['ID'])
    const [listado, setListado] = React.useState([])
    const columns = [
        {
        title: "ID",
        field: "IDservicio"
        },
        {
        title: "Servicio",
        field: "Tipo"
        },
        {
        title: "Fecha",
        field: "FechaIn"
        },
        {
          title: "Status",
          field: "Status"
        }
    ];
          const getCookie = () => {           
            console.log(cookie.get('ID'));  
            const IDu = cookie.get('ID');
            console.log('Recuperaste', IDu)
            setCoo({ID:IDu})
        }   
    useEffect(() => {  
        const GetData = async () =>{
            const response =  await Api.get(`GetPendientes/${ID}`)
            setListado(response.data);
            console.log(listado)
        };   
             getCookie()
             const ID= cookie.cookies.ID
            GetData()

    }, [] ) ; 


    function handleClick(rute) {
        history.push(`/Detalles/${rute}`);
    }

  return (
    <MaterialTable
      title="Servicios"
      columns={columns}
      data={listado}
      actions={[
        {
            icon:'visibility',
            tooltip: 'Ver mas',
            size:'80px',
            onClick: (event, rowData) => {handleClick(rowData.IDservicio)}
        }
      ]}
      options={{
        actionsColumnIndex: -1,
        exportButton: true
      }}
    />
  );
}
export default ContinuarForm;