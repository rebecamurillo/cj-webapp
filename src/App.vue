<template>
<v-app id="inspire">

    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-group v-if="link.sublinks" no-action value="true" >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </template>

            <v-list-item v-for="sublink in link.sublinks" :key="sublink.text" router :to="sublink.route">
              <v-list-item-title> {{ sublink.text }}</v-list-item-title>
              <v-list-item-icon>
                <v-icon >{{ sublink.icon }}</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>

          <template v-else>
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </template>
        </v-list-item>
      </v-list>

      <span> -- </span> <br>
      <span style="cursor: pointer;" v-on:click="logout()"><v-icon>{{logoutData.icon}}</v-icon>{{logoutData.text}}</span>
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
import { logout } from './modules/auth/auth.module';

export default Vue.extend({
  name: 'App',

  components: {
  },

  props: {
  },
  data(){
    return {
        drawer: null,
        logoutData: {icon:'',text:''},
        links: [
            { icon:'mdi-home',text:'Principal', route:'/home'},
            { icon:'mdi-account',text:'Conectarce', route:'/login'},
            { icon:'mdi-account',text:'Productos', sublinks:[{
              icon:'mdi-pencil',text:'Clasificacion',route: '/edit-classification'
            }] },
            { icon:'mdi-home',text:'Quien soy ?', route:'/about'},
        ]
    }
  },
  methods: {
    logout() {
      logout();
      this.logoutData.icon='';
      this.logoutData.text='';
    },
  },
  mounted() {
    const token = localStorage.getItem('user-token');
    if (token) {
      this.logoutData.icon='mdi-logout';
      this.logoutData.text='Desconectarce';
    }
  }
});
</script>
