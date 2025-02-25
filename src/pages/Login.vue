<template>
  <section class="fundo">
    <img id="tela" src="@/assets/images/tela.png" alt="Tela login" />
    
    <div class="login">
      <!-- <img id="background_title" src="@/assets/images/f_title.png" alt="backgroud_title" /> -->
      <p>FISPQ FREE</p>
    </div>

    <div class="container">
      <form class="form">
      <!-- <img src="@/assets/images/logoFF.png" alt="Tela login" /> -->

        <div class="box-inputs">
          <input type="email" placeholder="Digite seu e-mail" v-model="email" />
          <input type="password" placeholder="Digite sua Senha" v-model="password" @keyup.enter="logar"/>
        </div>

        <v-alert v-if="alerta !== ''" border="top" min-width="300px" class="text-center" color="red lighten-2" dark>
          {{ alerta }}
        </v-alert>

        <button class="btn-login" type="button" @click="logar()">ENTRAR</button>
      </form>
    </div>
  </section>
</template>

<script>
import AuthService from "../services/Auth";

export default {
  name: "Login",



  data() {
    return {
      email: "",
      password: "",
      alerta: ""
    };
  },

  mounted() {},

  methods: {
    async logar() {
      try {
        this.alert = '';

        const credentials = {
          email: this.email,
          password: this.password,
        };

        const resposta = await AuthService.login(credentials);
        // const resposta = await UserService.login(credentials);
        localStorage.setItem("token-fispq", resposta.data.token);
        localStorage.setItem("fispq-free_id", resposta.data.user_id);
        
        this.$router.push({path: '/dash/fispq'});

      } catch (err) {
        const mensagemErro = err && err.response && err.response.data ? err.response.data : "Erro ao logar!";
        this.alerta = mensagemErro;
      }
    },
  },
};
</script>

<style scoped>

.fundo img#tela {
  width: 100vw;
  height: 100vh;

}

.fundo {
  /* background: url("../assets/images/tela.png"); */
  display: flex;
  align-items: center;
  flex-direction: column;
  /* margin-top: -540px; */
}

/* .fundo .container .form img#logo{
  width: 200px;
}

.fundo .login img#background_title{
    width: 700px;
    margin-top: 50px;
    margin-left: 60px;
    
} */

.fundo .container {
  box-sizing: border-box;
  width: 575px;
  background: rgba(30, 75, 123, 0.82);
  border: 1px solid #0B0274;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid #ffffff;
  border-radius: 68px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -450px;
  padding-top: 15px;
  /* margin-bottom: 150px; */
}

.fundo .login p {
    /* width: 847px; */
    /* height: 169px;    */
    font-family: 'Jacques Francois', serif;
    font-style: normal;
    font-weight: 400;
    font-size: 130px;
    line-height: 169px;
    color: #3fd444;
    text-shadow: 10px 20px 12px #0f0b0b;
    margin-top: -830px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.fundo .container .form {
    width: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
}

.fundo .container .form .box-inputs {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.fundo .container .form .box-inputs input {
    width: 356px;
    background: #FFFFFF;
    font-family: 'Inter';
    font-size: 20px;
    color: #333333;
    border: none;
    margin-top: 5px;
    margin-bottom: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
}

.fundo .container .form .btn-login {
    background: #C4C4C4;
    border: none;
    color: #0E09F8;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 48px;
    padding: 5px 28px;
    cursor: pointer;
    margin-bottom: 45px;
}

.fundo .container .form .btn-login:hover {
    background-color: #97B753;
}

@media screen and (max-width: 580px) {
  .login .container {
    width: 90%;
  }

  .fundo .container .form .box-inputs input {
    width: 85%;
  }
}
</style>