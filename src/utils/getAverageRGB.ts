export interface RGB {
  r: number;
  g: number;
  b: number;
}

const getAverageRGB = (imgEl: HTMLImageElement): RGB => {
  imgEl.crossOrigin = '';
  let blockSize: number = 5, // only visit every 5 pixels
    defaultRGB: RGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
    canvas: HTMLCanvasElement = document.createElement('canvas'),
    context: CanvasRenderingContext2D | null =
      canvas.getContext && canvas.getContext('2d'),
    data: ImageData,
    width: number,
    height: number,
    i: number = -4,
    length: number,
    rgb: RGB = { r: 0, g: 0, b: 0 },
    count: number = 0;

  if (!context) {
    return defaultRGB;
  }

  height = canvas.height =
    imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

  context.drawImage(imgEl, 0, 0);

  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    /* security error, img on diff domain */
    return defaultRGB;
  }

  length = data.data.length;

  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  return rgb;
};

export default getAverageRGB;
