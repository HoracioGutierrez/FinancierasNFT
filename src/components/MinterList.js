import * as React from 'react';
import { useContext , useEffect } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import  ContentCopyIcon  from "@mui/icons-material/ContentCopy";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from '@mui/material/Grid';
import {Form, Input, Row, Col, Space } from "antd";
import Button from '@mui/material/Button';
import Moralis from 'moralis';
import {contractAbi, CONTRACT_ADDRESS} from '../abi';
import {useHistory} from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import "./styles/FintechList.css";


async function event(){
  const web3 = await Moralis.enableWeb3();
  const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
  contract.events.eventMinter(function(error, event){ console.log(event); })
  .on('data', function(event){
      console.log(event); // same results as the optional callback above
      window.location.reload()
  })
  .on('changed', function(event){
      // remove event from local database
  })
  .on('error', console.error);
}


const MinterList = () => {

  const [addresses,setAddresses] = React.useState([])
  const [minters, setMinters] = React.useState([]);
  const [referencia,setReferencia] = React.useState("")
  const [address,setAddress] = React.useState("")
  const [form] = Form.useForm();
  const [, forceUpdate] = React.useState({});
  const history = useHistory()
  let [loading, setLoading] = React.useState(false);

  event()

  // a list for saving subscribed event instances
  //const subscribedEvents = {}
  // Subscriber method
  // const subscribeLogEvent = (contract, eventName) => {
  //   const eventJsonInterface = web3.utils._.find(
  //     contract._jsonInterface,
  //     o => o.name === eventName && o.type === 'event',
  //   )
  //   const subscription = web3.eth.subscribe('logs', {
  //     address: contract.options.address,
  //     topics: [eventJsonInterface.signature]
  //   }, (error, result) => {
  //     if (!error) {
  //       const eventObj = web3.eth.abi.decodeLog(
  //         eventJsonInterface.inputs,
  //         result.data,
  //         result.topics.slice(1)
  //       )
  //       console.log(`New ${eventName}!`, eventObj)
  //     }
  //   })
  //   subscribedEvents[eventName] = subscription
  //   console.log(`subscribed to event '${eventName}' of contract '${contract.options.address}' `)
  // }

  // subscribeLogEvent(contract, "eventMinter")


  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    console.log('Finish:', values);
  };
 
  async function add(){
    const web3 = await Moralis.enableWeb3();
    let currentUser = Moralis.User.current();
    setLoading(true)
    const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    contract.methods.setMinterRole(address, referencia).send({from: currentUser.attributes.ethAddress}).then(function(receipt){
      //console.log(receipt)  // cuando se confirma la transaccion devuelve un json con el numero de trasacc, nro de bloque, gas, etc.
      setLoading(false)
      window.location.reload()
      //subscribeLogEvent(contract, "eventMinter", web3)
    });
    
  }
  

  
  async function getMinters(){
    const web3 = await Moralis.enableWeb3();
    const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    await contract.methods.getVecMintersAddress().call().then(function(receipt){
    setAddresses(receipt)
    }); 
  }

  async function deleteMinter(address){
    console.log(address);
    const web3 = await Moralis.enableWeb3();
    let currentUser = Moralis.User.current();
    setLoading(true)
    const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    await contract.methods.removeMinterRole(address).send({from: currentUser.attributes.ethAddress}).then(function(receipt){
      //console.log(receipt)  // cuando se confirma la transaccion devuelve un json con el numero de trasacc, nro de bloque, gas, etc.
      window.location.reload()
    });
  }


//  useEffect(()=>{
//    getDescription("0x5c6a20eBa299B1D7D09757FD91F1384Fe9c5fA90");
//  },[])

  useEffect(()=>{
    getMinters();
  },[])

  useEffect(()=>{
    //Aca recorres el array addresses y piden la data que falta
    
    setMinters(addresses.map(a=>({
      id : a[1], //.toString(),
      address : a[0]
    })));

  },[addresses])


const handleReferenciaChange  = (e) => {
  setReferencia(e.target.value)
}


const handleAddressChange = (e) => {
  setAddress(e.target.value)
}



  return (
    <>
      {!loading ? (<Stack spacing={2} justifyContent="left">
        <h1 className="title">Administrador </h1>
        <h2 className="subtitle">Lista de Minters</h2>
        <TableContainer component={Paper}>
          <Table aria-label="simple table" sx={{ minWidth: 650, maxWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ border: "1px solid gray", fontWeight: "700" }}>Descripcion</TableCell>
                <TableCell align="center" style={{ border: "1px solid gray", fontWeight: "700" }}>Address</TableCell>
                <TableCell align="center" style={{ border: "1px solid gray", fontWeight: "700" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {minters.map((row) => (
                <TableRow
                  component="tr"
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="tr" align="center" >
                    {row.id}
                  </TableCell>
                  <TableCell component="tr" align="center" >
                    {row.address} <a href='#' onClick={() =>  navigator.clipboard.writeText(row.address)} ><ContentCopyIcon /></a>
                     
                  </TableCell>
                  <TableCell component="tr" align="center">
                  <Button type="default" shape="round" color="error" onClick={() => deleteMinter(row.address)}>
                         Borrar
                 </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br/>
        <h3 className="subtitle">Gestión de Minters</h3>
        <h4 className="infoSubtitle">Minters</h4>


        
        <Form form={form} name="horizontal_login" layout="horizontal" onFinish={onFinish} >
        
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: 'Por favor agrega una descripcion',
              },
              { min: 5, message: 'La descripcion debe tener un minimo de 5 caracteres' },
            ]}
          >
            <Input placeholder="Descripcion" id='reference' onChange={handleReferenciaChange} style={{width:"300px", border: "1px solid black", margin: "10px"}}/>
          </Form.Item>
          
          <Form.Item
            name="address"
            
            rules={[
              {
                required: true,
                pattern: new RegExp(/^0x[a-fA-F0-9]{40}$/),
                message: 'Por favor agrega un Address valido',
              },
            ]}
          >
            <Input placeholder="Address" id='address1' onChange={handleAddressChange} style={{width:"300px", border: "1px solid black", margin: "10px"}}/>
          </Form.Item>
          
              <Form.Item shouldUpdate>
            {() => (
              <Button 
                type="primary"
                htmlType="submit"
                // 
                onClick={(add)}
                disabled={
                  
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                Ingresar Minter
              </Button>
            )}
          </Form.Item>
          
        </Form>
              

      </Stack>) : (<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>)}
      


    </>
  );
};

export default MinterList

  // async function isInAdminRole(){
  //   const web3 = await Moralis.enableWeb3();
  //   let currentUser = Moralis.User.current();

  //   const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    
  //   contract.methods.isInAdminRole(currentUser.attributes.ethAddress).call({from: currentUser.attributes.ethAddress}).then(function(receipt){
  //     console.log(receipt)  // cuando se confirma la transaccion devuelve un json con el numero de trasacc, nro de bloque, gas, etc.
  //     administradorRol = receipt;
  //     console.log(administradorRol);
  //     // window.location.reload()
  //   });
  // }
  // isInAdminRole();

  // async function isInMinterRole(){
  //   const web3 = await Moralis.enableWeb3();
  //   let currentUser = Moralis.User.current();

  //   const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    
  //   contract.methods.isInMinterRole(currentUser.attributes.ethAddress).call({from: currentUser.attributes.ethAddress}).then(function(receipt){
  //     console.log(receipt)  // cuando se confirma la transaccion devuelve un json con el numero de trasacc, nro de bloque, gas, etc.
  //     minterRol = receipt;
  //     console.log(minterRol);
  //     // window.location.reload()
  //   });
  // }
  // isInMinterRole();

  // async function isInFintechRole(){
  //   const web3 = await Moralis.enableWeb3();
  //   let currentUser = Moralis.User.current();

  //   const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    
  //   contract.methods.isInFinancieraRole(currentUser.attributes.ethAddress).call({from: currentUser.attributes.ethAddress}).then(function(receipt){
  //     console.log(receipt)  // cuando se confirma la transaccion devuelve un json con el numero de trasacc, nro de bloque, gas, etc.
  //     fintechRol = receipt;
  //     console.log(fintechRol);
  //     // window.location.reload()
  //   });
  // }
  // isInFintechRole();

