// Selecting necessary DOM elements
const blogTitleField = document.querySelector('.title');// Input field for blog title
const articleFeild = document.querySelector('.article');// Text area for article content

// banner
const bannerImage = document.querySelector('#banner-upload');// Input for banner image
const banner = document.querySelector(".banner");// Container for the banner
let bannerPath;// Variable to store the uploaded banner image path

const publishBtn = document.querySelector('.publish-btn');// Button to publish the blog
const uploadInput = document.querySelector('#image-upload'); // Input for uploading images
// Event listener for changing the banner image
bannerImage.addEventListener('change', () => {
    uploadImage(bannerImage, "banner");// Function call to upload the banner image
})

// Event listener for changing the uploaded image
uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image");// Function call to upload an image within the article
})

// Function to upload images
const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;// Get the uploaded file
    if(file && file.type.includes("image")){// Check if the file is an image
        const formdata = new FormData();// Create form data
        formdata.append('image', file);// Append the image data to the form

        fetch('/upload', {// Send the image data to the server for upload
            method: 'post',
            body: formdata
        }).then(res => res.json())
        .then(data => {
            if(uploadType == "image"){
                addImage(data, file.name);// Add the uploaded image to the article
            } else{
                bannerPath = `${location.origin}/${data}`;// Store the banner image path
                banner.style.backgroundImage = `url("${bannerPath}")`;// Set the banner image
            }
        })
    } else{
        alert("upload Image only");// Alert the user if the uploaded file is not an image
    }
}
// =========================================================
// Function to add an image to the article
const addImage = (imagepath, alt) => {
    let curPos = articleFeild.selectionStart;// Get the current cursor position in the article field
    let textToInsert = `\r![${alt}](${imagepath})\r`;// Create markdown for the image
    articleFeild.value = articleFeild.value.slice(0, curPos) + textToInsert + articleFeild.value.slice(curPos);// Insert the image markdown at the cursor position
}

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// ==============================================================
publishBtn.addEventListener('click', () => {
    if(articleFeild.value.length && blogTitleField.value.length){// Check if both title and article content are present
        // generating id
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split(" ").join("-");
        let id = '';
        for(let i = 0; i < 4; i++){
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        // setting up docName
        let docName = `${blogTitle}-${id}`;
        let date = new Date(); // Get the current date for 'publishedAt' information

        // Access Firestore and add a new document with blog details
        db.collection("blogs").doc(docName).set({
            title: blogTitleField.value,
            article: articleFeild.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`// Format the published date
        })
        .then(() => {
            location.href = `/${docName}`;// Redirect to the newly created blog post
        })
        .catch((err) => {
            console.error(err);// Log any errors during the process
        })
    }
})