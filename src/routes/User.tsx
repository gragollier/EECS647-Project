import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';


import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
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

type User = {
  posts: Post[],
  comments: Comment[],
  bio: string,
  username: string,
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

const getUserPath = '/getuser';

const UserPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { slug } = useParams<UrlParams>();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (slug){
      const request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
          username: slug,
        }),
      };
  
      fetch(apiUrl + getUserPath, request)
        .then(response => response.json())
        .then(data => {
          setUser(data);
        });
    }
  }, [slug]);

  const goToPost = (post: Post) => {
    history.push(`/post/${post.postId}`)
  }

  return (
    <Container>
      {user ? (
        <Container>
          <Typography variant="h3">
            {user.username}
          </Typography>
          <Typography>
            {user.bio}
          </Typography>
          {user.posts.length && (
            <Container style={{textAlign: "left"}}>
              <Divider className={classes.divider} />
              <Typography variant="h4">
                Posts:
              </Typography>
              {user.posts.map(post =>     
                <Paper key={post.postId} className={classes.paper} onClick={() => {goToPost(post);}}>
                  <Typography variant="h5">{post.title}</Typography>
                  <Typography>
                    {(new Date(post.timestamp)).toLocaleString()}
                  </Typography>
                </Paper>
              )}
            </Container>
          )}
          {user.comments.length && (
            <Container style={{textAlign: "left"}}>
              <Divider className={classes.divider} />
              <Typography variant="h4">
                Comments:
              </Typography>
              {user.comments.map(comment =>     
                <Paper key={comment.commentId} className={classes.paper}>
                  <Typography variant="h5">{comment.body}</Typography>
                  <Typography>
                    {(new Date(comment.timestamp)).toLocaleString()}
                  </Typography>
                </Paper>
              )}
            </Container>
          )}
        </Container>
      ) : (
        <Container>
          <Typography variant="h3">
            User loading...
          </Typography>
        </Container>
      )}
    </Container>
  )
};

export default UserPage;