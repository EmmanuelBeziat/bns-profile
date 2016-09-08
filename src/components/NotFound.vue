<template>
  <div class="not-found">
    <h1>Oups, it’s broken!</h1>

    <p>You should <a v-link="{ name: 'home' }">go back to home</a>.</p>
  </div>
</template>

<script>
export default {
  data () {
    return { }
  }
}
</script>

<style lang="stylus" scoped>
.not-found
  text-align center
</style>
