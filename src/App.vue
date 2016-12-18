<template>
  <div class="site">
    <header class="site-header">
      <h1><a v-link="{ name: 'home' }"><img src="assets/bns-logo.png" alt="Blade &amp; Soul"></a></h1>
    </header>
    <main class="site-main">
      <router-view transition="fade" transition-mode="out-in"></router-view>
    </main>
    <footer class="site-footer">
      {{{ l_copyright }}}
    </footer>
  </div>
</template>

<script>
import Home from './components/Home'

const userLang = navigator.language || navigator.userLanguage

export default {
  data () {
    return {
      l_copyright: userLang === 'fr'
        ? 'Codé avec <span class="heart">♥</span> par <a href="https://www.emmanuelbeziat.com/">Emmanuel Béziat</a>, alias Kalturio (FR — Hogdonny) — <a href="https://github.com/EmmanuelBeziat/bns-profile">GitHub</a><br><a href="https://github.com/EmmanuelBeziat/bns-profile/issues/new">Rendez-vous sur Github</a> pour rapporter un bug, faire des suggestions, dire merci — Suivez-moi sur <a href="https://twitter.com/EmmanuelBeziat">Twitter</a>'
        : 'Coded with <span class="heart">♥</span> by <a href="https://www.emmanuelbeziat.com/">Emmanuel Béziat</a>, aka. Kalturio (FR — Hogdonny) — <a href="https://github.com/EmmanuelBeziat/bns-profile">GitHub</a><br><a href="https://github.com/EmmanuelBeziat/bns-profile/issues/new">Go on Github</a> to report bugs, make suggestions, say thanks — Follow me on <a href="https://twitter.com/EmmanuelBeziat">Twitter</a>'
    }
  },
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
  margin 0
  font 400 $font-size-base/1.5 $font-stack-common

h1
  margin 0

a
  transition .3 ease-in-out
  text-decoration none
  color $color-primary
  &:hover
    color $color-secondary

kbd
  background #fff
  padding 1px 4px
  border #ccc 1px solid
  border-radius .25em

.text-align-center
  text-align center

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

.site-footer
  padding rem(20px) 0
  text-align center

.heart
  color $color-red

</style>
