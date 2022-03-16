import { Grid } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import AllUsers from './AllUsers';

const ViewUsers = () => {
    return (
        <MainCard title="View Users">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12}>
                    <AllUsers />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ViewUsers;
