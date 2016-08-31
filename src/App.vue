<template>
  <div class="site">
    <main class="site-main">
      <router-view transition="fade" transition-mode="out-in"></router-view>
    </main>
  </div>
</template>

<script>
import Home from './components/Home'

export default {
  components: {
    Home
  }
}
</script>

<style lang="stylus">
@import 'assets/main.styl'

body
  margin 0
  font 400 $font-size-base/1.5 $font-stack-common

.site
  display flex
  align-content stretch
  min-height $size-viewport-height
  max-width $size-content
  margin auto

.site-main
  flex 1

</style>
