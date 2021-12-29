import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Input, Row, Col } from "antd";
import Button from "@mui/material/Button";
import "./styles/FintechList.css";
import Moralis from 'moralis';
import {contractAbi, CONTRACT_ADDRESS} from '../abi';

let web3;



function createData( fintechId, address, nft, actions) {
  return {  fintechId, address, nft, actions };
}

const rows = [
  createData( 22, "0xe12354565745125456545245", 24),
  createData( 22, "0xe65745125456541235455245", 24),
];

const FintechList = () => {

  async function add(){
    let currentUser = Moralis.User.current(); 
    
    web3 = await Moralis.enableWeb3();


    let address = document.getElementById("address").value
    console.log(address)
    let id = parseInt(document.getElementById("id").value)
    console.log(id)

    const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    contract.methods.agregarFinanciera(address, id).send({from: currentUser.attributes.ethAddress}).then(function(receipt){
        console.log(receipt)  // cuando se confirma la transaccion devuelve un json con el numero de trasacc, nro de bloque, gas, etc.
    });
}

  return (
    <>
      <Stack spacing={2} justifyContent="left">
        <h1 className="title">Administrador</h1>
        <h1 className="subtitle">Lista de Fintechs</h1>

        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, maxWidth: 850 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow component="th">
              
                <TableCell
                  align="center"
                  style={{ border: "1px solid gray", fontWeight: "700" }}
                >
                  Fintech ID
                </TableCell>
                <TableCell
                  align="center"
                  style={{ border: "1px solid gray", fontWeight: "700" }}
                >
                  Address
                </TableCell>
                <TableCell
                  align="center"
                  style={{ border: "1px solid gray", fontWeight: "700" }}
                >
                  Cantidad de NFT
                </TableCell>
                <TableCell
                  align="center"
                  style={{ border: "1px solid gray", fontWeight: "700" }}
                >
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody id="tableBody">
              {rows.map((row) => (
                <TableRow
                  key={row.nombre}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  
                  <TableCell align="center" component="tr">
                    {row.fintechId}
                  </TableCell>
                  <TableCell align="center" component="tr">
                    {row.address}
                  </TableCell>
                  <TableCell align="center" component="tr">
                    {row.nft}
                  </TableCell>
                  <TableCell align="center" component="tr">
                    <Button
                      shape="round"
                      type="primary"
                      style={{ marginRight: "20px" }}
                    >
                      Ver NFT
                    </Button>
                    <Button color="error">Borrar Fintech</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <h3>Gestión de Fintech</h3>
        <h4>Fintechs</h4>
        <Stack direction="row" spacing={2}>


          <Row
            span={6}
            style={{ marginRight: "20px", border: "1px solid gray" }}
          >
            <Input id="address" placeholder="Address" />
          </Row>

          <Row
            span={6}
            style={{ marginRight: "20px", border: "1px solid gray" }}
          >
            <Input id='id' placeholder="Fintech ID" />
          </Row>

          <Row span={6} style={{ marginRight: "20px" }}>
            <Button variant="contained" shape="round" onClick={add}>
              Ingresar Financiera
            </Button>
          </Row>
        </Stack>
      </Stack>
    </>
  );
};

export default FintechList;