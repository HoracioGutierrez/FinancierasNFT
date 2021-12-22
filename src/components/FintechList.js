import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Input,Row, Col, Button } from 'antd';
import './styles/FintechList.css';

function createData(nombre, fintechId, address, nft, actions) {
    return { nombre, fintechId, address, nft, actions };
  }

  const rows = [
    createData('TC24', 22, "0xe12354565745125456545245", 24, ),
    createData('TC25', 22, "0xe65745125456541235455245", 24,),

  ];

const FintechList = () => {
  return (
    <>
      <Stack spacing={2} justifyContent="left">
        <h1>Administrador</h1>
        <h1>Lista de Fintechs</h1>
      

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow component="th">
            <TableCell>Nombre</TableCell>
            <TableCell align="center" >Fintech ID</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Cantidad de NFT</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody id='tableBody'>
          {rows.map((row) => (
            <TableRow
              key={row.nombre}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="tr" scope="row">
                {row.nombre}
              </TableCell>
              <TableCell align="center" component="tr">{row.address}</TableCell>
              <TableCell align="center" component="tr">{row.fintechId}</TableCell>
              <TableCell align="center" component="tr">{row.nft}</TableCell>
              <TableCell align="center" component="tr"><Button shape="round" type="primary" style={{marginRight: "20px"}}>Ver NFT</Button><Button shape="round" danger>Borrar Fintech</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br/>
    <h3>Gestión de Fintech</h3>
    <h4>Fintechs</h4>
    <Row>
      <Col span={4} style={{marginRight: "20px", border: "1px solid gray"}}><Input placeholder="Nombre" /></Col>
      <Col span={6} style={{marginRight: "20px", border: "1px solid gray"}}><Input placeholder="Address" /></Col>
      <Col span={4} style={{marginRight: "20px", border: "1px solid gray"}}><Input placeholder="Fintech ID" /></Col>
      <Col span={4}><Button type="primary" shape="round">Ingresar Financiera</Button></Col>
    </Row>
    
    
    
    </Stack>
    </>
  );
};

export default FintechList;