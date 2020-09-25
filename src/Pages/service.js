import React,{useState} from 'react'
import styled from 'styled-components';
import Pagina from '../components/Service';


const Serv= () => {
    const [tab, setTab] = useState(1);

    const changeTab = (tab) => {
         setTab(tab);
    }

   return (
    <>
        <Tabs
          selected={tab}
        >       
             <div > 
             <span className="btn"  onClick={()=> setTab(1)}>NUEVO SERVICIO </span>
             </div>   
             <div>
             <span className="btn" onClick={()=> setTab(2)}>SEGUIMIENTO</span>
             </div>
         </Tabs>
    {tab === 1
    ?
    <Card>
         <Pagina/> 
     </Card>  
    :<h1>prueba</h1>}
    </>
    )
}

const Tabs = styled.div`
  display:flex;
  justify-content:center;
  align-content: center;
  .btn{
       backgroud:none;
       color:#000000;
       width:auto;
       height:auto;
       padding: 5px;
       font-size:18px;
       border-radius: 16;
       border-bottom: {({selected}) => selected == 1 ? solid 2px blue:none};
       font-weight: 600;
       transition: .6s; 
       font-family:century gothic;
       color:black;
  }
  span:hover{
    color: #0404B4;
    backgroud:;
    background-col4r:#A4A4A4;
  }
` 
const Card = styled.div`
display:flex;
flex-wrap: wrap;
justify-content:center;
`
export default Serv