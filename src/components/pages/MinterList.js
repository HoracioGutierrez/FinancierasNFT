import { useEffect, useState } from "react"
import { Form, Input } from "antd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from '@mui/material/Button';
import Paper from "@mui/material/Paper";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useMoralis } from "react-moralis";
import { contractAbi, CONTRACT_ADDRESS } from "../../abi"
import Page from "../Page";

const MinterList = () => {

    const { web3 } = useMoralis()
    const [addresses, setAddresses] = useState([])
    const [minters, setMinters] = useState([]);
    const [referencia, setReferencia] = useState("")
    const [address, setAddress] = useState("")
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const getMinters = async () => {
        const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
        const receipt = await contract.methods.getVecMintersAddress().call()
        setAddresses(receipt)
        setMinters(receipt.map(([id,address]) => ({ id , address })))
    }

    const deleteMinter = () => {

    }


    useEffect(() => {
        getMinters()
    },[])


    return (
        <Page title="Administrador" subtitle="Lista de Minters">
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
                                    <Button type="default" shape="round" color="error" onClick={() => deleteMinter(minter.address)}>
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

export default MinterList
