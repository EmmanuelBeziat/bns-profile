<template>
  <div class="result">
    <div class="note note--success">
      {{{ l_save }}}
    </div>

    <div class="result__container">
      <a class="result__link" :href="image" :download="filename"><img class="result__render" :src="image"></a>
    </div>

    <a class="back-link" v-link="{ name: 'home' }">
      <svg v-svg class="icon" sprite="back"></svg>
      <span>{{ l_backHome }}</span>
    </a>
  </div>
</template>

<script>
import Store from 'store'
import Moment from 'Moment'

const userLang = navigator.language || navigator.userLanguage

export default {
  data () {
    return {
      image: Store.get('result'),
      filename: 'bns-profile_' + Moment().format('YYYY-MM-DD_hh-mm') + '.jpg',
      l_save: userLang === 'fr' ? 'Maintenant, cliquez juste sur l’image (clic <strong>gauche</strong>) et enregistrez-la dans votre dossier <kbd>CharacterShot</kbd>' : 'Now, just (<strong>left</Strong>) click on this image and save it in your <kbd>CharacterShot</kbd> folder',
      l_backHome: userLang === 'fr' ? 'Retour à l’accueil' : 'Back to home'
    }
  },

  beforeCompile () {
    /**
     * Redirect if no image is storred
     */
    if (Store.get('result') === undefined) {
      this.$route.go('home')
    }
  },

  ready () {
    /**
     * Clear up the storage as it's not needed anymore
     */
    Store.clear()
  }
}
</script>

<style scoped lang="stylus">
@import '../assets/main.styl'

.result
  text-align center
  max-width ($size-content / 2)
  margin auto

.result__container
  border 2px dashed $color-dragdrop
  min-height rem(240px)
  border-radius .25em
  transition .3s ease-in-out
  margin-bottom rem(10px)
  padding rem(10px)

.result__render
  vertical-align top
  border-radius .25em
  max-width 100%

.result__link
  display block

.icon
  top 12px

.back-link
  text-decoration none
  display block
  margin rem(20px) auto
  btn( $color-primary, $color-secondary )
  fill #fff

</style>
