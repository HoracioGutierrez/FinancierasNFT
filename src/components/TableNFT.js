import * as React from "react";
import { useContext , useEffect } from "react";
import { context } from "./ModalProvider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableRowsIcon from "@mui/icons-material/TableRows";
import GridViewIcon from "@mui/icons-material/GridView";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "antd";
import Pagination from "@mui/material/Pagination";
import "./styles/Table.css";
import NFTEditModal from "./NFTEditModal";
import NFTDeleteModal from "./NFTDeleteModal";

export default function TableNFT() {
  
  const [filter, setFilter] = React.useState("");
  // const {openModal} = useContext(context);
  const [financieras, setFinancieras] = React.useState([]);
  

  console.log(financieras);

  useEffect(()=>{
    getData();
  },[])

  async function getData() {
    const response = await fetch(
      "https://wj0omlye4aky.usemoralis.com:2053/server/classes/Metadata",
      {
        method: "GET",
        headers: {
          "X-Parse-Application-Id": "QaWiHgr7Cyn8eLXGWgK5lnC9nO6vBjfULK2Hq2b5",
        },
      }
    );
    const {results} = await response.json(); //extract JSON from the http response
    console.log(results);
    // do something with myJson
    setFinancieras(results);
  }



  const handleChange = (event) => {
    setFilter(event.target.value);
  };


  return (
    <>
      <Stack>
        <h1 className="tableTitle">Smart Contracts</h1>
        <p className="tableSubtitle">Todos los contratos en un solo lugar</p>
        <br />
        <br />

        <Stack direction="row" spacing={2} alignItems="center">
          <h3>Ordenar por </h3>

          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={1}
              label=""
              style={{ width: "200px" }}
              onChange={handleChange}
            >
              <MenuItem value={1}>Fecha</MenuItem>
              <MenuItem value={2}>Nombre</MenuItem>
              <MenuItem value={3}>CUIL</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          alignItems="center"
        >
          <TableRowsIcon style={{ color: "#663DBD" }} />
          <GridViewIcon style={{ color: "#663DBD" }} />
        </Stack>
        <br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#663DBD" }}>
              <TableRow>
              <TableCell style={{ color: "white" }}>Fintech ID</TableCell>
                <TableCell style={{ color: "white" }}>CUIL</TableCell>
                <TableCell style={{ color: "white" }}>Cuotas</TableCell>
                <TableCell style={{ color: "white" }}>Celular</TableCell>
                <TableCell style={{ color: "white" }}>Dirección</TableCell>
                <TableCell style={{ color: "white" }}>Email</TableCell>
                <TableCell style={{ color: "white" }}>Primer Vencimiento</TableCell>
                <TableCell style={{ color: "white" }}>Nombre Completo</TableCell>
                <TableCell style={{ color: "white" }}>Monto Prestamo</TableCell>
                <TableCell style={{ color: "white" }}>Fecha</TableCell>
                <TableCell style={{ color: "white" }}>Actions</TableCell>
            
              </TableRow>
            </TableHead>
            <TableBody>
              {financieras.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.FintechId}</TableCell>
                  <TableCell align="center">{row.CUIL}</TableCell>
                  <TableCell align="center">{row.CantidadCuotas}</TableCell>
                  <TableCell align="center">{row.Celular}</TableCell>
                  <TableCell align="center">{row.Direccion}</TableCell>
                  <TableCell align="center">{row.Email}</TableCell>
                  <TableCell align="center">{row.FechaPrimerVencimiento}</TableCell>
                  <TableCell align="center">{row.FullName}</TableCell>
                  <TableCell align="center">{row.MontoPrestamo}</TableCell>
                  <TableCell align="center">{row.createdAt}</TableCell>

                  <TableCell>
                    <Button className="buttonNFT">NFT</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination className="paginador" count={5} />
      </Stack>
    </>
  );
}

// onClick={()=>openModal(<NFTEditModal actualizarFinanciera={actualizarFinanciera} id={row.id}/>)}
//onClick={()=>openModal(<NFTDeleteModal/>)}
