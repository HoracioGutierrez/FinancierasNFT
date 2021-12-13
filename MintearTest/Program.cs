
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;
using Nethereum.Hex.HexConvertors.Extensions;
using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
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
        }


        static void Main(string[] args)
        {
            DoIt();

        }

        public static async void DoIt()
        {
            //INIT WEB3
            var privateKey = "0x9628316996948cf66bed79e797f9a5737a456ce478777454d2bd9df250c03bc3";
            var account = new Account(privateKey, Nethereum.Signer.Chain.Rinkeby);
            var url = "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
            var web3 = new Web3(account, url);

            //GET CONTRACT
            var contractAddress = "0x565dF65fC3b93C8500bEaB9C98c2A5E1F1Caae44";
            var contractHandler = web3.Eth.GetContractHandler(contractAddress);

            //CALL CONTRACT FUNCTION
            var recipient = "0x87d43F463118cbcaC8Cf9F31f2C824dE02C3AD8E";
            var tokenURI = "QmPM65ATpFBPjegvJUkcZBgjWRGBvpxxw1bUc4QpP1db2N";
            var hashMetadata = HexByteConvertorExtensions.HexToByteArray("0x87d43F463118cbcaC8Cf9F31f2C824dE02C3AD8E");

            var mintNFTFunction = new MintNFTFunction();
            mintNFTFunction.Recipient = recipient;
            mintNFTFunction.TokenURI = tokenURI;
            mintNFTFunction.HashMetadata = hashMetadata;
            var mintNFTFunctionTxnReceipt = contractHandler.SendRequestAndWaitForReceiptAsync(mintNFTFunction).Result;




            var response = JsonConvert.SerializeObject(mintNFTFunctionTxnReceipt);
            Console.WriteLine(response);

            Console.Read();
        }
    }
}
