import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router';
import Api from '../../Helpers/Api';


const  TableClientes = () => {

  const history = useHistory();
  const [datos, setDatos] = React.useState([])
  const columns = [
    {
      title: "RFC",
      field: "RFC"
    },
    {
      title: "Cliente",
      field: "Cliente"
    },
    {
      title: "Celular",
      field: "Celular"
    }
  ];
  useEffect(() => {       
    const GetData = async () =>{
      const response =  await Api.get('ListaClientes')
      console.log('recuperas', response.data.clients)
      const clients = response.data.clients;
      setDatos(clients)
      // setDatos({data:response.data.clients})
    };
    GetData()
    }, [] ) ; 
  function handleClick(rute) {
     history.push(`/Sucursales/${rute}`);
  }

  return (
    <MaterialTable
      title="Clientes"
      columns={columns}
      data={datos}
      actions={[
        {
            icon:'expandmore',
            tooltip: 'Ver mas',
            onClick: (event, rowData) => {handleClick(rowData.IDcliente)}
        }
      ]}
      options={{
        actionsColumnIndex: -1,
        exportButton: true
      }}
    />
  );
}
export default TableClientes;
