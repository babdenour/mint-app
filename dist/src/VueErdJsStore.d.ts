import Vue from 'vue';
declare class VueErdJsStore {
    state: Vue;
    constructor();
    get logged(): boolean;
    get walletAddress(): any;
    get token(): any;
    $emit(event: string, ...args: any[]): Vue;
    $on(event: string | string[], callback: Function): Vue;
    $once(event: string | string[], callback: Function): Vue;
    $off(event?: string | string[], callback?: Function): Vue;
}
export default VueErdJsStore;
