import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';

import { gridSpacing } from 'store/constant';

// assets
import { fetchResource } from '../../store/apiActions';
import { useDispatch } from 'react-redux';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    dispatch(fetchResource('currentMarketPrices', {
      url: `${apiUrl}/api/current-market-prices`,
      method: 'GET',
    }));

    setLoading(false);
  }, [dispatch]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <EarningCard isLoading={isLoading} symbol="VOO" />
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <EarningCard isLoading={isLoading} symbol="QQQ" />
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <EarningCard isLoading={isLoading} symbol="bitcoin" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
