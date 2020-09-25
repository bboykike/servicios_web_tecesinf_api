import React from 'react';
import MaterialTable from 'material-table';

const AccesoriosTable = () =>{
    const [state, setState] = React.useState({
        columns: [
          { title: 'Nombre', field: 'nombre' },
          { title: 'Marca', field: 'marca' },
          { title: 'NoSerie', field: 'serie', type: 'numeric' },
        ],
        data: [
          { nombre: 'Mehmet',
           marca: 'MEPB990627HC3',
           serie:'997395009',
           puerca:'asd'

           },
          {
            nombre: 'Zerya Betül',
            marca: 'Baran',
            serie:'997395009'
          },
          {
            nombre: 'Bryan Betül',
            marca: 'Baran',
            serie:'997395009'

          }
        ],
      });
      
    return(
      
      <MaterialTable
      title="Accesorios Lista"
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

export default AccesoriosTable