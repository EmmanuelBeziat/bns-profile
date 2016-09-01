<template>
  <div class="dropzone" droppable="true" drag-over="handleDragOver" @dragenter="hovering = true" @dragleave="hovering = false" :class="{'hovered': hovering}">

    <div class="dropzone__title">
      Drop image here or click to select
    </div>
    <input class="dropzone__input" type="file" required @change="onFileChange">

    <div class="dropzone__preview">
      <img class="dropzone__render" :src="image" alt="">
      <button class="dropzone__remove" @click="removeImage" v-if="image">
        <svg v-svg class="icon" sprite="trash"></svg>
        <span>Remove this image</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      image: '',
      hovering: false
    }
  },

  methods: {

    /**
     * When a file is loaded in the input
     * @param  {event} event [description]
     * @return {[type]}       [description]
     */
    onFileChange: function (event) {
      const files = event.target.files || event.dataTransfer.files
      let image = null

      if (!files.length) {
        return
      }

      this.createImage(files[0])
    },

    /**
     * Preview image updated
     * @param  {object} file [description]
     */
    createImage: function (file) {
      const reader = new FileReader()
      const that = this

      reader.onload = (event) => {
        that.image = event.target.result
      }

      reader.readAsDataURL(file)
    },

    /**
     * Remove image from the preview
     */
    removeImage: function (event) {
      this.image = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/main.styl'

.dropzone
  position relative
  border 2px dashed $color-dragdrop
  min-height rem(240px)
  border-radius .25em
  transition .3s ease-in-out
  flex 1

  &.hovered
    background $color-background

  &:hover
    border-color $color-primary

    .dropzone__title
      color $color-primary

.dropzone__title
  display block
  margin-bottom rem(5px)
  transition .3s ease-in-out
  line-height 1.25
  text-align center
  position absolute
  left 0
  right 0
  top 50%
  transform translate(0, -50%)
  color darken($color-dragdrop, 25%)
  padding rem(10px)

.dropzone__input
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  opacity 0
  cursor pointer

.dropzone__preview
  position relative
  padding rem(10px)

.dropzone__render
  vertical-align top
  border-radius .25em
  max-width 100%

.dropzone__remove
  btn($color-grey, $color-background)
  position absolute
  background $color-dragdrop
  top 50%
  left 50%
  transform translate(-50%, -50%)
  span
    color $color-background
    text-shadow 0 -2px 0 $color-text, 0 2px 0 $color-text, -2px 0 0 $color-text, 2px 0 0 $color-text, 2px 2px 0 $color-text, -2px -2px 0 $color-text, 2px -2px 0 $color-text, -2px 2px 0 $color-text, 0 0 5px $color-text

</style>
