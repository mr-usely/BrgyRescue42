import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';

const UserPreview = () => {
    const data = useSelector((state) => state.user);

    return (
        <>
            <Grid container direction="column">
                <Grid item>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={5}>
                            <Grid container direction="column">
                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>First Name</Typography>
                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>{data.firstName}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Grid container direction="column">
                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>Last Name</Typography>
                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>{data.lastName}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Grid container direction="column">
                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>Age</Typography>
                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>{data.age}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={{ mt: 4 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={4}>
                            <Grid container direction="column">
                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>Birthdate</Typography>
                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>{data.birthday}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Grid container direction="column">
                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>Address</Typography>
                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>{data.address}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Grid container direction="column">
                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>CP Number</Typography>
                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>{data.cpnumber}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={{ mt: 4 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={4}>
                            <Grid container direction="column">
                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>Person to Contact</Typography>
                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>{data.personToContact}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Grid container direction="column">
                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>Relation</Typography>
                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>{data.relation}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Grid container direction="column">
                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>Contact Number</Typography>
                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>{data.contactNumber}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={{ mt: 4 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={3}>
                            <Grid container direction="column">
                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>Allergy</Typography>
                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>{data.allergy}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Grid container direction="column">
                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>Pathology</Typography>
                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>{data.pathology}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Grid container direction="column">
                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>Medications</Typography>
                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>{data.medication}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Grid container direction="column">
                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>Organ Donor</Typography>
                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>{data.organDonor}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={{ mt: 4 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <Grid container direction="column">
                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>Email</Typography>
                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>{data.email}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Grid container direction="column">
                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>Password</Typography>
                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>{data.password}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default UserPreview;
