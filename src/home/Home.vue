<template>
  <div>
    <div class="main">
      <div>
        <h1>
          Welcome to the
          <span>BONA PARKS</span> private mint.
        </h1>
        <h3 style="margin-top: 5vh;">An entire experience that takes you to another Multiverse</h3>
      </div>

      <div class="content">
        <router-link
          v-if="!$erd.walletAddress"
          class="btn"
          active-class="menu__items-link--active"
          to="/authenticate"
        >
          LogIn
          <span>for private sale</span>
        </router-link>
        <router-link
          v-if="$erd.walletAddress"
          class="btn"
          active-class="menu__items-link--active"
          to="/authenticate"
        >Mint now</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.main {
  display: flex;
  height: 70vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  align-content: center;
  flex-wrap: nowrap;
}

.btn {
  font-size: 1.5rem;
  border-radius: 1rem;
  padding: 1rem 1rem;
  background: #d02561;
  cursor: pointer;
  transition: all 0.5s;
  color: white;
  text-decoration: none;

  &:hover {
    background: white;
    color: #d02561;
  }
}
</style>

<script>
export default {
  name: "Home",

  data() {
    return {
      qrcode: null,
      deepLink: null,
    };
  },
};
</script>
