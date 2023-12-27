// Selecting the DOM element representing the section where blogs will be displayed
const blogSection = document.querySelector('.blogs-section');
// Fetching blogs from the Firestore database
db.collection("blogs").get().then((blogs) => {
     // Iterating through each blog retrieved from the database
    blogs.forEach(blog => {
         // Checking if the current blog is not the one being viewed
        if(blog.id != decodeURI(location.pathname.split("/").pop())){
            createBlog(blog);// Creating a blog card for the retrieved blog
        }
    })
})

const createBlog = (blog) => {
    let data = blog.data();// Extracting data from the blog document
    // Generating HTML for the blog card and appending it to the blogs section
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${blog.id}" class="btn dark">read</a>
    </div>
    `;
}