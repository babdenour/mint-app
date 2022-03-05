import MaiarAppStrategy from './maiar-app/MaiarAppStrategy';
import LedgerStrategy from './ledger/LedgerStrategy';
import WebWalletStrategy from './web/WebWalletStrategy';
import { Address, ProxyProvider, ApiProvider, Transaction } from "@elrondnetwork/erdjs";
import providersOptions, { ProviderOption } from "./config";
import IProviderStrategyEventHandler from "./IProviderStrategyEventHandler";
import IProviderStrategy from "./IProviderStrategy";
import DefiWallet from "./defi/DefiWalletStrategy";
declare class Providers implements IProviderStrategyEventHandler {
    currentStrategy?: IProviderStrategy;
    private onLogin;
    private onLogout;
    private onTransaction;
    private _maiarApp;
    private _ledger;
    private _webWallet;
    private _defiWallet;
    private initialised;
    private _proxy;
    private _api;
    constructor(proxy: ProxyProvider, api: ApiProvider, options: ProviderOption, onLogin: Function, onLogout: Function, onTransaction: Function);
    init(): Promise<void>;
    onUrl(url: Location): void;
    get currentProvider(): import("@elrondnetwork/erdjs").IDappProvider | undefined;
    get currentProviderName(): string | undefined;
    get ledger(): LedgerStrategy;
    get maiarApp(): MaiarAppStrategy;
    get webWallet(): WebWalletStrategy;
    get defiWallet(): DefiWallet;
    get proxy(): ProxyProvider;
    get api(): ApiProvider;
    logout(): void;
    sendAndWatch(transaction: Transaction): Promise<import("@elrondnetwork/erdjs/out/transactionOnNetwork").TransactionOnNetwork>;
    signAndSend(transaction: Transaction): Promise<Transaction>;
    transactionResult(transaction: Transaction, delay?: number): Promise<import("@elrondnetwork/erdjs/out/transactionOnNetwork").TransactionOnNetwork>;
    handleLoginStart(provider: IProviderStrategy): void;
    handleLogin(provider: IProviderStrategy, address: Address, token?: string): void;
    handleLoginError(provider: IProviderStrategy, err: Error): void;
    handleLogout(provider: IProviderStrategy): void;
    handleTransaction(transaction: {
        status: string;
        txHash: string;
    }): void;
}
export { providersOptions };
export default Providers;