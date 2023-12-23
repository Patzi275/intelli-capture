
/**
 * Crops an image based on the specified area and parameters.
 * @param {string | Array} image - The image URL or an array of image URLs.
 * @param {Object} area - The area to be cropped, specified as {x, y, w, h}.
 * @param {number} dpr - The device pixel ratio.
 * @param {boolean} preserve - Indicates whether to preserve the aspect ratio when resizing.
 * @param {string} format - The format of the cropped image (e.g., 'jpeg', 'png').
 * @param {Function} done - The callback function to be called when the cropping is done, with the cropped image as the argument.
 */
function crop (image, area, dpr, preserve, format, done) {
  var top = area.y * dpr
  var left = area.x * dpr
  var width = area.w * dpr
  var height = area.h * dpr
  var w = (dpr !== 1 && preserve) ? width : area.w
  var h = (dpr !== 1 && preserve) ? height : area.h

  var canvas = null
  var template = null
  if (!canvas) {
    template = document.createElement('template')
    canvas = document.createElement('canvas')
    document.body.appendChild(template)
    template.appendChild(canvas)
  }
  canvas.width = w
  canvas.height = h

  if (image instanceof Array) {
    ;(function loop (index, done) {
      if (image.length === index) {
        done()
        return
      }
      var img = new Image()
      img.onload = () => {
        var context = canvas.getContext('2d')
        context.drawImage(img,
          left, top,
          width, height,
          0, image[index].offset,
          w, h
        )
        loop(++index, done)
      }
      img.src = image[index].image
    })(0, () => {
      var cropped = canvas.toDataURL(`image/${format}`)
      done(cropped)
    })
  }
  else {
    var img = new Image()
    img.onload = () => {
      var context = canvas.getContext('2d')
      context.drawImage(img,
        left, top,
        width, height,
        0, 0,
        w, h
      )
      var cropped = canvas.toDataURL(`image/${format}`)
      done(cropped)
    }
    img.src = image
  }
}
