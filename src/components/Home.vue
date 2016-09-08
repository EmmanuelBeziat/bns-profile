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

    <h3 class="text-align-center">Stuck? <a v-link="{ name: 'help' }">Read the help page</a>!</h3>
  </div>
</template>

<script>
import Store from 'store'
import dragDrop from 'components/DragDrop'
import md5 from '../app/worker/md5.js'
import rc4 from '../app/worker/rc4.js'
import piexif from '../app/worker/piexif.js'
import bytes from '../app/worker/bytesConverter.js'

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

      readerValid.onloadend = (event) => {
        // Get exif data from valid image
        const exif = piexif.load(event.target.result)
        const readerCustom = new FileReader()

        readerCustom.onloadend = (event) => {
          // Do some validation of custom image
          let image = new Image()
          image.onload = function () {
            // Maybe we should use dimensions from valid image? Too much code...
            if (image.naturalWidth !== validImageWidth || image.naturalHeight !== validImageHeight) {
              alert('Your custom image size is ' + image.naturalWidth + '×' + image.naturalHeight + ', expected ' + validImageWidth + '×' + validImageHeight)
              return
            }

            // Remove exif data from custom image (if present)
            let result
            try {
              result = piexif.remove(event.target.result)
            } catch (err) {
              result = event.target.result
            }

            // Update checksum2 xml field to match custom image
            exif['Exif'][700] = that.UpdateChecksum(result, exif['Exif'][700])

            // Insert new exif data
            result = piexif.insert(piexif.dump(exif), result)

            // Store the result
            Store.set('result', result)

            // Open the new page to show result
            that.$router.go({name: 'render'})
          }
          image.src = event.target.result
        }
        readerCustom.readAsDataURL(imageCustom)
      }
      readerValid.readAsDataURL(imageValid)
    },

    UpdateChecksum: function (pic, data) {
      let string = ''
      for (let i = 0; i < data.length; ++i) {
        string += String.fromCharCode(data[i])
      }

      // Get raw bytes from picture
      pic = atob(pic.replace(/data:image\/jpeg;base64,/, ''))

      // Find start of image header
      for (let i = 0; i + 1 < pic.length; ++i) {
        if (pic.charCodeAt(i) === 0xFF && pic.charCodeAt(i + 1) === 0xDB) {
          pic = pic.slice(i, pic.length)
          break
        }
      }

      // Locate checksum2 in data
      const regexp = new RegExp('(<checksum2>[0-9a-f]{32}</checksum2>)')
      const match = regexp.exec(string)

      // Recalculate checksum2 with new image
      string = string.replace(match[1], '<checksum2>' + bytes.bytesToHex(rc4.encrypt('bns_gamepic', bytes.hexToBytes(md5(pic)))) + '</checksum2>')

      for (let i = 0; i < data.length; ++i) {
        data[i] = string.charCodeAt(i)
      }

      return data
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
