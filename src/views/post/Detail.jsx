import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, Divider, ListItemText, Button } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const { id } = useParams();

  useEffect(() => {

    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/posts/${id}`);

        const postData = {
          title: data.title,
          content: data.content,
          category: data.category,
          createdAt: data.createdAt,
        };

        const commentData = data.comments.map(comment => {
          return {
            id: comment.id,
            userId: comment.userId,
            content: comment.content,
            createdAt: comment.createdAt,
            parentCommentId: comment.parentCommentId,
            depth: comment.depth,
          }
        })

        setPost(postData);
        setComments(commentData);

      } catch (error) {
        console.error(error);
      }
    }

    fetchPost();

  }, []);

  return (
    <Box sx={{ p: 3, maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        {post.title}
      </Typography>

      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        {new Date(post.createdAt).toLocaleString()}
      </Typography>

      <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 2 }}>
        {post.category}
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        {post.content}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        댓글
      </Typography>

      <List>
        {comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <>
                    {comment.userId}
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                      sx={{ ml: 1 }}
                    >
                      {new Date(comment.createdAt).toLocaleString()}
                    </Typography>
                  </>
                }
                secondary={comment.content}
              />
            </ListItem>
            <Divider component="div" />
          </React.Fragment>
        ))}
      </List>

      <Button variant="contained" sx={{ mt: 2 }}>
        댓글 작성
      </Button>
    </Box>
  );
};

export default PostDetail;
