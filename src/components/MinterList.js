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
import { Input, Row, Col, Space } from "antd";
import Button from '@mui/material/Button';
import Moralis from 'moralis';
import {contractAbi, CONTRACT_ADDRESS} from '../abi';
import {useHistory} from "react-router-dom"

import  {context} from './ModalProvider'

import "./styles/FintechList.css";


const MinterList = () => {

  const [addresses,setAddresses] = React.useState([])
  const [minters, setMinters] = React.useState([]);
  const [referencia,setReferencia] = React.useState("")
  const [address,setAddress] = React.useState("")
  const history = useHistory()
  
 
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

  async function deleteMinter(address){
    const web3 = await Moralis.enableWeb3();
    let currentUser = Moralis.User.current();
    
    const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    await contract.methods.removeMinterRole(address).send({from: currentUser.attributes.ethAddress}).then(function(receipt){
      console.log(receipt)  // cuando se confirma la transaccion devuelve un json con el numero de trasacc, nro de bloque, gas, etc.
    });
  }
 

  useEffect(()=>{
    getMinters();
  },[])

  useEffect(()=>{
    //Aca recorres el array addresses y piden la data que falta
    setMinters(addresses.map(a=>({
      id : Math.random(),
      address : a
    })))

  },[addresses])



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
                <TableCell align="center" style={{ border: "1px solid gray", fontWeight: "700" }}>Minter</TableCell>
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
                  <Button type="default" shape="round" color="error" onClick={(deleteMinter)}>
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

        <Stack direction="row" spacing={2}>
        
          <Row
            span={6}
            style={{ marginRight: "20px", border: "1px solid gray" }}
          >
            <Input placeholder="Referencia" id='reference' onChange={handleReferenciaChange}/>
          </Row>

          <Row
            span={6}
            style={{ marginRight: "20px", border: "1px solid gray" }}
          >
            <Input placeholder="Address1" id='address1' onChange={handleAddressChange}/>
          </Row>

          <Row span={6} style={{ marginRight: "20px" }}>
            <Button variant="contained" shape="round" onClick={(add)}>
              Ingresar Minter
            </Button>
          </Row>
        
        </Stack>
      </Stack>
    </>
  );
};

export default MinterList;