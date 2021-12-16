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
    //Mapping from fintech Id to fitech address.
    mapping (uint => address) private fintechIdAddress;
    //Mapping from fintech address to array storing all NFT IDs minted to that account.
    mapping (address => uint[]) private nftsIdsInAddress;
    //Stores id of the fintech added.
    uint [] public fintechId;
    //
    Metadata auxMetadata;

    struct Metadata {
        uint32 autonumericId;
        uint32 loanId;
        uint32 numeroDeCliente;
        uint32 fintechId;
        string fechaDeCreacion;
        string uriImagen;
        bytes32 hashRegistroBase;
    }

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
     * @dev Chequea que el address enviado por parametro sea Admin.
     * En el caso que el address sea admin, retornará true
     * Caso contraro contrario retornará false
     */
    function isInAdminRole(address _address) public view returns (bool){
        if (hasRole(DEFAULT_ADMIN_ROLE, _address)){
            return true;
        }
        return false;
    }

    /**
     * @dev Chequea que el address enviado por parametro sea Minter.
     * En el caso que el address sea admin, retornará true
     * Caso contraro contrario retornará false
     */
    function isInMinterRole(address _address) public view returns (bool){
        if (hasRole(MINTER_ROLE, _address)){
            return true;
        }
        return false;
    }

    /**
     * @dev Chequea que el address enviado por parametro sea Financiera.
     * En el caso que el address sea admin, retornará true
     * Caso contraro contrario retornará false
     */
    function isInFinancieraRole(address _address) public view returns (bool){
        if (hasRole(FINANCIERA_ROLE, _address)){
            return true;
        }
        return false;
    }

    /**
     * @dev Dado un address retorna la cantidad de nfts 
     */
    function getNftsInAddress() public view hasFinancieraRole(msg.sender) returns (uint[] memory){
        return nftsIdsInAddress[msg.sender];
    }

    /**
     * @dev Dado un address se le otorga el rol de minter
     */
    function setMinterRole(address _minterAddress) public hasAdminRole(msg.sender){
        grantRole(MINTER_ROLE,_minterAddress);
    }

    /**
     * @dev Dado un address se le quita el rol de minter
     */
    function removeMinterRole(address _minterAddress) public hasAdminRole(msg.sender) hasMinterRole(_minterAddress){
        revokeRole(MINTER_ROLE,_minterAddress);
    }

    /**
     * @dev Dado un address se le quita el rol de financiera
     */
    function removeFinancieraRole(address _minterAddress) public hasAdminRole(msg.sender) hasAdminRole(_minterAddress){
        revokeRole(FINANCIERA_ROLE,_minterAddress);
    }

    /**
     * @dev Dado un id de financiera se quita el addres de los mappings y del array de ids.
     * burn -> @dev See {ERC721-ERC721}.
     */
    function quitarFinanciera(uint _idFinanciera) public hasAdminRole(msg.sender) hasFinancieraRole(fintechIdAddress[_idFinanciera]){

        uint [] memory arrayNftsFinanciera = nftsIdsInAddress[fintechIdAddress[_idFinanciera]];
        // Borro los nfts 
        for (uint i = 0; i < arrayNftsFinanciera.length; i++){
            _burn(arrayNftsFinanciera[i]);
        }

        delete nftsIdsInAddress[fintechIdAddress[_idFinanciera]];
        removeFinancieraRole(fintechIdAddress[_idFinanciera]);
        delete fintechIdAddress[_idFinanciera];

        for(uint i = 0; i < fintechId.length;i++){
            if (fintechId[i] == _idFinanciera){
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

    /**
     * @dev Retorna el array con las ids de las financieras registradas 
     */
    function getArrayIdsFintech() public view returns(uint[] memory){
        return fintechId;
    }

    /**
     * @dev 
     */
    function devolverPagina(uint numeroDePag, uint tamanioDePagina) public view returns (uint[] memory){
        uint inicioDePagina = numeroDePag * tamanioDePagina;
        uint [] memory arrayDeRetorno = new uint[] (tamanioDePagina);
        uint aux = 0;

        for(uint i = inicioDePagina; (i < inicioDePagina + tamanioDePagina) && (i < (nftsIdsInAddress[msg.sender]).length - 1); i++){
            arrayDeRetorno[aux] = ((nftsIdsInAddress[msg.sender])[i]);
            aux++;
        }

        return arrayDeRetorno;
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
    }

    /**
     *@dev Implementacion de retorno de address por tokenId de financiera
     *El address no debería estar registrado
     *Setea el numero de token de financiera en 1
     */

    function getAddressFinanciera (uint _idFinanciera) public view hasMinterRole(msg.sender) returns(address){
        return fintechIdAddress[_idFinanciera];
    }

    /**
     *@dev Implementacion de comparación de metadata ingresada con la metadata de un token especifico
     *El token debe existir
     *Retorna un booleano en base a la comparación de la metadata
     */
     // Hay que ver como hasheamos y editarla
    function compareMeta(bytes32 _hashMetadata, uint _tokenNft) public view returns(bool){
        if (_hashMetadata == hashMetadataBase[_tokenNft]) {
            return true;
        }
        return false;
    }

    /**
     *@dev Implementacion de retorno de la metadata codificada para un nft especifico
     *El token debe existir, solo puede ejectutar la cuenta dueña del nft
     *Retorna el hash de la metadata asociado al tokenID del nft
     */

    function getHashMetadataBase(uint _tokenNft) public view nftInAddress(_tokenNft) returns(bytes32){
        return hashMetadataBase[_tokenNft];
    }

    /**
     * @dev See {IERC721-transferFrom}.
     */
    function transferNft(address _to, uint _nftId) public hasFinancieraRole(msg.sender) {

        //Mapping from fintech address to array storing all NFT IDs minted to that account.
        //mapping (address => uint[]) private nftsIdsInAddress;
        
        transferFrom(msg.sender, _to, _nftId);

        uint [] memory arrayNftsFinanciera = nftsIdsInAddress[msg.sender];

        for(uint i = 0; i < arrayNftsFinanciera.length; i++){
            if (arrayNftsFinanciera[i] == _nftId){
                uint aux = arrayNftsFinanciera[arrayNftsFinanciera.length-1];
                arrayNftsFinanciera[i] = aux;
                fintechId.pop();
                //Preguntar si se lo pasa a otra financiera            
                break;
            }
        }
        
    }


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
     returns (bytes32){
        
        tokenId += 1;
        structMetadata[tokenId] = _metadata;
        nftsIdsInAddress[_recipient].push(tokenId);
        hashMetadataBase[tokenId] = _metadata.hashRegistroBase;

        _mint(_recipient, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        return   hashMetadataBase[tokenId];
    }
}
