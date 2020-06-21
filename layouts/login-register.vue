<template>
  <v-app>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <SnackBar/>
  </v-app>
</template>

<script>
import SnackBar from '../components/SnackBar.vue';
export default {
  components: {
    SnackBar
  }
}
</script>