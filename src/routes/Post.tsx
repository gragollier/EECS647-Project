import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';


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
  title: string,
  body: string,
  timestamp: string
  comments: Comment[],
}

type Comment = {
  commentId: string,
  body: string,
  timestamp: string,
  username: string,
  userBio: string,
}

const getPostPath = '/getpost';
const createCommentPath = '/createcomment';

const PostPage = () => {
  const classes = useStyles();

  const { slug } = useParams<UrlParams>();

  const [post, setPost] = useState<Post>();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [body, setBody] = useState<String>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const onBodyChange = (e: any) => {
    setBody(e.target.value);
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  }

  const handleCreateComment = () => {
    setIsDialogOpen(false);
    const username = localStorage.getItem("username");

    const request = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        postId: slug,
        username: username,
        body: body
      }),
    };

    fetch(apiUrl + createCommentPath, request)
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
          postId: slug,
        }),
      };
  
      fetch(apiUrl + getPostPath, request)
        .then(response => response.json())
        .then(data => {
          setIsLoaded(true);
          setPost(data);
        });
    }
  }, [slug, isLoaded]);

  return (
    <Container>
      <Dialog onClose={handleDialogClose} open={isDialogOpen} fullWidth>
        <DialogTitle>
          Create Comment
        </DialogTitle>
        <DialogContent>
          <form className={classes.root}>
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
          <Button autoFocus onClick={handleCreateComment} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
        {post ? (
          <Container>
            <Typography variant="h3">
              {post.title}
            </Typography>
            <Typography>
              {post.body}
            </Typography>
            <Link to={`/user/${post.creator}`}>
              <Typography>
                {post.creator}
              </Typography>
            </Link>
            <Button variant="outlined" color="primary" onClick={handleDialogOpen}>Create Comment</Button>
            <Divider className={classes.divider} />
            <Container style={{textAlign: "left"}}>
              <Typography variant="h4">
                Comments:
              </Typography>
              {post.comments.map(comment =>     
                <Paper key={comment.commentId} className={classes.paper}>
                  <Typography variant="h5">{comment.body}</Typography>
                    <Typography variant="subtitle1">
                      {"By "} 
                      <Link to={`/user/${comment.username}`}>
                        {comment.username}
                      </Link>
                    </Typography>
                </Paper>
              )}
            </Container>
          </Container>
        ) : (
          <Container>
            <Typography variant="h3">
              Post not found
            </Typography>
          </Container>
        )}
    </Container>
  )
};

export default PostPage;