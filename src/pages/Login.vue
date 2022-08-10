<template>
  <section class="login">
    <img src="@/assets/images/logo.png" alt="Logo Float News - Float Academy" />

    <div class="container">
      <div class="title">
        <p>Painel Administrativo</p>
      </div>

      <form class="form">
        <p>Entre com suas credencias</p>

        <div class="box-inputs">
          <input type="email" placeholder="Digite seu e-mail" v-model="email" />
          <input type="password" placeholder="Digite sua Senha" v-model="password" />
        </div>

        <v-alert v-if="alerta !== ''" border="top" color="red lighten-2" dark>
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
        const credentials = {
          email: this.email,
          password: this.password,
        };

        const resposta = await AuthService.login(credentials);

        localStorage.setItem("token", resposta.data.token);

        console.log("mudar para a outra rota!");

      } catch (err) {
        const mensagemErro = err.response.data;
        this.alerta = mensagemErro;
      }
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 60px;
}

.login img {
  width: 260px;
}

.login .container {
  width: 540px;
  margin-top: 30px;
  box-sizing: border-box;
  background: rgba(30, 75, 123, 0.72);
  border: 1px solid #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 47px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login .container .title {
  background: #ffffff;
  border-radius: 7px;
  padding: 6px 12px;
  margin-top: -30px;
}

.login .container .title p {
  padding: 0;
  margin: 0;
  text-align: center;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #1e4b7b;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.login .container .form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login .container .form p {
  margin-top: 30px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
}

.login .container .form .box-inputs {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login .container .form .box-inputs input {
  width: 340px;
  background: #ffffff;
  font-family: "Inter";
  color: #333333;
  border: none;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
}

.login .container .form .btn-login {
  background: #214e7e;
  border-radius: 8px;
  border: none;
  color: #fff;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  padding: 10px 38px;
  cursor: pointer;
  margin-bottom: 45px;
}

.login .container .form .btn-login:hover {
  background-color: #26609e;
}

@media screen and (max-width: 580px) {
  .login .container {
    width: 90%;
  }

  .login .container .form .box-inputs input {
    width: 85%;
  }
}
</style>