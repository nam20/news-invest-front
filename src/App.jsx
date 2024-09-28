import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import router from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { useEffect } from 'react';
import axios from 'axios';
import { USER } from 'store/actionTypes';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const apiUrl = import.meta.env.VITE_APP_API_URL;

      try {
        const { data } = await axios.get(`${apiUrl}/api/auth/check`, { withCredentials: true });
        if (data) {
          dispatch({ type: USER, payload: data });
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <RouterProvider router={router} />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
