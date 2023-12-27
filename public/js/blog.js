// Extract the blog ID from the URL path
let blogId = decodeURI(location.pathname.split("/").pop());
// Reference the specific blog post in the database
let docRef = db.collection("blogs").doc(blogId);
// Retrieve the blog post data and handle its display or redirection
docRef.get().then((doc) => {
  if (doc.exists) {
    // If the blog post exists, format and display it
    setupBlog(doc.data());
  } else {
    // If the blog post doesn't exist, redirect to the homepage
    location.replace("/");
  }
});
//================================================================
// Function to format and display the retrieved blog post
const setupBlog = (data) => {
  const banner = document.querySelector(".banner"); // Banner image container
  const blogTitle = document.querySelector(".title"); // Blog title container
  const titleTag = document.querySelector("title"); // HTML title tag
  const publish = document.querySelector(".published"); // Published date container
  // Set the banner image and blog details
  banner.style.backgroundImage = `url(${data.bannerImage})`; // Set the banner image
  titleTag.innerHTML += blogTitle.innerHTML = data.title; // Set blog title
  publish.innerHTML += data.publishedAt; // Set published date
  // Select the article container and add the article content
  const article = document.querySelector(".article"); // Article content container
  addArticle(article, data.article); // Add formatted article content
};

// Function to format and add article content to the HTML element
const addArticle = (ele, data) => {
  // Split the article content by newlines and filter empty items
  data = data.split("\n").filter((item) => item.length);
  // console.log(data);
  // Process each line of the article content
  data.forEach((item) => {
    // check for heading
    if (item[0] == "#") {
      let hCount = 0;
      let i = 0;
      while (item[i] == "#") {
        hCount++;
        i++;
      }
      let tag = `h${hCount}`;
      ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`;
    }
    //checking for image format
    else if (item[0] == "!" && item[1] == "[") {
      let seperator;

      for (let i = 0; i <= item.length; i++) {
        if (
          item[i] == "]" &&
          item[i + 1] == "(" &&
          item[item.length - 1] == ")"
        ) {
          seperator = i;
        }
      }

      let alt = item.slice(2, seperator);
      let src = item.slice(seperator + 2, item.length - 1);
      ele.innerHTML += `
            <img src="${src}" alt="${alt}" class="article-image">
            `;
    } else {
      ele.innerHTML += `<p>${item}</p>`;
    }
  });
};
