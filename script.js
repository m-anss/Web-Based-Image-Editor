let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  hueRotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  grayScale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};

const filtersContainer = document.querySelector(".filters");
const reset = document.querySelector("#reset");
const download = document.querySelector("#download");
const presetContainer = document.querySelector(".presets");

function createFilterElement(name, unit = "%", value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  const p = document.createElement("p");
  p.innerText = name;

  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener("input", (evt) => {
    filters[name].value = evt.target.value;
    applyFilters();
  });

  return div;
}
function createFilters() {
  Object.keys(filters).forEach((key) => {
    const filterElement = createFilterElement(
      key,
      filters[key].unit,
      filters[key].value,
      filters[key].min,
      filters[key].max,
    );

    filterElement.classList.add("fontStyle");
    filtersContainer.appendChild(filterElement);
  });
}
createFilters();

const imgCanvas = document.querySelector("#image-canvas");
const imgInput = document.querySelector("#image-input");
const canvasCtx = imgCanvas.getContext("2d");
imgCanvas.style.display = "none";
let file = null;
let image = null;

function applyFilters() {
  canvasCtx.clearRect(0, 0, imgCanvas.width, imgCanvas.height);

  if (!image) {
    return;
  }

  canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayScale.value}${filters.grayScale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    `;
  canvasCtx.drawImage(image, 0, 0);
}
imgInput.addEventListener("change", function (evt) {
  file = evt.target.files[0];
  const imgPlaceHolder = document.querySelector(".placeholder");
  imgPlaceHolder.style.display = "none";

  image = new Image();
  image.src = URL.createObjectURL(file);

  image.onload = () => {
    imgCanvas.width = image.width;
    imgCanvas.height = image.height;
    imgCanvas.style.display = "block";
    applyFilters();
  };
});

reset.addEventListener("click", function () {
  filters = {
    brightness: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    contrast: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    saturation: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    hueRotation: {
      value: 0,
      min: 0,
      max: 360,
      unit: "deg",
    },
    blur: {
      value: 0,
      min: 0,
      max: 20,
      unit: "px",
    },
    grayScale: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    sepia: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    opacity: {
      value: 100,
      min: 0,
      max: 100,
      unit: "%",
    },
    invert: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
  };
  applyFilters();

  filtersContainer.innerHTML = "";
  createFilters();
});

download.addEventListener("click", function () {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = imgCanvas.toDataURL();
  link.click();
});

let presets = {
  original: {
    brightness: "100%",
    contrast: "100%",
    saturation: "100%",
    hueRotate: "0deg",
    blur: "0px",
    grayscale: "0%",
    sepia: "0%",
    opacity: "100%",
  },

  drama: {
    brightness: "90%",
    contrast: "145%",
    saturation: "85%",
    hueRotate: "0deg",
    blur: "0px",
    grayscale: "0%",
    sepia: "0%",
    opacity: "100%",
  },

  vintage: {
    brightness: "95%",
    contrast: "110%",
    saturation: "80%",
    hueRotate: "0deg",
    blur: "0px",
    grayscale: "0%",
    sepia: "45%",
    opacity: "100%",
  },

  cinematic: {
    brightness: "92%",
    contrast: "135%",
    saturation: "90%",
    hueRotate: "-5deg",
    blur: "0px",
    grayscale: "0%",
    sepia: "8%",
    opacity: "100%",
  },

  warm: {
    brightness: "105%",
    contrast: "105%",
    saturation: "115%",
    hueRotate: "-10deg",
    blur: "0px",
    grayscale: "0%",
    sepia: "15%",
    opacity: "100%",
  },

  cool: {
    brightness: "100%",
    contrast: "110%",
    saturation: "90%",
    hueRotate: "15deg",
    blur: "0px",
    grayscale: "0%",
    sepia: "0%",
    opacity: "100%",
  },

  noir: {
    brightness: "90%",
    contrast: "135%",
    saturation: "0%",
    hueRotate: "0deg",
    blur: "0px",
    grayscale: "100%",
    sepia: "0%",
    opacity: "100%",
  },

  vivid: {
    brightness: "105%",
    contrast: "120%",
    saturation: "155%",
    hueRotate: "0deg",
    blur: "0px",
    grayscale: "0%",
    sepia: "0%",
    opacity: "100%",
  },

  moody: {
    brightness: "82%",
    contrast: "130%",
    saturation: "75%",
    hueRotate: "-5deg",
    blur: "0px",
    grayscale: "0%",
    sepia: "5%",
    opacity: "100%",
  },

  golden: {
    brightness: "108%",
    contrast: "112%",
    saturation: "125%",
    hueRotate: "-12deg",
    blur: "0px",
    grayscale: "0%",
    sepia: "18%",
    opacity: "100%",
  },

  arctic: {
    brightness: "105%",
    contrast: "115%",
    saturation: "85%",
    hueRotate: "25deg",
    blur: "0px",
    grayscale: "0%",
    sepia: "0%",
    opacity: "100%",
  },

  pastel: {
    brightness: "115%",
    contrast: "80%",
    saturation: "75%",
    hueRotate: "5deg",
    blur: "0px",
    grayscale: "0%",
    sepia: "8%",
    opacity: "100%",
  },
};

Object.keys(presets).forEach((presetName) => {
  const presetButton = document.createElement("button");
  presetButton.classList.add("presetbtn");
  presetButton.innerText = presetName;
  presetContainer.appendChild(presetButton);

  presetButton.addEventListener("click", () => {
    const preset = presets[presetName];

    Object.keys(preset).forEach((filterName) => {
      const filterKey =
        filterName === "hueRotate"
          ? "hueRotation"
          : filterName === "grayscale"
            ? "grayScale"
            : filterName;

      filters[filterKey].value = parseFloat(preset[filterName]);
      document.querySelector(`#${filterKey}`).value = filters[filterKey].value;
    });

    applyFilters();
  });
});
