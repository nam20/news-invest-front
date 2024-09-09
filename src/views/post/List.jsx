import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useRef, useState } from 'react';
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
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const postState = useSelector((state) => state.api.post);
  const posts = postState.data;
  const isLoading = postState.loading;
  const dispatch = useDispatch();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    dispatch(fetchResource('post', {
      url: `${apiUrl}/api/posts`,
      method: 'GET',
      params: {
        page: paginationModel.page,
      }
    }));

  }, [dispatch, paginationModel]);

  const rows = posts ? posts.content.map((post) => ({
    id: post.id,
    userId: post.userId,
    title: post.title,
    content: post.content,
    category: post.category,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt
  })) : [];

  const rowCountRef = useRef(posts?.pagination?.totalElements || 0);

  const rowCount = useMemo(() => {
    if (posts?.pagination?.totalElements !== undefined) {
      rowCountRef.current = posts.pagination.totalElements;
    }
    return rowCountRef.current;
  }, [posts?.pagination?.totalElements]);

  return (
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
  );
};

export default PostList;
