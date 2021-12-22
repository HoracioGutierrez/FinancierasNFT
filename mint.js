Moralis.serverURL = "https://ezdnxz4vljsr.usemoralis.com:2053/server"
Moralis.initialize("UBLBJztkt7wqWAiPaHmaTfZs5Kj8CoZs9wNn6erg")
const CONTRACT_ADDRESS = "0x96ec78B9D9F36e38e18b5C35CB47b2CAA41D5498"
let web3

async function init(){
    let currentUser = Moralis.User.current();
    console.log(currentUser.attributes.ethAddress)
    web3 = await Moralis.enableWeb3();
    
    if(!currentUser || !await chequearRol(currentUser)){                 
        window.location.pathname = "/index.html"  
    }
    else {
        console.log("esta en rol")
    }
}

async function add(){
    let currentUser = Moralis.User.current(); 
    
    let address = document.getElementById("address").value
    console.log(address)
    let id = parseInt(document.getElementById("id").value)
    console.log(id)

    const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    contract.methods.agregarFinanciera(address, id).send({from: currentUser.attributes.ethAddress}).then(function(receipt){
        console.log(receipt)  // cuando se confirma la transaccion devuelve un json con el numero de trasacc, nro de bloque, gas, etc.
    });
}

async function chequearRol(currentUser){
    const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    const isAdmin = await contract.methods.isInRole(currentUser.attributes.ethAddress).call()
    return isAdmin
}

document.getElementById("send").onclick = add;

init();
