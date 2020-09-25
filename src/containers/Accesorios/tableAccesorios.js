import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router';
import Api from '../../Helpers/Api';
import {useParams} from 'react-router-dom';


const  TableAccesorio = () => {
  const {IDequipo} = useParams()
  const history = useHistory();
  const [equipos, setEquipos] = React.useState([])
  const columns = [
    {
      title: "ID",
      field: "IDaccesorio"
    },
    {
      title: "Accesorio",
      field: "Nombre"
    },
    {
      title: "No.Serie",
      field: "NoSerie"
    }
  ];

  useEffect(() => {   
    const GetData = async () =>{
        const response =  await Api.get(`GetAccesorios/${IDequipo}`)
        setEquipos(response.data);
        console.log(equipos)
      };    
        GetData()
  }, [] ) ; 
  function handleClick(rute) {
      console.log('finalizaste los catalogos');
    // history.push(`/Accesorios/${rute}`);
}

  return (
    <MaterialTable
      title="Accesorios"
      columns={columns}
      data={equipos}
      actions={[
        {
            icon:'more',
            tooltip: 'Ver mas',
            onClick: (event, rowData) => {handleClick(rowData.IDequipo)}
        }
      ]}
      options={{
        actionsColumnIndex: -1,
        exportButton: true
      }}
    />
  );
}
export default TableAccesorio;
