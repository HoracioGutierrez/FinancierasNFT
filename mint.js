Moralis.initialize("UBLBJztkt7wqWAiPaHmaTfZs5Kj8CoZs9wNn6erg")
Moralis.serverURL = "https://ezdnxz4vljsr.usemoralis.com:2053/server"
const CONTRACT_ADDRESS = "0x96ec78B9D9F36e38e18b5C35CB47b2CAA41D5498"
let web3


async function init(){
    let currentUser = Moralis.User.current();
    console.log(currentUser.attributes.ethAddress)// El addrres devuelve null
    if(!currentUser){
        window.location.pathname = "/index.html" //Se puede usar esta misma logica para los roles
    }
    web3 = await Moralis.enableWeb3();
    if (!chequearRol()){
        console.log("no esta en rol")
        window.location.pathname = "/index.html"
    }
    else {
        console.log("esta en rol")
    }
    let accounts = await web3.eth.getAccounts();
}

async function add(currentUser){
    let address = document.getElementById("address").value
    console.log(address)
    let id = parseInt(document.getElementById("id").value)
    console.log(id)
    const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    const accounts = await web3.eth.getAccounts();
    contract.methods.agregarFinanciera(address, id).send({from: currentUser.attributes.ethAddress})
}

async function chequearRol(currentUserbi){
    
    // const options = {
    //     contractAddress: CONTRACT_ADDRESS,
    //     functionName: "isInRole"
    //     abi: contractAbi,
    //     params: {
    //         _address: currentUser.address,
    //     },
    // }
    //const isInRole = await Moralis.executeFunction(options)
    //console.log(isInRole)
    const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    const isAdmin = await contract.methods.isInRole(currentUser.attributes.ethAddress).call()
    return isInRole
}


document.getElementById("send").onclick = add;

init();
 