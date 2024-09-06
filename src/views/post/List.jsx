import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchResource } from '../../store/apiActions';

const columns = [
  { field: 'id', headerName: 'id' },
  { field: 'userId', headerName: 'userId' },
  { field: 'title', headerName: 'title' },
  { field: 'content', headerName: 'content' },
  { field: 'category', headerName: 'category' },
  { field: 'createdAt', headerName: 'createdAt' },
  { field: 'updatedAt', headerName: 'updatedAt' },
];

const PostList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    dispatch(fetchResource('post', {
      url: `${apiUrl}/api/posts`,
      method: 'GET',
    }));

  }, [dispatch]);

  const posts = useSelector((state) => state.api.post).data;

  const rows = posts ? posts.content.map((post) => ({
    id: post.id,
    userId: post.userId,
    title: post.title,
    content: post.content,
    category: post.category,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt
  })) : [];

  return (
    <DataGrid rows={rows} columns={columns} />
  );
};

export default PostList;
