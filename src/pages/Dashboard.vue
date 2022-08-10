<template>
  <section>
    <h1>Dashboard</h1>

    <header-test titulo="titulo da pagina dashboard"></header-test>

    <router-link to="/login">Voltar para Login</router-link>
  </section>
</template>

<script>
import HeaderTest from '../components/HeaderTest.vue';

export default {
  name: "DashboardPage",

  components: { 
    'header-test': HeaderTest 
  },
};
</script>