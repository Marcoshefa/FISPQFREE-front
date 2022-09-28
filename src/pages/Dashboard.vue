<template>
  <section>
    <v-navigation-drawer
      app
      :mini-variant.sync="mini"
      dark
        src="/images/navigator-drawer.jpg">
      <v-list>
        <v-list-item v-for="([icon, text, path], i) in items"
          :key="i"
          link :to="path">
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  <v-app-bar app>
    <v-app-bar-nav-icon @click.stop="mini = !mini"></v-app-bar-nav-icon>

    <v-toolbar-title>Dashboard</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click="logout()">
      <v-icon>exit_to_app</v-icon>
    </v-btn>

  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>

    <!-- Provides the application the proper gutter -->
    <v-container fluid>

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>
  </section>
</template>

<script>

export default {
  name: "DashboardPage",
  
  data: () => ({
      mini: true,
      items: [
        ['description', 'FISPQ', '/dash/fispq'],
        ['groups', 'Usuários', '/dash/user'],
        ['person', 'Meu perfil', '/dash/profile'],
      ],
    }),

  components: { },

  mounted() {
    // verifica-se se não tiver o token o usuário será direcionado para a tela de login
    if (!localStorage.getItem("fispq-free-token")) {
      this.logout();
    }
  },

  methods: {
    // metodo logout() remove o token e retorna para a tela de login
    logout() {
      localStorage.removeItem("fispq-free-token");
      this.$router.push({path: '/login'});
    }
  }

};
</script>