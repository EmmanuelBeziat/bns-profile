<template>
  <div class="result">
    <div class="note note--success">
      Now, just save this image (<kbd>right click</kbd> → <kbd>Save</kbd>) in your <kbd>CharacterShot</kbd> folder
    </div>

    <div class="result__container">
      <img class="result__render" :src="image">
    </div>

    <a v-link="{ name: 'home' }">
      <svg v-svg class="icon" sprite="back"></svg>
      <span>Back to home</span>
    </a>
  </div>
</template>

<script>
import Store from 'store'

export default {
  data () {
    return {
      image: Store.get('result')
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

.icon
  top 12px

a
  text-decoration none
  display block
  margin rem(20px) auto
  btn( $color-primary, $color-secondary )
  fill #fff

kbd
  background #fff
  padding 1px 4px
  border #ccc 1px solid
  border-radius .25em

</style>
