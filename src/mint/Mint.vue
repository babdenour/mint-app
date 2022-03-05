<template>
  <div>
    <h1>Mint the private Sale {{ sendEgldPrice }}</h1>
    <div class="mint__error">{{ error ? error : ' ' }}</div>
    <div class="mint">
      <button @click.prevent="sendF()">Mint!</button>
      <p>Note: MAX 6 per wallet address.</p>
    </div>
  </div>
</template>

<script>
import MintSC from './MintSC'
import { Balance } from "@elrondnetwork/erdjs";

export default {
  name: 'Mint',
  data() {
    return {
      qrcode: null,
      deepLink: null,
      error: null,
      mint: null,
      mintAmount: 0.5,
      hasSend: false
    }
  },
  created() {
    this.$erd.$on('transaction', (transaction) => {
      console.log("transaction", transaction);
      const trans = transaction[0];
      if (!trans.status.isSuccessful()) {
        this.error = `Transaction failed : ${trans.getSmartContractResults().getImmediate().getReturnMessage()}`;
      }
    })
  },
  mounted() {
    this.mint = new MintSC(this.$erd.providers, this.$erdProxy);
    this.mint.mintAmount().then((amount) => {
      this.mintAmount = amount;
    });
    this.mint.didUserSend(this.$erd.walletAddress).then((hasSend) => {
      this.hasSend = hasSend;
    })
  },
  computed: {
    sendEgldPrice() {
      if (this.mintAmount) {
        let amount = Balance.egld(this.mintAmount.valueOf());
        let denominated = amount.valueOf().shiftedBy(-amount.token.decimals).toFixed(2);
        return `${denominated} ${amount.token.getTokenIdentifier()}`;
      }
      return '- EGLD';
    }
  },
  methods: {
    async sendF() {
      this.mint.dateToReceived(this.$erd.walletAddress);
      try {
        await this.mint.sendF(this.$erd.walletAddress, this.mintAmount);
      } catch (error) {
        console("fail")
      }
    },
  },
}
</script>
