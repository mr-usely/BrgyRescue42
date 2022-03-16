import { Grid } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import RegistrationForm from './forms/RegistrationForm';
import UserPreview from './UserPreview';
import UserData from './UserData';

// ==============================|| Registration ||============================== //

const Registration = () => (
    <MainCard title="Register User">
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6}>
                <SubCard title="User Information">
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <RegistrationForm />
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12} sm={6}>
                <SubCard title="Profile Preview">
                    <Grid container direction="column" spacing={1}>
                        <UserPreview />
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12} sm={12}>
                <SubCard title="User Created Data">
                    <Grid container direction="column" spacing={1}>
                        <UserData />
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    </MainCard>
);

export default Registration;
