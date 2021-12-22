import * as React from 'react';
import {useContext} from 'react';
import  {context} from './ModalProvider'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from "@mui/material/Stack";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from 'antd';
import './styles/Table.css';
import NFTEditModal from './NFTEditModal';
import NFTDeleteModal from './NFTDeleteModal';

function createData(id ,nroPrestamo, nombre, apellido, cuil, tokenId) {
  return { id , nroPrestamo, nombre, apellido, cuil, tokenId };
}

const rows = [
  createData( 1, 1, "Martin 1", "Perez", 2400155554, 1),
  createData(2, 2, "Martin 2", "Perez", 2400155554, 2),
  createData(3, 3, "Martin 3", "Perez", 2400155554, 3),

];


export default function TableNFT() {
  const [filter, setFilter] = React.useState('');
  // const {openModal} = useContext(context);
  const [financieras,setFinancieras] = React.useState(rows);


  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const actualizarFinanciera = (id,nombre) => {
    console.log("Actualizar una sola financiera localmente")
    console.log(id)
    console.log(nombre)
    setFinancieras(financieras.map(financiera => {
      if(financiera.id === id){
        financiera.nombre = nombre
      }
      return financiera;
    }))
  }


  return (
    <>
    <Stack>
   
    <h1>Smart Contracts</h1>
    <p>Todos los contratos en un solo lugar</p>
    <br/>
    <h3>Ordenar por</h3>
    <br/>
    <FormControl >
        
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label=""
          style={{width: "200px"}}
          onChange={handleChange}
        >
          <MenuItem value={1}>Fecha</MenuItem>
          <MenuItem value={2}>Nombre</MenuItem>
          <MenuItem value={3}>CUIL</MenuItem>
        </Select>
      </FormControl>
      <br/>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{backgroundColor: "#663DBD"}}>
          <TableRow >
            <TableCell style={{color: "white"}}>Nro. Prestamo</TableCell>
            <TableCell style={{color: "white"}}>Nombre</TableCell>
            <TableCell style={{color: "white"}}>Apellido</TableCell>
            <TableCell style={{color: "white"}}>CUIL</TableCell>
            <TableCell style={{color: "white"}}>Token ID</TableCell>
            <TableCell style={{color: "white"}}>Acciones</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {financieras.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">
                {row.nroPrestamo}
              </TableCell>
              <TableCell align="center">{row.nombre}</TableCell>
              <TableCell align="center">{row.apellido}</TableCell>
              <TableCell align="center">{row.cuil}</TableCell>
              <TableCell align="center">{row.tokenId}</TableCell>
              <TableCell >
                {/* <Button onClick={()=>openModal(<NFTEditModal actualizarFinanciera={actualizarFinanciera} id={row.id}/>)} style={{marginRight: "20px"}} shape="round" type="primary">Editar</Button> */}
                {/* <Button onClick={()=>openModal(<NFTDeleteModal/>)} shape="round"  danger>Borrar</Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Stack>
    </>
  );
}