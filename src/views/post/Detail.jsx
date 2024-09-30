import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, Divider, ListItemText, Button, Pagination } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';

const PostDetail = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.user.data != null);

  const [commentContent, setCommentContent] = useState("");
  const [replyContent, setReplyContent] = useState({});
  const [replyingTo, setReplyingTo] = useState([]);

  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalElements: 0,
    currentPage: 1,
    pageSize: 20,
  });

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/comments/post/${id}?page=${pagination.currentPage - 1}`);

      setComments(data.content);
      setPagination((prev) => ({
        ...prev,
        totalPages: data.pagination.totalPages,
        totalElements: data.pagination.totalElements,
      }));

    } catch (error) {
      console.error(error);
    }
  }

  const handleCommentChange = (e) => setCommentContent(e.target.value);
  const handleReplyChange = (commentId, content) => {
    setReplyContent((prev) => ({
      ...prev,
      [commentId]: content,
    }));
  };

  const handleReplyClick = (commentId) => {
    if (replyingTo.includes(commentId)) {
      setReplyingTo((prev) => prev.filter((id) => id !== commentId));
    } else {
      setReplyingTo((prev) => [...prev, commentId]);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      await commentSubmit({ content: commentContent });
      setCommentContent("");
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReplySubmit = async (commentId) => {
    try {
      await commentSubmit({
        content: replyContent[commentId],
        parentCommentId: commentId,
      });
      setReplyingTo((prev) => prev.filter((id) => id !== commentId));
      setReplyContent((prev) => ({
        ...prev,
        [commentId]: "",
      }));
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const commentSubmit = async ({ content, parentCommentId } ) => {
    try {
      const response = await axios.post(`${apiUrl}/api/comments`,
        { postId: id, content, parentCommentId }, { withCredentials: true });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/posts/${id}`);
        setPost(data);

      } catch (error) {
        console.error(error);
      }
    }

    fetchPost();

  }, []);

  useEffect(() => {
    fetchComments();
  }, [ pagination.currentPage])

  const handlePageChange = (event, page) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }));
  }

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

      <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
        {post.userName}
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
                    {comment.userName}
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
                secondary={
                  <>
                    {comment.content}
                    {isLoggedIn && (
                      <Button
                        size="small"
                        onClick={() => handleReplyClick(comment.id)}
                        sx={{ mt: 1 }}
                      >
                        답글
                      </Button>
                    )}
                    {replyingTo.includes(comment.id) && (
                      <Box sx={{ mt: 2 }}>
                        <TextField
                          label="답글 작성"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={2}
                          value={replyContent[comment.id] || ""}
                          onChange={(e) =>
                            handleReplyChange(comment.id, e.target.value)
                          }
                          sx={{ mb: 1 }}
                        />
                        <Button
                          variant="contained"
                          onClick={() => handleReplySubmit(comment.id)}
                        >
                          답글 작성 완료
                        </Button>
                      </Box>
                    )}
                  </>
                }
              />
            </ListItem>
            <Divider component="div" />
          </React.Fragment>
        ))}
      </List>

      <Pagination
        count={pagination.totalPages}
        page={pagination.currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />

      <Box sx={{ mt: 2 }}>
        {isLoggedIn ? (
          <>
            <TextField
              label="댓글 작성"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={commentContent}
              onChange={handleCommentChange}
            />
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleCommentSubmit}
            >
              댓글 작성 완료
            </Button>
          </>
        ) : (
          <Typography color="textSecondary">
            로그인 후 댓글을 작성할 수 있습니다.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default PostDetail;
