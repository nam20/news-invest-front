import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useMemo, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'id' },
  { field: 'userId', headerName: 'userId' },
  { field: 'userName', headerName: 'userName' },
  { field: 'title', headerName: 'title' },
  { field: 'content', headerName: 'content' },
  { field: 'category', headerName: 'category' },
  { field: 'commentCount', headerName: 'commentCount' },
  { field: 'createdAt', headerName: 'createdAt' },
  { field: 'updatedAt', headerName: 'updatedAt' },
  {
    field: 'actions',
    headerName: '상세 보기',
    renderCell: (params) => (
      <Button
        variant="contained"
        component={Link}
        to={`/pages/post-detail/${params.id}`}
      >
        상세 보기
      </Button>
    ),
  }
];

const PostList = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const [posts, setPosts] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    const fetchPosts = async () => {
      setLoading(true);

      const { data } = await axios.get(`${apiUrl}/api/posts?page=${paginationModel.page}`);

      setPosts(data);
      setLoading(false);
    }

    fetchPosts();

  }, [paginationModel]);

  const rows = posts?.content ?? [];

  const rowCountRef = useRef(posts?.pagination?.totalElements || 0);

  const rowCount = useMemo(() => {
    if (posts?.pagination?.totalElements !== undefined) {
      rowCountRef.current = posts.pagination.totalElements;
    }
    return rowCountRef.current;
  }, [posts?.pagination?.totalElements]);

  return (
    <Box>
      <Grid container justifyContent="flex-end" mb={2}>
        <Grid item>
          <Button variant="contained" component={Link} to="/pages/post-create">
            게시글 작성
          </Button>
        </Grid>
      </Grid>
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        loading={isLoading}
        pageSizeOptions={[20]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
      />
    </Box>
  );
};

export default PostList;
