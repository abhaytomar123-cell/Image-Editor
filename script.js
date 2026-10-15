let filters = {
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    saturation:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    grayScale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    }
}

const filterContainer = document.querySelector(".filters");
const imageCanvas = document.querySelector("#image-canvas");
const imgInput = document.querySelector("#image-input");
const canvasCTX = imageCanvas.getContext("2d");
let image = null;
const resetBtn = document.querySelector("#reset-btn");
const downloadBtn = document.querySelector("#download-btn");
const presetContainer = document.querySelector(".presets");

function createElements(name,unit,value,min,max){
    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.name = name;

    const p = document.createElement("p");
    p.innerHTML = name;

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input",(event)=>{
        filters[name].value = Number(input.value);
        applyFilter();
    })


    return div;
}

function createFilters(){
    Object.keys(filters).forEach(filter =>{
    const filterElement = createElements(filter,filters[filter].unit,filters[filter].value,filters[filter].min,filters[filter].max);
    filterContainer.appendChild(filterElement);
    })
}

createFilters();


imgInput.addEventListener("change",(event)=>{
    const file = event.target.files[0];
    const imagePlaceholder = document.querySelector(".placeholder");
    imageCanvas.style.display = "block";
    imagePlaceholder.style.display = "none"
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () =>{
        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasCTX.drawImage(img,0,0);
    }

})

function applyFilter(){
    canvasCTX.clearRect(0,0,imageCanvas.width,imageCanvas.height);
    canvasCTX.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayScale.value}${filters.grayScale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})`;

    canvasCTX.drawImage(image,0,0);
}

resetBtn.addEventListener("click",()=>{
    filters = {
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    saturation:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    grayScale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    }
    }
    applyFilter();
    filterContainer.innerHTML = "";
    createFilters();
})

downloadBtn.addEventListener("click",()=>{
    const link = document.createElement("a");
    link.download = "edited-image-png";
    link.href = imageCanvas.toDataURL();
    link.click();
})

const presets = {
    drama:{
        brightness:110,
        contrast:130,
        saturation:120,
        hueRotation:0,
        blur:0,
        grayScale:10,
        sepia:0,
        opacity:100,
        invert:0
    },
     vintage:{
        brightness:90,
        contrast:110,
        saturation:80,
        hueRotation:15,
        blur:0,
        grayScale:28,
        sepia:40,
        opacity:100,
        invert:0
    },
     oldSchool:{
        brightness:95,
        contrast:120,
        saturation:60,
        hueRotation:0,
        blur:0,
        grayScale:50,
        sepia:30,
        opacity:100,
        invert:0
    },
     cyberpunk:{
        brightness:110,
        contrast:140,
        saturation:160,
        hueRotation:290,
        blur:0,
        grayScale:0,
        sepia:0,
        opacity:100,
        invert:0
    },
     softGlow:{
        brightness:120,
        contrast:90,
        saturation:110,
        hueRotation:0,
        blur:2,
        grayScale:0,
        sepia:10,
        opacity:100,
        invert:0
    },
     noir:{
        brightness:80,
        contrast:130,
        saturation:0,
        hueRotation:0,
        blur:0,
        grayScale:100,
        sepia:10,
        opacity:100,
        invert:0
    },
     warmSunser:{
        brightness:105,
        contrast:115,
        saturation:120,
        hueRotation:20,
        blur:0,
        grayScale:0,
        sepia:30,
        opacity:100,
        invert:0
    },
     coolTone:{
        brightness:110,
        contrast:110,
        saturation:90,
        hueRotation:200,
        blur:0,
        grayScale:5,
        sepia:0,
        opacity:100,
        invert:0
    },
     faded:{
        brightness:105,
        contrast:88,
        saturation:78,
        hueRotation:8,
        blur:0,
        grayScale:18,
        sepia:20,
        opacity:100,
        invert:0
    },
     retroPop:{
        brightness:115,
        contrast:130,
        saturation:150,
        hueRotation:45,
        blur:0,
        grayScale:8,
        sepia:0,
        opacity:100,
        invert:0
    }
};

Object.keys(presets).forEach(presetName =>{
    const presetButton = document.createElement("button");
    presetButton.classList.add("btn");
    presetButton.innerHTML = presetName;
    presetContainer.appendChild(presetButton);

    presetButton.addEventListener("click",()=>{
        const preset = presets[presetName];

        Object.keys(preset).forEach(filterName =>{
            filters[filterName].value = preset[filterName];
        })

        filterContainer.innerHTML = "";
        createFilters();
        applyFilter();
    })
})