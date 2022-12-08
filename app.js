const express = require("express")
const request = require("postman-request")
const ejs = require("ejs");

const homeStartingContent = "Welcome to my blog! Feel free to write me about what's on your mind.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const posts = []

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//____________ HOME, ABOUT, CONTACT, BLOG ____________
app.get('/', (req, res) => {
  res.render('home', {
    homeContent: homeStartingContent,
    posts: posts
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    aboutContent: aboutContent
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    contactContent: contactContent
  });
});

app.get('/posts', (req, res) => {
  res.render('posts', {
    posts:posts
  });
});

//____________ POST RES REQ ____________

app.post('/', (req, res) => {
  res.render('compose');
});

app.post('/compose', (req, res) => {
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody,
  };
  posts.push(post);
  res.redirect('/');
});

//____________ DYNAMIC ROUTES ____________

app.get('/posts/:postID', (req, res) => {

  posts.forEach((i) => {
    const reqPostTitle = req.params.postID
    const storedPostTitle = i.title
    const storedPostBody = i.body

    if (reqPostTitle.toLowerCase().split(" ").join("-") === i.title.toLowerCase().split(" ").join("-")) {
      res.render('post', {
        title: storedPostTitle,
        body: storedPostBody
      });
    }
  });
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
