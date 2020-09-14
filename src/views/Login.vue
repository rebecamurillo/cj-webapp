<template>
<v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4" >
            <v-card class="elevation-12">
              <v-toolbar color="secondary" dark flat>
                <v-toolbar-title>Ingresar al sistema</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Correo electronico"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="loginData.email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Contraseña"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="loginData.password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="accent" v-on:click="sendLogin()">Conexion</v-btn>
                <v-btn color="accent" v-on:click="testToken()">Test token</v-btn>
              </v-card-actions>
              <span style="color:red;"> {{errorMsg}} </span>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import { login, whoAmI } from '../modules/auth/auth.service';
//import config from 'config.js'

export default Vue.extend({
  data () {
    return {
      errorMsg: '',
      loginData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    sendLogin(): any {
      login(this.loginData).then( (res) => {
        if (res.data){
          this.$router.push('/')
        }else if (res.error){
          this.errorMsg = 'Error de conexion.'
        }
      });
    },
    testToken(): any {
      whoAmI().then(res => {
        console.log('THEN');
        console.log(res);
      });  
    }
  },
})
</script>