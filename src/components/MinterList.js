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

import { useContext } from "react";
import  {context} from './ModalProvider'

import "./styles/FintechList.css";

function createData(minter, address) {
  return { minter, address };
}
async function getJson(){
const response = await fetch('https://wj0omlye4aky.usemoralis.com:2053/server/classes/Metadata', {
  method: 'GET',
  headers: {
      'X-Parse-Application-Id': 'QaWiHgr7Cyn8eLXGWgK5lnC9nO6vBjfULK2Hq2b5'
      }
  });
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
  console.log(myJson);
}

const rows = [
  createData(1, "0xe123453434534535"),
  createData(1, "0xe657453453453453"),
];

const MinterList = () => {

  getJson();

//   const {openModal} = useContext(context)

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
              {rows.map((row) => (
                <TableRow
                  component="tr"
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="tr" align="center">
                    {row.minter}
                  </TableCell>
                  <TableCell component="tr" align="center">
                    {row.address} <ContentCopyIcon />
                     
                  </TableCell>
                  <TableCell component="tr" align="center">
                  <Button type="default" shape="round" color="error">
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
            <Input placeholder="Referencia" />
          </Row>

          <Row
            span={6}
            style={{ marginRight: "20px", border: "1px solid gray" }}
          >
            <Input placeholder="Address" />
          </Row>

          <Row span={6} style={{ marginRight: "20px" }}>
            <Button variant="contained" shape="round">
              Ingresar Minter
            </Button>
          </Row>
        
        </Stack>
      </Stack>
    </>
  );
};

export default MinterList;