import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom';

const PostCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    try {
      setLoading(true);
      await axios.post(`${apiUrl}/api/posts`,
        { title, content, category }, { withCredentials: true });

      navigate('/pages/post-list');

    } catch (error) {
      setErrorMessage('Something went wrong. Please try again');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box>
      <TextField
        fullWidth
        label="제목"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="카테고리"
        variant="outlined"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="내용"
        variant="outlined"
        multiline
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        작성 완료
      </Button>
      {errorMessage && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{errorMessage}</FormHelperText>
        </Box>
      )}
    </Box>
  );
}

export default PostCreate;