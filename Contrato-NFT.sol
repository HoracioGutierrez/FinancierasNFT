// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MyNFT is ERC721URIStorage, AccessControl {

    uint tokenId;


    //Mapping from token NFT ID to metadata struct.
    mapping (uint => Metadata) public structMetadata;
    //Mapping from token NFT ID to metadata hash.
    mapping (uint => bytes32) private hashMetadataBase;
    //Mapping from fintech address to array storing all metadata hash of all NFT Id.
    mapping (address => bytes32[]) private hashVecMetadataBaseInAddress;
    //Mapping from fintech Id to fitech address.
    mapping (uint => address) private fintechIdAddress;
    //Mapping from fintech address to array storing all NFT IDs minted to that account.
    mapping (address => uint[]) private nftsIdsInAddress;
    //Stores id of the fintech added.
    uint [] public fintechId;
    //Stores the address of the minter added.
    Minter [] public mintersAddress;

    struct Metadata {
        uint32 loanId;
        uint32 numeroDeCliente;
        uint32 fintechId;
        string fechaDeCreacion;
        string uriImagen;
        bytes32 hashRegistroBase;
    }

    struct Minter {
        address minterAddress;
        string description;
    }

    //Eventos
    /*************************************************************************************************************************************/

    //Push/Agrego
    //Pop/Quito
    event eventMinter(address indexed _minterAdress, string _description, string _operation);

    //Push/Agrego
    //Pop/Quito
    event eventFintech(address indexed _address, string _operation);

    event eventNft(address indexed _address, string _operation);


    /*************************************************************************************************************************************/





    //Constructor
    /*************************************************************************************************************************************/
    //Se inicializan los roles en forma de hash, a estos luego se les asignan addresses
    //Initialiazing roles
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant FINANCIERA_ROLE = keccak256("FINANCIERA_ROLE");

    constructor (string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);    //Funcion heredada de AccessControl que setea como admin a la cuenta que deploya
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /*************************************************************************************************************************************/





    //Modifiers & verifications
    /*************************************************************************************************************************************/


    /**
     *@dev Validates ownership of NTF
     *Sender address should own the NFT assosiate to the token Id passed as argument.
     *Caso contrario de retorno del mapping, el address no contiene el token ingresado.
     *NOTE: ownerOf: @dev See {IERC721-ownerOf}.
     */

    modifier nftInAddress (uint _tokenNft){
       require(ownerOf(_tokenNft) == msg.sender, "This address does not posses this NFT");
       _;
    }
    
    /**
     *@dev Validates admin role.
     *
     *En caso de que no contenga los permisos se cortará la ejecución y se notificará al usuario
     */
    modifier hasAdminRole(address _adminAddress){
       require(hasRole(DEFAULT_ADMIN_ROLE, _adminAddress), "Esta cuenta no tiene permisos de admin");
        _;
    }

    /**
     *@dev Implementacion de chequeo de NFT
     *Chequea si el address es minter o no. 
     *En caso de que no contenga los permisos se cortará la ejecución y se notificará al usuario
     */
    modifier hasMinterRole(address _minterAddress){
        require(hasRole(MINTER_ROLE, _minterAddress), "Esta cuenta no tiene permisos de minter");
        _;
    }

    /**
     *@dev Implementacion de chequeo de NFT
     *Chequea si el address es financiera o no. 
     *En caso de que no contenga los permisos se cortará la ejecución y se notificará al usuario
     */
    modifier hasFinancieraRole(address _financieraAddress){
        require(hasRole(FINANCIERA_ROLE, _financieraAddress), "Esta cuenta no tiene permisos de financiera");
        _;
    }

    /**
     * @dev Chequea que el address enviado por parametro pertenezca al rol enviado.
     * En el caso que el address pretenezca al rol, retornará true
     * Caso contraro contrario retornará false
     */
    function isInRole(string memory _role, address _address) public view returns (bool){
        bytes32 role = keccak256(abi.encodePacked(_role));
        if (hasRole(role, _address)){
            return true;
        }
        return false;
    }


    /*************************************************************************************************************************************/





    //Setters
    /*************************************************************************************************************************************/


    /**
     * @dev Dado un address se le otorga el rol de minter
     */
    function setMinterRole(address _minterAddress, string memory _description) public hasAdminRole(msg.sender){
        require(!hasRole(MINTER_ROLE, _minterAddress), "El Minter ya esta registrado");
        grantRole(MINTER_ROLE,_minterAddress);

        Minter memory auxMinter;
        auxMinter.minterAddress = _minterAddress;
        auxMinter.description = _description;
        mintersAddress.push(auxMinter);
        emit eventMinter(_minterAddress, _description, "Push new Minter");
    }

    /**
     *@dev Implementacion de agregado de permisos a address de financiera
     *El address no debería estar registrado
     *Setea el numero de token de financiera en 1
     */

    function agregarFinanciera (address _address, uint16 _fintechId) public hasAdminRole(msg.sender){
        require(!hasRole(FINANCIERA_ROLE, _address), "La financiera ya esta registrada"); 
        fintechIdAddress[_fintechId] = _address;
        grantRole(FINANCIERA_ROLE, _address);
        fintechId.push(_fintechId);
        emit eventFintech(_address,"Push new Fintech");
    }


    /*************************************************************************************************************************************/





    //Removers
    /*************************************************************************************************************************************/

    /**
     * @dev Dado un address se le quita el rol de minter
     */
    function removeMinterRole(address _minterAddress) public hasAdminRole(msg.sender) hasMinterRole(_minterAddress){
        revokeRole(MINTER_ROLE,_minterAddress);

        if(mintersAddress.length == 1){
            emit eventMinter(mintersAddress[0].minterAddress, mintersAddress[0].description, "Pop Minter");
            mintersAddress.pop();
            return;
        }


        for(uint i = 0; i < mintersAddress.length;i++){
            if (mintersAddress[i].minterAddress == _minterAddress){
                emit eventMinter(mintersAddress[i].minterAddress, mintersAddress[i].description, "Pop Minter");
                Minter memory auxMinter = mintersAddress[mintersAddress.length-1];
                mintersAddress[i] = auxMinter;
                mintersAddress.pop();
                break;
            }
        }

    }

    /**
     * @dev Dado un address se le quita el rol de financiera
     */
    function removeFinancieraRole(address _minterAddress) public hasAdminRole(msg.sender){
        revokeRole(FINANCIERA_ROLE,_minterAddress);
    }

    /**
     * @dev Dado un id de financiera se quita el addres de los mappings y del array de ids.
     * burn -> @dev See {ERC721-ERC721}.
     */
    function removeFinanciera(uint _idFinanciera) public hasAdminRole(msg.sender) hasFinancieraRole(fintechIdAddress[_idFinanciera]){

        uint [] memory arrayNftsFinanciera = nftsIdsInAddress[fintechIdAddress[_idFinanciera]];
        address addressFinanciera = getAddressFinanciera(_idFinanciera); 
        // Borro los nfts 
        for (uint i = 0; i < arrayNftsFinanciera.length; i++){
            delete structMetadata[arrayNftsFinanciera[i]];
            delete hashMetadataBase[arrayNftsFinanciera[i]];
            _burn(arrayNftsFinanciera[i]);
        }
        
        delete hashVecMetadataBaseInAddress[fintechIdAddress[_idFinanciera]];
        delete nftsIdsInAddress[fintechIdAddress[_idFinanciera]];
        removeFinancieraRole(fintechIdAddress[_idFinanciera]);
        delete fintechIdAddress[_idFinanciera];

        


        if(fintechId.length == 1){
            emit eventFintech(addressFinanciera, "Pop Fintech");
            fintechId.pop();
            return;
        }

        for(uint i = 0; i < fintechId.length;i++){
            if (fintechId[i] == _idFinanciera){
                emit eventFintech(addressFinanciera, "Pop Fintech");
                uint aux = fintechId[fintechId.length-1];
                fintechId[i] = aux;
                fintechId.pop();
                break;
            }
        }
    }

    /**
     * @dev See {ERC721-ERC721}.
     */
    function quemarNft(uint _idNft) public hasAdminRole(msg.sender){
        _burn(_idNft);

    }

    /*************************************************************************************************************************************/
    




    //Getters
    /*************************************************************************************************************************************/

    /**
     * @dev Retorna el array con las ids de las financieras registradas 
     */
    function getArrayIdsFintech() public view returns(uint[] memory){
        return fintechId;
    }
    
    /**
     * @dev Dado un address retorna la cantidad de nfts 
     */
    function getNftsInAddress(address _address) public view hasFinancieraRole(_address) returns (uint[] memory){
        return nftsIdsInAddress[_address];
    }

    /**
     *@dev Implementacion de retorno de address por tokenId de financiera
     *El address no debería estar registrado
     *Setea el numero de token de financiera en 1
     */

    function getAddressFinanciera (uint _idFinanciera) public view returns(address){
        return fintechIdAddress[_idFinanciera];
    }

    /**
     *@dev Implementacion de retorno de la metadata codificada para un nft especifico
     *El token debe existir, solo puede ejectutar la cuenta dueña del nft
     *Retorna el hash de la metadata asociado al tokenID del nft
     */

    function getHashMetadataHashBase(uint _tokenNft) public view nftInAddress(_tokenNft) returns(bytes32){
        return hashMetadataBase[_tokenNft];
    }

    /**
     *@dev Implementacion de retorno de la metadata codificada para todo el array de nfts de la direccion
     *El token debe existir, solo puede ejectutar la cuenta dueña del nft
     *Retorna el hash de la metadata asociado a los tokenID del vector de nfts
     */

    function getVecHashMetadataBaseInAddress(address _address) public view returns(bytes32[] memory){
        return hashVecMetadataBaseInAddress[_address];
    }

    /**
     * @dev Retorna el array con los addres de los minters
     */
    function getVecMintersAddress() public view returns(Minter[] memory){
        return mintersAddress;
    }

    /*************************************************************************************************************************************/




    
    //Transfer
    /*************************************************************************************************************************************/

    /**
     * @dev See {IERC721-transferFrom}.
     */
    function transferNft(address _to, uint _nftId) public hasFinancieraRole(msg.sender) {

        //Mapping from fintech address to array storing all NFT IDs minted to that account.
        //mapping (address => uint[]) private nftsIdsInAddress;
        
        transferFrom(msg.sender, _to, _nftId);

        nftsIdsInAddress[_to].push(_nftId);

        uint [] memory arrayNftsFinanciera = nftsIdsInAddress[msg.sender];

        for(uint i = 0; i < arrayNftsFinanciera.length; i++){
            if (arrayNftsFinanciera[i] == _nftId){
                uint aux = arrayNftsFinanciera[arrayNftsFinanciera.length-1];
                arrayNftsFinanciera[i] = aux;
                nftsIdsInAddress[msg.sender].pop();      //Chequear si al transferir funciona
                emit eventNft(_to, "Transfer Nft");
                break;
            }
        }
        
    }

    /*************************************************************************************************************************************/






    //Mint
    /*************************************************************************************************************************************/

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */

    function _baseURI() internal view override virtual returns (string memory) {
        return "https://ipfs.io/ipfs/";
     }

    /**
     * @dev See {ERC721/ERC721-_mint}.
     * NOTE: Se agrega al mapeo del tokenid la metadata ingresada previamente
     */

    function mintNFT(address _recipient, string memory _tokenURI, Metadata memory _metadata) public hasMinterRole(msg.sender)
                                                                                                    hasFinancieraRole(_recipient) 
     returns (bytes32){
        


        tokenId += 1;
        structMetadata[tokenId] = _metadata;
        nftsIdsInAddress[_recipient].push(tokenId);
        hashMetadataBase[tokenId] = _metadata.hashRegistroBase;
        hashVecMetadataBaseInAddress[_recipient].push(_metadata.hashRegistroBase);

        _mint(_recipient, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        emit eventNft(_recipient, "Mint Nft");

        return   hashMetadataBase[tokenId];
    }

    /*************************************************************************************************************************************/
}
