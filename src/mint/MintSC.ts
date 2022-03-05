import { BooleanType, BigUIntType, BinaryCodec, AddressValue, SmartContract, IDappProvider, IProvider, Address, Balance, ContractFunction, GasLimit, TransactionPayload, Account, Transaction } from "@elrondnetwork/erdjs";
import { BigNumber } from "bignumber.js";
import Providers from "../../src/providers/Providers";


const Codec = new BinaryCodec();
const gasLimite = 18000000;
const scAddress = "erd1qqqqqqqqqqqqqpgqrx0c82m2pfxxw6pv7n337xz4cupqunvaxfzqmp6wgj";

class MintSC {
  private readonly smartContractAddress: any = scAddress
  private _provider: Providers;
  constructor(provider: Providers) {
    this._provider = provider;
  }

  async sendF(wallet: Address, amount: BigNumber) {
    let account = new Account(wallet);
    await account.sync(this._provider.proxy);

    const payload = TransactionPayload.contractCall()
      .setFunction(new ContractFunction("mint@01"))
      .setArgs([])
      .build();

    const transaction = new Transaction({
      sender: wallet,
      receiver: new Address(this.smartContractAddress),
      gasLimit: new GasLimit(gasLimite),
      value: Balance.egld(amount),
      data: payload,
    });
    transaction.setNonce(account.nonce);
    return this._provider.sendAndWatch(transaction);
  }

  async didUserSend(wallet: Address) {
    let contract = new SmartContract({ address: new Address(this.smartContractAddress) });
    let result = await contract.runQuery(this._provider.proxy, {
      func: new ContractFunction("didUserSend"),
      args: [new AddressValue(wallet)]
    });
    let decoded = Codec.decodeTopLevel(new Buffer(result.outputUntyped()[0]), new BooleanType());
    console.log("didUserSend", decoded.valueOf())
    return decoded.valueOf();
  }

  async dateToReceived(wallet: Address) {
    let contract = new SmartContract({ address: new Address(this.smartContractAddress) });
    let result = await contract.runQuery(this._provider.proxy, {
      func: new ContractFunction("getTimeToReceived"),
      args: [new AddressValue(wallet)]
    });
    console.log("dateReceived", result.returnData)
    return result;
  }

  async sendAmount() {
    let contract = new SmartContract({ address: new Address(this.smartContractAddress) });
    let result = await contract.runQuery(this._provider.proxy, {
      func: new ContractFunction("getSendAmount"),
      args: []
    });
    let decoded = Codec.decodeTopLevel(new Buffer(result.outputUntyped()[0]), new BigUIntType());
    console.log("getSendAmount", decoded.valueOf())
    return decoded.valueOf();
  }
}

export default MintSC;
