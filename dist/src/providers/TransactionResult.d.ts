import { TransactionHash, IProvider, ApiProvider } from "@elrondnetwork/erdjs";
import { TransactionOnNetwork } from "@elrondnetwork/erdjs/out/transactionOnNetwork";
declare class TransactionResult {
    private _hash;
    private _proxy;
    private _api;
    private _delay;
    constructor(hash: TransactionHash, proxy: IProvider, api: ApiProvider, delay?: number);
    watch(): Promise<TransactionOnNetwork>;
}
export default TransactionResult;
