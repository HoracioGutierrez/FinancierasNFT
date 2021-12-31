import Page from "../Page"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from '@mui/material/Button';
import Paper from "@mui/material/Paper";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";

const FintechList = () => {

    const [minters, setMinters] = useState([])

    return (
        <Page title="Administrador" subtitle="Lista de Fintechs">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Descripcion</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {minters.map((minter) => (
                            <TableRow
                                component="tr"
                                key={minter.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="td" align="left" >
                                    {minter.id}
                                </TableCell>
                                <TableCell component="td" align="left" >
                                    {minter.address} <a href='#' onClick={() => navigator.clipboard.writeText(minter.address)} ><ContentCopyIcon /></a>

                                </TableCell>
                                <TableCell component="td" align="left">
                                    <Button type="default" shape="round" color="error" onClick={() => {}}>
                                        Borrar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Page>
    )
}

export default FintechList
