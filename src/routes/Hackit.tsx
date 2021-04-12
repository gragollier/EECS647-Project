import { Divider, Dialog, Button, DialogTitle, DialogContent, DialogActions, TextField, Typography, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
}));

type UrlParams = {
  slug: string,
}

type Post = {
  postId: string,
  creator: string,
  title: string,
  body: string,
  timestamp: string
}

type Hackit = {
  name: string,
  description: string,
  posts: [Post]
}

const api = 'https://0l09ip0w5a.execute-api.us-east-1.amazonaws.com/Prod';
const path = '/gethackit';
const createPath = '/createpost';

const HackitPage = () => {
  const classes = useStyles();

  const { slug } = useParams<UrlParams>();

  const [hackit, setHackit] = useState<Hackit>();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<String>();
  const [body, setBody] = useState<String>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const onTitleChange = (e: any) => {
    setTitle(e.target.value);
  }

  const onBodyChange = (e: any) => {
    setBody(e.target.value);
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  }

  const handleCreatePost = () => {
    setIsDialogOpen(false);
    const request = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        sub: slug,
        creator: "grant",
        title: title,
        body: body
      }),
    };

    fetch(api + createPath, request)
      .then(response => response.json())
      .then(() => {
        setIsLoaded(false);
      });
  }

  useEffect(() => {
    if (slug && ! isLoaded){
      const request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
          name: slug,
        }),
      };
  
      fetch(api + path, request)
        .then(response => response.json())
        .then(data => {
          setIsLoaded(true);
          setHackit(data);
        });
    }
  }, [slug, isLoaded]);

  return (
    <Container>
      <Dialog onClose={handleDialogClose} open={isDialogOpen} fullWidth>
        <DialogTitle>
          Create Post
        </DialogTitle>
        <DialogContent>
          <form className={classes.root}>
          <TextField id="post-title" label="Post Title" required onChange={onTitleChange} />
          <TextField id="post-body" label="Post Body" required multiline onChange={onBodyChange} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCreatePost} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
        {hackit ? (
          <div>
            <Typography variant="h1">
              {hackit.name}
            </Typography>
            <Typography>
              {hackit.description}
            </Typography>
            <Button variant="outlined" color="primary" onClick={handleDialogOpen}>Create Post</Button>
            <hr/>
            <Container style={{textAlign: "left"}}>
            {hackit.posts.map(post =>     
              <div key={post.postId}>
                <Typography variant="h3">{post.title}</Typography>
                <Typography variant="subtitle1">By {post.creator}</Typography>
                <Typography>{post.body}</Typography>
                <Divider />
              </div>)}
              </Container>
          </div>
        ) : (
          <div>
            <h2>
              Hackit not found
            </h2>
          </div>
        )}
    </Container>
  )
};

export default HackitPage;