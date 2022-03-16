import { Grid, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';

const UserData = () => {
    const user = useSelector((state) => state.user);
    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.4 },
        { field: 'firstname', headerName: 'First Name' },
        { field: 'lastname', headerName: 'Last Name' },
        { field: 'age', headerName: 'Age', flex: 0.5 },
        { field: 'birthdate', headerName: 'Birthdate', flex: 1 },
        { field: 'address', headerName: 'Address', flex: 1 },
        { field: 'persontocontact', headerName: 'Person To Contact', flex: 1.2 },
        { field: 'relation', headerName: 'Relation' },
        { field: 'contactnumber', headerName: 'Contact' },
        { field: 'allergy', headerName: 'Allergy', flex: 1 },
        { field: 'pathology', headerName: 'Pathology', flex: 1 },
        { field: 'medications', headerName: 'Medications', flex: 1.1 },
        { field: 'organdonor', headerName: 'Organ Donor', flex: 1 }
    ];

    return (
        <Grid item xs={12}>
            <Box sx={{ height: 200, width: '100%' }}>
                <DataGrid columns={columns} rows={user.dataUser == undefined ? [] : user.dataUser} pageSize={10} />
            </Box>
        </Grid>
    );
};

export default UserData;
