import _Vue from "vue";
import { Transaction, Address, ApiProvider, NetworkConfig, ProxyProvider } from "@elrondnetwork/erdjs";
import Providers from "./providers/Providers";
import VueErdJsStore from './VueErdJsStore';
import Components, { VueErdjsConnect } from "./components";
import providerConfig, { ElrondEnvEnum, ProviderOption } from "./providers/config";
import VueErdJs from "./VueErdJs";

const vueErdJsStore = new VueErdJsStore();
export { vueErdJsStore, ProviderOption, ElrondEnvEnum, VueErdjsConnect }
export default function VueErdJsPlugin(Vue: typeof _Vue, options?: ProviderOption) {
  if (!options) {
    options = providerConfig(ElrondEnvEnum.DEVNET);
  }
  const erdApi = new ApiProvider(options.api.url, { timeout: options.api.timeout });
  const erdProxy = new ProxyProvider(options.proxy.url, { timeout: options.proxy.timeout });

  NetworkConfig.getDefault().sync(erdProxy);
  const providers = new Providers(erdProxy, erdApi, options,
    (address: Address, token?: string) => {
      vueErdJsStore.state.$data.walletAddress = address;
      if (token) {
        vueErdJsStore.state.$data.token = token;
      }
    },
    () => {
      vueErdJsStore.state.$data.walletAddress = null;
      vueErdJsStore.state.$data.token = null;
    },
    (transaction: Transaction) => {
      vueErdJsStore.$emit('transaction', transaction);
    });

  const vueErdJs = new VueErdJs(providers, vueErdJsStore, options.explorer.url);

  Vue.prototype.$erd = vueErdJs;
  Vue.mixin({
    beforeCreate() {
      vueErdJs.providers.init();
    },
    beforeMount() {
      vueErdJs.providers.onUrl(window.location);
    }
  })

  for (const component of Components) {
    Vue.component(component.name, component)
  }
}
