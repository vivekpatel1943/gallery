let imgArray = [];
const formEl = document.getElementById("img-form");
const imgInputField = document.getElementById("img-input");
const inputButton = document.getElementById("add-image");

// inputButton.addEventListener('click', (event) => {
//     event.preventDefault();
//     renderImages();
// });


const imagesDiv = document.getElementById('save-images');

const localStorageKey = "storagekey-gallery";

/* function renderImages() {
    imagesDiv.innerHTML = null;
    for (const [index, item] of Object.entries(imgArray)) {
        console.log(index, item);
        imgArray.forEach((item) => {
            const img = document.createElement('img');
            img.src = item;
            imagesDiv.appendChild(img);
        })
    }
} */

// convert image file to Base64 and store it in localStorage



function renderImages() {
    imagesDiv.innerHTML = null;
    for (const [idx, item] of Object.entries(imgArray)) {
        // console.log(idx,item);

        const imgContainer = document.createElement('div');
        const images = document.createElement('img');
        images.src = item;
        images.classList.add('btnInactive');
        console.log(images.class);

        /* imgContainer.style.display = 'inline';
        images.style.display = 'inline';
        images.style.marginRight = '10px'; */

        imgContainer.appendChild(images);
        imagesDiv.appendChild(imgContainer);
    }

    imageStyling();

}




function imageToBase64(imageFile, callback) {
    const reader = new FileReader();
    reader.onloadend = function () {
        callback(reader.result);

    }
    reader.readAsDataURL(imageFile);
}

imgInputField.addEventListener('change', function (event) {

    const file = event.target.files[0];

    // convert file to Base64 and store it in localStorage
    imageToBase64(file, (base64Image) => {
        // localStorage.setItem(localStorageKey,base64Image);
        imgArray.push(base64Image);
        // Load and display the image
        /*  const img = document.createElement('img');
        img.src = base64Image; */
        // imagesDiv.appendChild(img);
        // console.log(img.src);
        // console.log(imgArray)
        saveImages();
        renderImages();

    })
    // this won't work as 


})



// saveImages();

function saveImages() {
    localStorage.setItem(localStorageKey, JSON.stringify(imgArray));
}

function deleteNotes(index) {
    imgArray.splice(index, 1);
    saveImages();
    renderImages();
}

function loadNotes() {
    const imagesStored = localStorage.getItem(localStorageKey);
    if (imagesStored) {
        imgArray = JSON.parse(imagesStored);
        // ensure that imgArray is an array
        if (!Array.isArray(imgArray)) {
            imgArray = [];
        }
    } else {
        imgArray = [];
    }
    renderImages();
}

function imageStyling() {
    let imageTags = document.getElementsByTagName('img');
    // console.log(imageTags);
    console.log(imageTags.length);
    for (let i = 0; i < imageTags.length; i++) {
        imageTags[i].addEventListener('click', () => {
            if (imageTags[i].classList.contains('btnInactive')) {
                console.log(imageTags[i]);
                imageTags[i].classList.remove('btnInactive');
                imageTags[i].classList.add('btnActive');
            } else if (imageTags[i].classList.contains('btnActive')) {
                console.log(imageTags[i]);
                imageTags[i].classList.remove('btnActive');
                imageTags[i].classList.add('btnInactive');
            }

        })

        // saveImages();
        // renderImages();

    }


}




document.addEventListener('DOMContentLoaded', loadNotes);
// document.addEventListener('DOMContentLoaded', imageStyling);


