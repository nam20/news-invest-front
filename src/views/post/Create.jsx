import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';

const PostCreate = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();

  function createPost() {

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
        onClick={createPost}
      >
        작성 완료
      </Button>
    </Box>
  );
}

export default PostCreate;