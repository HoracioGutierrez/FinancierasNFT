
/** Connect to Moralis server */
const serverUrl = "https://ezdnxz4vljsr.usemoralis.com:2053/server";
const appId = "UBLBJztkt7wqWAiPaHmaTfZs5Kj8CoZs9wNn6erg";
Moralis.start({ serverUrl, appId });

/** Add from here down */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
   try {
      user = await Moralis.authenticate({ signingMessage: "Hello World!" })
      console.log(user)
      console.log(user.get('ethAddress'))
      console.log("Ha iniciado sesion")
      redirect()     
   } catch(error) {
     console.log(error)
   }
  }
}

function redirect(){
  location.href = "./mint.html";
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}


document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;