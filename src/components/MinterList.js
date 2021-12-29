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
import "./styles/FintechList.css";


const MinterList = () => {

  const [addresses,setAddresses] = React.useState([])
  const [minters, setMinters] = React.useState([]);
  const [referencia,setReferencia] = React.useState("")
  const [address,setAddress] = React.useState("")
  const [form] = Form.useForm();
  const [, forceUpdate] = React.useState({});
  const history = useHistory()
  

  let administradorRol = false;
  let minterRol = false;
  let fintechRol = false;

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    console.log('Finish:', values);
  };
 
  async function add(){
    const web3 = await Moralis.enableWeb3();
    let currentUser = Moralis.User.current();
    
    const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    contract.methods.setMinterRole(address, referencia).send({from: currentUser.attributes.ethAddress}).then(function(receipt){
      console.log(receipt)  // cuando se confirma la transaccion devuelve un json con el numero de trasacc, nro de bloque, gas, etc.
        window.location.reload()
    });

  }
  

  async function getMinters(){
    const web3 = await Moralis.enableWeb3();
    let currentUser = Moralis.User.current();
    const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    await contract.methods.getVecMintersAddress().call({from: currentUser.attributes.ethAddress}).then(function(receipt){
    console.log(receipt);
     setAddresses(receipt)
  }); 
  }

  async function getDescription(address){
    //console.log(address + ' direccion dentro de getDescriotion');
    const web3 = await Moralis.enableWeb3();
    let currentUser = Moralis.User.current();
    let resultado;
    const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    return await contract.methods.getDescriptionMinter(address).call().then(function(result){
      return result
    })
    // console.log(resultado + 'hola')
    // return resultado
      //console.log('las descripciones  '+ receipt)
      //setReferencia(receipt);  // cuando se confirma la transaccion devuelve un json con el numero de trasacc, nro de bloque, gas, etc.
   // }); 
  }

  async function deleteMinter(address){
    console.log(address);
    const web3 = await Moralis.enableWeb3();
    let currentUser = Moralis.User.current();
    
    const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    await contract.methods.removeMinterRole(address).send({from: currentUser.attributes.ethAddress}).then(function(receipt){
      console.log(receipt)  // cuando se confirma la transaccion devuelve un json con el numero de trasacc, nro de bloque, gas, etc.
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
      id : getDescription(a).toString(),
      address : a
    })));

  },[addresses])


console.log("LISTA MINTERS",minters)

const handleReferenciaChange  = (e) => {
  setReferencia(e.target.value)
}


const handleAddressChange = (e) => {
  setAddress(e.target.value)
}



  return (
    <>
      <Stack spacing={2} justifyContent="left">
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
            ]}
          >
            <Input placeholder="Descripcion" id='reference' onChange={handleReferenciaChange} style={{width:"300px", border: "1px solid black", margin: "10px"}}/>
          </Form.Item>
          
          <Form.Item
            name="address"
            
            rules={[
              {
                required: true,
                message: 'Por favor agrega una contraseña',
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
              

      </Stack>
      


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