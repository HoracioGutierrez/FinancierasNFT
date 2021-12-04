import Web3 from 'web3';
import { InjectedConnector } from '@web3-react/injected-connector'


export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  })
