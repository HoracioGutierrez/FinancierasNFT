// SPDX-License-Identifier: MIT
<<<<<<< HEAD
pragma solidity >=0.4.25 <=0.8.10;
=======
pragma solidity >=0.4.25 <0.7.0;
>>>>>>> react-front-dev

library ConvertLib{
	function convert(uint amount,uint conversionRate) public pure returns (uint convertedAmount)
	{
		return amount * conversionRate;
	}
}