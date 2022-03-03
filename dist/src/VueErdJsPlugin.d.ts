import _Vue from "vue";
import VueErdJsStore from './VueErdJsStore';
import { VueErdjsConnect } from "./components";
import { ElrondEnvEnum, ProviderOption } from "./providers/config";
declare const vueErdJsStore: VueErdJsStore;
export { vueErdJsStore, ProviderOption, ElrondEnvEnum, VueErdjsConnect };
export default function VueErdJsPlugin(Vue: typeof _Vue, options?: ProviderOption): void;
