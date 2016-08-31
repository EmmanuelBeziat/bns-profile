<template>
  <div class="app">
    <h2>Stuck? Read the <a v-link="{ name: 'help' }">detailled howto</a> !</h2>
    <form class="form">
      <div class="group">
        <label for="imagevalid">Select a valid Blade &amp; Soul Character Shot</label>
        <input type="file" id="imagevalid" required>
      </div>

      <div class="group">
        <label for="imagecustom">Select your modified image</label>
        <input type="file" id="imagecustom" required>
      </div>

      <div class="group submit">
        <button type="submit">
          <svg v-svg sprite="send"></svg>
          <span>Convert now</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="stylus">
@import '../assets/main.styl'

.group
  margin-bottom rem(10px)
  padding rem(10px)
  border 1px solid rgba(0,0,0,.1)

.submit
  border 0
  text-align center

label
  display block
  margin-bottom rem(5px)

button
  border 0
  background none
  color $color-background
  size rem(64px)
  border-radius 50%
  cursor pointer
  outline 0
  transition .3s ease-in-out
  backface-visibility hidden
  position relative
  text-align center
  fill $color-background

  span
    position absolute
    left 50%
    bottom 0
    word-wrap none
    display inline-block
    text-align center
    color $color-text
    transition .3s ease-in-out
    opacity 0
    transform translate(-50%, 90%) scale(.5)
    z-index -1
    text-transform lowercase
    font-size 1.25em
    white-space nowrap

  svg
    size 60%
    position relative
    top 3px
    left -2px

  &::before
    content ""
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    border-radius inherit
    z-index -1
    box-shadow inset 0 0 0 35px $color-primary
    transform scale3d(.9, .9, 1)
    transition .3s ease-in-out

  &:hover
    color $color-primary
    fill $color-primary

    span
      opacity 1
      transform translate(-50%, 110%) scale(1)

    &::before
      box-shadow inset 0 0 0 2px $color-primary
      transform scale3d(1, 1, 1)

</style>
