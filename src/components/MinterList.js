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
import { Input, Row, Col, Button, Space } from "antd";

import { useContext } from "react";
import  {context} from './ModalProvider'

import "./styles/FintechList.css";

function createData(minter, address) {
  return { minter, address };
}

const rows = [
  createData(1, "0xe123453434534535"),
  createData(1, "0xe657453453453453"),
];

const MinterList = () => {

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
                  <Button type="default" shape="round" >
                         Borrar
                 </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <h3>Gestión de Minters</h3>
        <h4>Minters</h4>
        <Row>
          <Col
            span={6}
            style={{ marginRight: "20px", border: "1px solid gray" }}
          >
            <Input placeholder="Referencia" />
          </Col>

          <Col
            span={6}
            style={{ marginRight: "20px", border: "1px solid gray" }}
          >
            <Input placeholder="Address" />
          </Col>

          <Col span={6} style={{ marginRight: "20px" }}>
            <Button type="primary" shape="round">
              Ingresar Minter
            </Button>
          </Col>
        </Row>
      </Stack>
    </>
  );
};

export default MinterList;