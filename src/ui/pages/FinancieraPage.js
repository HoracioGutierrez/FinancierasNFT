import { useNFTBalances } from "react-moralis"

const FinancieraPage = () => {

    const {data,getNFTBalances} = useNFTBalances()

    return (
        <div>
            Financiera page
            <button onClick={()=>getNFTBalances()}>balances</button>
            {data.result.map(res=>{
                return <p key={res.token_address}>{res.token_address}</p>
            })}
        </div>
    )
}

export default FinancieraPage
