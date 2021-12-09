import { useNativeBalance } from "react-moralis";
import Moralis from "moralis";

function NativeBalance() {
  const { getBalance, data: balance, nativeToken, error, isLoading } = useNativeBalance({ chain : "goerli" });

  const balanceNoFormat = Moralis.Units.FromWei(balance.balance, 18)
  const balanceFormateado = String(balanceNoFormat).slice(0, 5)
  return <div id="frmtBalance">{balanceFormateado} ETH</div>;
}

export default NativeBalance;