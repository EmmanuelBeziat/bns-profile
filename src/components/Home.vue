<template>
  <div class="app">
    <form class="form" @submit.prevent="onSubmit">

      <div class="images">
        <div class="form__group">
          <h3 class="form__title">Select a valid Blade &amp; Soul Character Shot</h3>
          <drag-drop id="imagevalid"></drag-drop>
        </div>

        <div class="form__group">
          <h3 class="form__title">Select your custom image (378×620px)</h3>
          <drag-drop id="imagecustom"></drag-drop>
        </div>
      </div>

      <div class="form__group form__group--submit">
        <button type="submit" class="form__submit">
          <svg v-svg class="icon" sprite="send"></svg>
          <span>Convert now</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import dragDrop from 'components/DragDrop'

import MD5 from 'blueimp-md5'
import RC4 from 'rc4'
import piexif from 'piexifjs'

export default {
  data () {
    return { }
  },

  components: {
    dragDrop
  },

  methods: {
    onSubmit: function (event) {
      const that = this
      const form = event.target
      const imageValid = document.querySelector('#imagevalid input[type="file"]').files[0]
      const imageCustom = document.querySelector('#imagecustom input[type="file"]').files[0]
      const readerValid = new FileReader()

      const validImageWidth = 378
      const validImageHeight = 620

      if (imageValid) {
        let image = new Image()
        image.src = window.URL.createObjectURL(imageValid)

        image.onload = (event) => {
          if (image.naturalWidth !== validImageWidth || image.naturalHeight !== validImageHeight) {
            const exif = piexif.load(event.target.result)

            console.log(exif)
          }
        }
      }
      // Valid image: get exif
    }
  }
}
</script>

<style scoped lang="stylus">
@import '../assets/main.styl'

.images
  display flex
  flex-flow row wrap
  align-items stretch
  justify-content space-between

.form__group
  margin-bottom rem(10px)
  padding rem(10px)
  flex 0 0 50%
  display flex
  flex-direction column

.form__group--submit
  text-align center
  flex 1
  display block

.form__title
  text-align center

.form__submit
  btn($color-primary, $color-background)
  .icon
    top 3px
    left -2px
</style>
