<template>
    <h1>Yo soy : <br> {{ whoAmI }} </h1>
</template>

<script>
import Vue from 'vue';
import { whoAmI } from '../../modules/auth/auth.module';

export default Vue.extend({
  data() {
    return {
      whoAmI: '',
    }
  },
  mounted() {
    whoAmI().then(res => {
      this.whoAmI = res.data;
    });  
  },
})
</script>