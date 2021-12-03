// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MyNFT is ERC721URIStorage, AccessControl {

    uint tokenId;

    //Retorna el hash con la metadata, recibe el token de NFT
    mapping (uint => bytes32) private metadata;
    //Retorna address de la financiera, recibe el Id de la financiera
    mapping (uint => address) private fintechIdAddress;
    //Retorna un array con los ids de los nfts de la cuenta ingresada
    mapping (address => uint[]) private nftsIdsInAddress;
    //Array con los ids de las finteches ingresadas
    uint [] public fintechId;

    //Se inicializan los roles en forma de hash, a estos luego se les asignan addresses
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
     *@dev Implementacion de chequeo de NFT
     *El address debería contener el token ingresado por parametro
     *Caso contrario de retorno del mapping, el address no contiene el token ingresado.
     *NOTE: ownerOf: @dev See {IERC721-ownerOf}.
     */

    modifier nftInAddress (uint _tokenNft){
       require(ownerOf(_tokenNft) == msg.sender, "El address no es el duenio del token");
       _;
    }
    
    /**
     * 
     */
    modifier hasAdminRole(address _adminAddress){
       require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Esta cuenta no tiene permisos de admin");
        _;
    }

    /**
     * 
     */
    modifier hasMinterRole(address _minterAddress){
        require(hasRole(MINTER_ROLE, msg.sender), "Esta cuenta no tiene permisos de minter");
        _;
    }

    /**
     * 
     */
    modifier hasFinancieraRole(address _financieraAddress){
        require(hasRole(FINANCIERA_ROLE, _financieraAddress), "Esta cuenta no tiene permisos de financiera");
        _;
    }

    /**
     * 
     */
    function getNftsInAddress() public view hasFinancieraRole(msg.sender) returns (uint[] memory){
        return nftsIdsInAddress[msg.sender];
    }

    /**
     * 
     */
    function setMinterRole(address _minterAddress) public hasAdminRole(msg.sender){
        grantRole(MINTER_ROLE,_minterAddress);
    }

    /**
     * 
     */
    function removeMinterRole(address _minterAddress) public hasAdminRole(msg.sender) hasMinterRole(_minterAddress){
        revokeRole(MINTER_ROLE,_minterAddress);
    }

    /**
     * 
     */
    function removeFinancieraRole(address _minterAddress) public hasAdminRole(msg.sender) hasAdminRole(_minterAddress){
        revokeRole(FINANCIERA_ROLE,_minterAddress);
    }

    /**
     * 
     */
    function quitarFinanciera(uint _idFinanciera) public hasAdminRole(msg.sender) hasFinancieraRole(fintechIdAddress[_idFinanciera]){

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
        // Faltaria quemar los tokens
    }
    
    function getArray() public view returns(uint[] memory){
        return fintechId;
    }

    /**
     * 
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

    function getAddressFinanciera (uint _idFinanciera) public view returns(address){
        require(hasRole(MINTER_ROLE, msg.sender), "Esta cuenta no tiene permiso");
        return fintechIdAddress[_idFinanciera];
    }

    /**
     *@dev Implementacion de comparación de metadata ingresada con la metadata de un token especifico
     *El token debe existir
     *Retorna un booleano en base a la comparación de la metadata
     */
     
    function compareMeta(string memory _metadata, uint _tokenNft) public view returns(bool){
        bytes32 hashedMeta = keccak256(abi.encodePacked(_metadata));
        if (hashedMeta == metadata[_tokenNft]) {
            return true;
        }
        return false;
    }

    /**
     *@dev Implementacion de retorno de la metadata codificada para un nft especifico
     *El token debe existir, solo puede ejectutar la cuenta dueña del nft
     *Retorna el hash de la metadata asociado al tokenID del nft
     */

    function getMetadata(uint _tokenNft) public view nftInAddress(_tokenNft) returns(bytes32){
        return metadata[_tokenNft];
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

    function mintNFT(address _recipient, string memory _tokenURI, string memory _jsonMeta) public hasMinterRole(msg.sender)
     returns (bytes32){

        tokenId += 1;
        metadata[tokenId] = keccak256(abi.encodePacked(_jsonMeta));
        nftsIdsInAddress[_recipient].push(tokenId);

        _mint(_recipient, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        return   metadata[tokenId];
    }
}
