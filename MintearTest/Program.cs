
using Ipfs.Http;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;
using Nethereum.Hex.HexConvertors.Extensions;
using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MintearTest
{
    class Program
    {
        public partial class MintNFTFunction : MintNFTFunctionBase { }

        [Function("mintNFT", "bytes32")]
        public class MintNFTFunctionBase : FunctionMessage
        {
            [Parameter("address", "_recipient", 1)]
            public virtual string Recipient { get; set; }
            [Parameter("string", "_tokenURI", 2)]
            public virtual string TokenURI { get; set; }
            [Parameter("bytes32", "_hashMetadata", 3)]
            public virtual byte[] HashMetadata { get; set; }
            [Parameter("tuple", "_metadata", 4)]
            public virtual Metadata Metadata { get; set; }
        }

        public partial class Metadata : MetadataBase { }

        public class MetadataBase
        {
            [Parameter("uint32", "autonumeriId", 1)]
            public virtual uint autonumeriId { get; set; }
            [Parameter("uint32", "loanId", 2)]
            public virtual uint LoanId { get; set; }
            [Parameter("uint32", "numeroDeCliente", 3)]
            public virtual uint NumeroDeCliente { get; set; }
            [Parameter("uint32", "fintechId", 4)]
            public virtual uint FintechId { get; set; }
            [Parameter("string", "fechaDeCreacion", 5)]
            public virtual string FechaDeCreacion { get; set; }
            [Parameter("string", "uriImagen", 6)]
            public virtual string UriImagen { get; set; }
            [Parameter("bytes32", "hashRegistroBase", 7)]
            public virtual byte[] HashRegistroBase { get; set; }
        }
        static void Main(string[] args)
        {

            var tokenURI = "QmW927aJxsV6HiGtcTaY37YDqpEWGTgRjgqgBXMRnzxyb8";

            //PDF TO IPFS
            var pdf = File.ReadAllBytes(@"Files\contrato.pdf");

            var pdfHash = subirIpfs(pdf);

            Console.WriteLine("Pdf Hash: " + pdfHash);

            //

            //MINTEAR
            var metadata = new Metadata
            {
                autonumeriId = 24,
                LoanId = 1,
                NumeroDeCliente = 2,
                HashRegistroBase = HexByteConvertorExtensions.HexToByteArray("0x87d43F463118cbcaC8Cf9F31f2C824dE02C3AD8E"),
                FintechId = 4,
                UriImagen = "hola",
                FechaDeCreacion = "ayer"
            };
            //mintearNft(metadata, tokenURI);

            Console.ReadKey();
        }

        public static string subirIpfs(byte[] archivo)
        {
            MemoryStream stream = new MemoryStream(archivo);

            var ipfs = new IpfsClient(@"https://ipfs.infura.io:5001");

            var result = ipfs.FileSystem.AddAsync(stream).Result;
            
            return result.Id.Hash.ToString();
        }

        public static async void mintearNft(Metadata metadata, string tokenURI)
        {
            //INIT WEB3
            var privateKey = "0x9628316996948cf66bed79e797f9a5737a456ce478777454d2bd9df250c03bc3";
            var account = new Account(privateKey, Nethereum.Signer.Chain.Rinkeby);
            var url = "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
            var web3 = new Web3(account, url);

            //GET CONTRACT
            var contractAddress = "0x8FF940f07ABF6eD210D40C44DA3300D7De9378E2";
            var contractHandler = web3.Eth.GetContractHandler(contractAddress);

            //CALL CONTRACT FUNCTION
            var recipient = "0x87d43F463118cbcaC8Cf9F31f2C824dE02C3AD8E";

            var mintNFTFunction = new MintNFTFunction();
            mintNFTFunction.Recipient = recipient;  //Receptor del NFT
            mintNFTFunction.TokenURI = tokenURI;    // Json del nft 
            mintNFTFunction.Metadata = metadata;    // Metadata publica  
            var mintNFTFunctionTxnReceipt = contractHandler.SendRequestAndWaitForReceiptAsync(mintNFTFunction).Result;

            var response = JsonConvert.SerializeObject(mintNFTFunctionTxnReceipt);
            Console.WriteLine(response);

            Console.Read();
        }
    }
}
