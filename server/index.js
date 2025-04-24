import express from 'express';
import snoowrap from 'snoowrap';
import dotenv from 'dotenv';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// Create an instance of express
const app = express();
const PORT = process.env.PORT || "8888";

// set path to /views folder
app.set("views", path.join(__dirname, "views"));
// set pug as the express app's template engine
app.set("view engine", "pug"); 

// use "public" folder for static files 
app.use(express.static(path.join(__dirname, "public")));

// use both urlencoded & json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// ----------------------------------------------------------------

// Create a snoowrap client
const reddit = new snoowrap({
  userAgent: 'MyRedditApp/1.0', 
  clientId: process.env.YOUR_CLIENT_ID, 
  clientSecret: process.env.YOUR_CLIENT_SECRET, 
  username: process.env.YOUR_REDDIT_USERNAME, 
  password: process.env.YOUR_REDDIT_PASSWORD 
});

// ----------------------------------------------------------------

// Define a route to fetch and display Reddit posts
app.get('/', async (req, res) => {
  try {
    // Fetch the top 5 posts from the "javascript" subreddit
    const redditPosts = await reddit.getSubreddit('AskReddit').getHot({ limit: 5 });
    res.render("index", { posts: redditPosts })
  } catch (error) {
    // Handle errors
    res.status(500).send(`Error fetching Reddit posts: ${error.message}`);
  }
});


// app.get('/', async (req, res) => {
//   try {
    
//   } catch (error) {
//     console.error("Full error object:", error);
//     res.status(500).send(`Error fetching Reddit posts: ${error.message}`);
//   }
// });


app.get('/comments', async (req, res) => {
  try {
    console.log("Starting Reddit API request");
    
    // Search for the specific post
    const subreddit = reddit.getSubreddit('AskReddit');
    const searchResults = await subreddit.search({
      query: "What's something you secretly judge people for?",
      sort: "relevance",
      time: "all"
    });

    // Find the post by the specific author
    const post = searchResults.find(post => 
      post.author.name === "gotwire" //&& 
      // post.title.includes("What’s something you secretly judge people for, even though you know you shouldn’t?")
    );
    
    if (!post) {
      return res.status(404).send("Post not found");
    }
    
    // Get comments from the post
    const submission = reddit.getSubmission(post.id);
    await submission.comments.fetchMore({ amount: 10 }); // Fetch the first 10 comments

    // Log the comments before fetching
    console.log("Comments before fetchMore:", submission.comments);

    // Fetch the comments explicitly
    await submission.comments.fetchMore({ amount: 10 }); // Fetch the first 10 comments

    // Log the comments after fetching
    console.log("Comments after fetchMore:", submission.comments);

    // Extract the comments from the proxy object
    const comments = [];
    submission.comments.forEach(comment => {
      comments.push({
        body: comment.body,
        author: comment.author.name
      });
    });

    // Log the comments to verify
    console.log(post);

    // Render the comments.pug page with the post and comments
    res.render("comments", { 
      post: post,
      comments: comments // Pass the plain array to the template
    });
  } catch (error) {
    console.error("Full error object:", error);
    res.status(500).send(`Error fetching Reddit content: ${error.message}`);
  }
});

app.get('/author', async (req, res) => {
  const author = reddit.getSubmission('2np694').author.name
  .then(() => author.json())
});

// Helper function to get random elements from an array
// function getRandomElements(array, count) {
//   const shuffled = [...array].sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, Math.min(count, shuffled.length));
// }

// Start the server on port 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});