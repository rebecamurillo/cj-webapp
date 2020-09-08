<template>
<v-app id="inspire">

    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Casa Jerusalem</v-toolbar-title>
    </v-app-bar>


    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer color="primary" app>
      <span class="white--text">&copy; {{ 'Casa Jerusalem ' + new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
//import HelloWorld from './components/HelloWorld.vue';
//import Login from './views/Login.vue';
//import Menu from './components/Menu.vue';
//import Home from './views/Home.vue';

export default Vue.extend({
  name: 'App',

  components: {
    //HelloWorld,
    //Login,
//    Menu,
    //Home,
  },

  props: {
  },
  data(){
    return {
        drawer: null,
        links: [
            { icon:'mdi-home',text:'Principal', route:'/home'},
            { icon:'mdi-account',text:'Conectarce', route:'/login'},
            { icon:'mdi-home',text:'Quien soy ?', route:'/about'},
        ]
    }
  }
});
</script>
