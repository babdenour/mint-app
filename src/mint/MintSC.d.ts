import { Address } from "@elrondnetwork/erdjs";
import { BigNumber } from "bignumber.js";
import Providers from "../../src/providers/Providers";
declare class MintSC {
  private readonly smartContractAddress;
  private _provider;
  constructor(provider: Providers);
  sendF(wallet: Address, amount: BigNumber): Promise<import("@elrondnetwork/erdjs/out/transactionOnNetwork").TransactionOnNetwork>;
  didUserSend(wallet: Address): Promise<any>;
  dateToReceived(wallet: Address): Promise<import("@elrondnetwork/erdjs").QueryResponse>;
  mintAmount(): Promise<any>;
}
export default MintSC;
