<template>
    <h1>Yo soy : <br> {{ whoAmI }} </h1>
</template>

<script>
import Vue from 'vue';
import { whoAmI } from '../modules/auth/auth.module';

export default Vue.extend({
  data() {
    return {
      posts: [],
      errors: [],
      whoAmI: '',
    }
  },

  created() {
    //whoAmI() {
    whoAmI().then((resp) => {
      console.log('THEN response');
      console.log(resp);
      this.whoAmI= resp;
    }); 
    console.log('CREATED this.whoAmI');
    console.log(this.whoAmI);
  },
  mounted() {
    console.log('MOUNTED this.whoAmI');
    console.log(this.whoAmI);
  },
})
</script>