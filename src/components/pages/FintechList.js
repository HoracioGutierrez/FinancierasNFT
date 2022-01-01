import Page from "../Page"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Button} from 'react-bootstrap';
import Paper from "@mui/material/Paper";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useEffect, useState } from "react";
import { Form, Input } from "antd";
import { useMoralis } from "react-moralis";
import { contractAbi, CONTRACT_ADDRESS } from "../../abi"
import useAuth from "../hooks/useAuth";

const FintechList = () => {

    const [financieras, setFinancieras] = useState([])
    const [id, setId] = useState("")
    const [address, setAddress] = useState("")
    const { web3 } = useMoralis()
    const { user: { moralisInterface: user } } = useAuth()
    const [form] = Form.useForm();

    const handleAddressChange = e => {
        setAddress(e.target.value)
    }

    const handleIdChange = e => {
        setId(e.target.value)
    }

    const add = async () => {
        const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
        await contract.methods.agregarFinanciera(address, id).send({ from: user.attributes.ethAddress })
    }

    async function getFinancieras() {
        const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
        const ids = await contract.methods.getArrayIdsFintech().call()
        const addresses = await Promise.all(ids.map(async id => {
            return await contract.methods.getAddressFinanciera(id).call()
        }))
        const nfts = await Promise.all(addresses.map(async address => {
            return await contract.methods.getNftsInAddress(address).call()
        }))
        var c = ids.map(function (e, i) {
            return [e, addresses[i], nfts[i].length];
        });
        setFinancieras(c.map(a => ({
            id: a[0],
            address: a[1],
            nft: a[2],
        })));
    }

    const showNFTDetails = async (nft) => {
        console.log(nft)
    }

    const deleteFintech = async (idFinanciera) => {
        const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
        await contract.methods.removeFinanciera(idFinanciera).send({ from: user.attributes.ethAddress })
    }

    useEffect(() => {
        getFinancieras()
    }, [])

    return (
        <Page title="Administrador" id="fintech-list-page">
            <div className="page-subsection">
                <h2>Lista de Financieras</h2>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Fintech ID</TableCell>
                                <TableCell align="left">Address</TableCell>
                                <TableCell align="left">Cantidad de NFT</TableCell>
                                <TableCell align="left">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {financieras.map((financiera) => (
                                <TableRow
                                    component="tr"
                                    key={financiera.id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="td" align="left" >
                                        {financiera.id}
                                    </TableCell>
                                    <TableCell component="td" align="left" >
                                        {financiera.address} <a href='#' onClick={() => navigator.clipboard.writeText(financiera.address)} ><ContentCopyIcon /></a>
                                    </TableCell>
                                    <TableCell component="td" align="left" >
                                        {financiera.nft}
                                    </TableCell>
                                    <TableCell component="td" align="left">
                                        <Button
                                            shape="round"
                                            type="primary"
                                            style={{ marginRight: "20px" }}
                                            onClick={() => showNFTDetails(financiera.nft)}
                                        >
                                            Ver NFT
                                        </Button>
                                        <Button color="error" onClick={() => deleteFintech(parseInt(financiera.id))}>Borrar Fintech</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className="page-subsection">
                <h2>Inresar Financiera</h2>
                <Form form={form} id="financiera-form" name="horizontal_login" layout="horizontal" className="agregar-form" >
                    <Form.Item
                        name="address"
                        label="Fintech Address"
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp(/^0x[a-fA-F0-9]{40}$/),
                                message: 'Por favor agrega un Address valido',
                            },
                        ]}
                    >
                        <Input placeholder="Address" id='address1' onChange={handleAddressChange} />
                    </Form.Item>

                    <Form.Item
                        name="id"
                        label="ID"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor agrega una ID',
                            },
                            { min: 5, message: 'El ID debe tener un minimo de 5 caracteres' },
                        ]}
                    >
                        <Input placeholder="ID" id='id' onChange={handleIdChange} />
                    </Form.Item>


                    <Form.Item shouldUpdate>
                        <Button
                            type="primary"
                            onClick={(add)}
                            disabled={
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Ingresar Financiera
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </Page>
    )
}

export default FintechList
