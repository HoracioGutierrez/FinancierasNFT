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
import useAuth from "../hooks/useAuth"

const MinterList = () => {

    const { web3 } = useMoralis()
    const {user:{moralisInterface:user}} = useAuth()
    const [minters, setMinters] = useState([]);
    const [referencia, setReferencia] = useState("")
    const [address, setAddress] = useState("")
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const getMinters = async () => {
        const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
        const receipt = await contract.methods.getVecMintersAddress().call()
        setMinters(receipt.map(([address, id]) => ({ id, address })))
    }

    const deleteMinter = async (address) => {
        setLoading(true)
        const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
        const receipt = await contract.methods.removeMinterRole(address).send({from: user.attributes.ethAddress})
        setLoading(false)
    }

    const add = async () => {
        setLoading(true)
        const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
        const receipt = await contract.methods.setMinterRole(address, referencia).send({ from: user.attributes.ethAddress })
    }

    const handleReferenciaChange = (e) => {
        setReferencia(e.target.value)
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }

    useEffect(() => {
        getMinters()
    }, [])


    return (
        <Page title="Administrador" subtitle="Lista de Minters">
            <div className="page-subsection">
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
            </div>
            <div className="page-subsection">
                <Form form={form} name="horizontal_login" layout="horizontal" >

                    <Form.Item
                        name="description"
                        label="Descripcion"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor agrega una descripcion',
                            },
                            { min: 5, message: 'La descripcion debe tener un minimo de 5 caracteres' },
                        ]}
                    >
                        <Input placeholder="Descripcion" id='reference' onChange={handleReferenciaChange} />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Address"
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

                    <Form.Item shouldUpdate>
                        {() => (
                            <Button
                                type="primary"
                                onClick={(add)}
                                disabled={
                                    !form.isFieldsTouched(true) ||
                                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                }
                            >
                                Ingresar Minter
                            </Button>
                        )}
                    </Form.Item>

                </Form>
            </div>
        </Page>
    )
}

export default MinterList
