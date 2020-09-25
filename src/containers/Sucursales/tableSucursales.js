import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router';
import Api from '../../Helpers/Api';
import {useParams} from 'react-router-dom';


const  TableSucursales = () => {
    const {IDcliente} = useParams()
    const history = useHistory();
    const [sucursal, setSucursal] = React.useState([])
    const columns = [
        {
        title: "ID",
        field: "IDsucursal"
        },
        {
        title: "Nombre",
        field: "Nombre"
        },
        {
        title: "Direccion",
        field: "Direccion"
        }
    ];
    useEffect(() => {   
        const GetData = async () =>{
            const response =  await Api.get(`GetSucursales/${IDcliente}`)
            setSucursal(response.data);
            console.log(sucursal)
        };    
            GetData()

    }, [] ) ; 

    function handleClick(rute) {
        history.push(`/Equipos/${rute}`);
    }

  return (
    <MaterialTable
      title="Sucursales"
      columns={columns}
      data={sucursal}
      actions={[
        {
            icon:'more',
            tooltip: 'Ver mas',
            onClick: (event, rowData) => {handleClick(rowData.IDsucursal)}
        }
      ]}
      options={{
        actionsColumnIndex: -1,
        exportButton: true
      }}
    />
  );
}
export default TableSucursales;
