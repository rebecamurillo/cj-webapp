<template>
  <div class="about">
    <form>
      <label for="email">Email:</label><br>
      <input id="email" required="required" placeholder="Correo electronico" type="text" name="email">
      <br><br>
      <label for="password">Contrasena</label>
      <br>
      <input id="email" required="required" placeholder="Contrasena" name="password" type="password">
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>