import React from 'react';
import MaterialTable from 'material-table';

const TableUser = () =>{
    const [state, setState] = React.useState({
        columns: [
          { title: 'Usuario ', field: 'Usuario' },
          { title: 'Apellido', field: 'serie' },
          { title: 'Marca', field: 'marca', type: 'numeric' },
        ],
        data: [
          { equipo: 'Mehmet',
           serie: 'MEPB990627HC3',
           marca:'997395009'

           },
          {
            equipo: 'Zerya Betül',
            serie: 'Baran',
            marca:'997395009'
          },
          {
            equipo: 'Bryan Betül',
            serie: 'Baran',
            marca:'997395009'

          }
        ],
      });
      
    return(
      
      <MaterialTable
      title="Equipos Lista"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
      options={{
        exportButton: true
      }}
    />
  )
}

export default TableUser