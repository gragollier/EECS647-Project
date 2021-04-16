import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';


import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { apiUrl } from '../config';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    textField: {
      margin: theme.spacing(1),
      width: '40ch',
    },
    button: {
      margin: theme.spacing(1),
      width: '25ch',
      textAlign: 'center',
    },
    divider: {
      margin: theme.spacing(3),
    },
    paper: {
      padding: '20px',
      margin: '5px',
    }
  }),
);

type UrlParams = {
  slug: string,
}

type Post = {
  postId: string,
  creator: string,
  creatorBio: string,
  title: string,
  body: string,
  timestamp: string,
}

type Hackit = {
  name: string,
  description: string,
  posts: Post[],
}

const path = '/gethackit';
const createPath = '/createpost';

const HackitPage = () => {
  const classes = useStyles();
  const history = useHistory();
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

  const openPost = (post: Post) => {
    history.push(`/post/${post.postId}`);
  }

  const handleCreatePost = () => {
    setIsDialogOpen(false);
    const username = localStorage.getItem("username");

    const request = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        sub: slug,
        creator: username,
        title: title,
        body: body
      }),
    };

    fetch(apiUrl + createPath, request)
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
  
      fetch(apiUrl + path, request)
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
            <TextField
              id="post-title"
              label="Post Title"
              required
              onChange={onTitleChange}
              className={classes.textField}
            />
            <TextField
              id="post-body"
              label="Post Body"
              required
              multiline
              onChange={onBodyChange}
              className={classes.textField}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCreatePost} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
        {hackit ? (
          <Container>
            <Typography variant="h3">
              {hackit.name}
            </Typography>
            <Typography>
              {hackit.description}
            </Typography>
            <Button variant="outlined" color="primary" onClick={handleDialogOpen}>Create Post</Button>
            <Divider className={classes.divider} />
            <Container style={{textAlign: "left"}}>
              {hackit.posts.map(post =>     
                <Paper key={post.postId} className={classes.paper} onClick={() => {openPost(post);}}>
                  <Typography variant="h3">{post.title}</Typography>
                  <Typography variant="subtitle1">By {post.creator}</Typography>
                  <Typography>{post.body}</Typography>
                </Paper>
              )}
            </Container>
          </Container>
        ) : (
          <Container>
            <Typography variant="h3">
              Hackit loading...
            </Typography>
          </Container>
        )}
    </Container>
  )
};

export default HackitPage;