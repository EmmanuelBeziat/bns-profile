<template>
  <div class="site">
    <header class="site-header">
      <a v-link="{ name: 'home' }"><img src="assets/bns-logo.png" alt="Blade &amp; Soul"></a>
    </header>
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

font-face( 'Source Sans Pro', 'assets/fonts/source-sans-pro/sourcesanspro-light', 200, normal, formats: local woff2 woff, local-font-name: 'Source Sans Pro Light' )
font-face( 'Source Sans Pro', 'assets/fonts/source-sans-pro/sourcesanspro-lightit', 200, italic, formats: local woff2 woff, local-font-name: 'Source Sans Pro Light' )
font-face( 'Source Sans Pro', 'assets/fonts/source-sans-pro/sourcesanspro-regular', 400, normal, formats: local woff2 woff, local-font-name: 'Source Sans Pro Regular' )
font-face( 'Source Sans Pro', 'assets/fonts/source-sans-pro/sourcesanspro-it', 400, italic, formats: local woff2 woff, local-font-name: 'Source Sans Pro Regular' )
font-face( 'Source Sans Pro', 'assets/fonts/source-sans-pro/sourcesanspro-semibold', 600, normal, formats: local woff2 woff, local-font-name: 'Source Sans Pro Semibold' )
font-face( 'Source Sans Pro', 'assets/fonts/source-sans-pro/sourcesanspro-semiboldit', 600, italic, formats: local woff2 woff, local-font-name: 'Source Sans Pro Semibold' )

*
*::before
*::after
  box-sizing inherit

html
  box-sizing border-box
  overflow-y scroll

body
  margin 0 0 rem(40px)
  font 400 $font-size-base/1.5 $font-stack-common

.site
  display flex
  flex-direction column
  align-content stretch
  min-height $size-viewport-height
  max-width $size-content
  margin auto

.site-main
  flex 1

.site-header
  text-align center
  padding rem(10px)

</style>
