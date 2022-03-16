import { useTheme } from '@mui/material/styles';
import {
    Grid,
    Box,
    FormControl,
    FormHelperText,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    DialogTitle,
    Typography,
    Button,
    IconButton
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// ui imports
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'qrcode.react';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

// project imports
import useScriptRef from 'hooks/useScriptRef';

// redux actions
import { LOAD_USER } from 'store/dataActions';
import { DELETE_USER, UPDATE_USER } from 'store/ApiActions';

const columns = [
    { field: 'id', headerName: 'ID', flex: 0.4 },
    { field: 'firstname', headerName: 'First Name' },
    { field: 'lastname', headerName: 'Last Name' },
    { field: 'age', headerName: 'Age', type: 'number', flex: 0.5 },
    { field: 'birthdate', headerName: 'Birthdate', type: 'date', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'persontocontact', headerName: 'Person To Contact', flex: 1.2 },
    { field: 'relation', headerName: 'Relation' },
    { field: 'contactnumber', headerName: 'Contact' },
    { field: 'allergy', headerName: 'Allergy', flex: 1 },
    { field: 'pathology', headerName: 'Pathology', flex: 1 },
    { field: 'medications', headerName: 'Medications', flex: 1.1 },
    { field: 'organdonor', headerName: 'Organ Donor', flex: 1 }
];

const AllUsers = () => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const dispatch = useDispatch();
    const tableData = useSelector((state) => state.user);
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [delopen, setDelOpen] = useState(false);
    const [userData, setUserData] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const aray = [];

    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClose = () => {
        setOpen(false);
        setIsUpdate(false);
    };

    const handleRows = (row) => {
        row.birthdate = row.birthdate.split('T')[0];
        console.log(row);
        aray.push(row);
        setUserData(aray);
    };

    const handleDelete = (id) => {
        dispatch({ type: DELETE_USER, id: id });
        setDelOpen(false);
        setOpen(false);
        dispatch({ type: LOAD_USER });
    };

    const closeDelConfirmation = () => {
        setDelOpen(false);
    };

    const confirmDel = () => {
        setDelOpen(true);
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    // handle download QR Code function
    const handleDownload = (name) => {
        const qrCodeURL = document.getElementById('qrCodeEl').toDataURL('image/png').replace('image/png', 'image/octet-stream');
        console.log(document.getElementById('qrCodeEl'));
        let aEl = document.createElement('a');
        aEl.href = qrCodeURL;
        aEl.download = `QR_${name}_Code.png`;
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
    };

    const clickedRow = (e) => {
        handleRows(e.row);
        setOpen(true);
    };

    const handleUpdate = (id, vals) => {
        dispatch({ type: UPDATE_USER, id: id, params: vals });
        setIsUpdate(false);
        setOpen(false);
        dispatch({ type: LOAD_USER });
    };

    const handleIsUpdate = () => {
        console.log('updating');
        setIsUpdate(true);
    };

    const convertDate = () => {
        if (tableData.dataUser != undefined) {
            for (let i = 0; i < tableData.dataUser.length; i++) {
                tableData.dataUser[i].birthdate = tableData.dataUser[i].birthdate.split('T')[0];
            }
            return tableData.dataUser;
        }
    };

    useEffect(() => {
        dispatch({ type: LOAD_USER });
    }, [dispatch]);

    return (
        <div>
            <Grid item xs={12}>
                <Box sx={{ height: 700, width: '100%' }}>
                    <DataGrid
                        columns={columns}
                        onRowClick={(e) => clickedRow(e)}
                        rows={tableData.dataUser == undefined ? [] : convertDate()}
                        components={{ Toolbar: GridToolbar }}
                        pageSize={12}
                    />
                </Box>
            </Grid>
            <Dialog open={open} fullWidth={true} maxWidth={'sm'} onClose={handleClose}>
                <Formik
                    initialValues={{
                        firstName: userData[0] != undefined && userData[0].firstname,
                        lastName: userData[0] != undefined && userData[0].lastname,
                        cpnumber: userData[0] != undefined && userData[0].cpnumber,
                        birthdate: userData[0] != undefined && userData[0].birthdate.split('T')[0],
                        age: userData[0] != undefined && userData[0].age,
                        address: userData[0] != undefined && userData[0].address,
                        personToContact: userData[0] != undefined && userData[0].persontocontact,
                        relation: userData[0] != undefined && userData[0].relation,
                        contactNumber: userData[0] != undefined && userData[0].contactnumber,
                        allergy: userData[0] != undefined && userData[0].allergy,
                        pathology: userData[0] != undefined && userData[0].pathology,
                        medications: userData[0] != undefined && userData[0].medications,
                        organDonor: userData[0] != undefined && userData[0].organdonor,
                        email: userData[0] != undefined && userData[0].username,
                        password: userData[0] != undefined && userData[0].password,
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                        password: Yup.string().max(255).required('Password is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            if (scriptedRef.current) {
                                setStatus({ success: false });
                                setSubmitting(false);
                                handleUpdate(userData[0] != undefined && userData[0].id, values);
                            }
                        } catch (err) {
                            console.error(err);
                            if (scriptedRef.current) {
                                setStatus({ success: false });
                                setErrors({ submit: err.message });
                                setSubmitting(false);
                            }
                        }
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <DialogTitle>
                                <Button
                                    onClick={() => handleDownload(userData[0] != undefined && userData[0].firstname + userData[0].lastname)}
                                    sx={{ position: 'absolute', left: 15, top: 10 }}
                                >
                                    <FileDownloadIcon /> Download QR
                                </Button>
                                <Typography variant="h3" align="center">
                                    Profile Details
                                </Typography>
                                {isUpdate ? (
                                    <>
                                        <IconButton
                                            aria-label="close"
                                            onClick={() => setIsUpdate(false)}
                                            sx={{
                                                position: 'absolute',
                                                right: 15,
                                                top: 7,
                                                color: (theme) => theme.palette.error.light
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="done"
                                            type="submit"
                                            sx={{
                                                position: 'absolute',
                                                right: 50,
                                                top: 7,
                                                color: (theme) => theme.palette.success.main
                                            }}
                                        >
                                            <DoneIcon />
                                        </IconButton>
                                    </>
                                ) : (
                                    <>
                                        <IconButton
                                            aria-label="update"
                                            onClick={handleIsUpdate}
                                            sx={{
                                                position: 'absolute',
                                                right: 15,
                                                top: 7,
                                                color: (theme) => theme.palette.warning.dark
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={confirmDel}
                                            sx={{
                                                position: 'absolute',
                                                right: 50,
                                                top: 7,
                                                color: (theme) => theme.palette.orange.main
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                )}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <Grid container direction="column">
                                        <Grid item sx={{ mb: 2, mt: 2 }}>
                                            <Grid container alignItems="center" justifyContent="center">
                                                <Grid item sx={{ mb: 1 }}>
                                                    <QRCode
                                                        id="qrCodeEl"
                                                        size={250}
                                                        value={
                                                            userData[0] != undefined &&
                                                            'app: brgy_rescue_hotline&' +
                                                                userData[0].firstname +
                                                                ' ' +
                                                                userData[0].lastname +
                                                                '&' +
                                                                userData[0].birthdate +
                                                                '&' +
                                                                userData[0].organdonor +
                                                                '&' +
                                                                userData[0].allergy +
                                                                '&' +
                                                                userData[0].email +
                                                                '&' +
                                                                userData[0].cpnumber +
                                                                '&' +
                                                                userData[0].pathology +
                                                                '&' +
                                                                userData[0].medications +
                                                                '&' +
                                                                userData[0].persontocontact +
                                                                '&' +
                                                                userData[0].relation +
                                                                '&' +
                                                                userData[0].contactnumber
                                                        }
                                                        includeMargin
                                                        imageSettings={{
                                                            src: '/api/static/media/location-icon_v.00bffa54.png',
                                                            height: 90,
                                                            width: 90
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item sx={{ mb: 2 }}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12} sm={5}>
                                                    {isUpdate ? (
                                                        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                                            <InputLabel htmlFor="outlined-adornment-firstname">First Name</InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-firstname"
                                                                type="text"
                                                                value={values.firstName}
                                                                name="firstName"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                inputProps={{}}
                                                            />
                                                        </FormControl>
                                                    ) : (
                                                        <>
                                                            <Grid container direction="column">
                                                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>
                                                                    First Name
                                                                </Typography>
                                                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>
                                                                    {userData[0] != undefined && userData[0].firstname}
                                                                </Typography>
                                                            </Grid>
                                                        </>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12} sm={5}>
                                                    {isUpdate ? (
                                                        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                                            <InputLabel htmlFor="outlined-adornment-lastname">Last Name</InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-lastname"
                                                                type="text"
                                                                value={values.lastName}
                                                                name="lastName"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                inputProps={{}}
                                                            />
                                                        </FormControl>
                                                    ) : (
                                                        <>
                                                            <Grid container direction="column">
                                                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>
                                                                    Last Name
                                                                </Typography>
                                                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>
                                                                    {userData[0] != undefined && userData[0].lastname}
                                                                </Typography>
                                                            </Grid>
                                                        </>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12} sm={2}>
                                                    {isUpdate ? (
                                                        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                                            <InputLabel htmlFor="outlined-adornment-age">Age</InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-age"
                                                                type="text"
                                                                value={values.age}
                                                                name="age"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                inputProps={{}}
                                                            />
                                                        </FormControl>
                                                    ) : (
                                                        <>
                                                            <Grid container direction="column">
                                                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>Age</Typography>
                                                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>
                                                                    {userData[0] != undefined && userData[0].age}
                                                                </Typography>
                                                            </Grid>
                                                        </>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item sx={{ mt: 1, mb: 2 }}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12} sm={4}>
                                                    {isUpdate ? (
                                                        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                                            <InputLabel htmlFor="outlined-adornment-birthdate" shrink>
                                                                Birthdate
                                                            </InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-birthdate"
                                                                type="date"
                                                                value={values.birthdate}
                                                                name="birthdate"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                inputlabelprops={{ shrink: true }}
                                                            />
                                                        </FormControl>
                                                    ) : (
                                                        <>
                                                            <Grid container direction="column">
                                                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>
                                                                    Birthdate
                                                                </Typography>
                                                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>
                                                                    {userData[0] != undefined && userData[0].birthdate.split('T')[0]}
                                                                </Typography>
                                                            </Grid>
                                                        </>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    {isUpdate ? (
                                                        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                                            <InputLabel htmlFor="outlined-adornment-address">Address</InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-address"
                                                                type="text"
                                                                value={values.address}
                                                                name="address"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                inputProps={{}}
                                                            />
                                                        </FormControl>
                                                    ) : (
                                                        <>
                                                            <Grid container direction="column">
                                                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>Address</Typography>
                                                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>
                                                                    {userData[0] != undefined && userData[0].address}
                                                                </Typography>
                                                            </Grid>
                                                        </>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    {isUpdate ? (
                                                        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                                            <InputLabel htmlFor="outlined-adornment-cpnumber">CP Number</InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-cpnumber"
                                                                type="text"
                                                                value={values.cpnumber}
                                                                name="cpnumber"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                inputProps={{}}
                                                            />
                                                        </FormControl>
                                                    ) : (
                                                        <>
                                                            <Grid container direction="column">
                                                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>
                                                                    CP Number
                                                                </Typography>
                                                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>
                                                                    {userData[0] != undefined && userData[0].cpnumber}
                                                                </Typography>
                                                            </Grid>
                                                        </>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item sx={{ mt: 1, mb: 2 }}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12} sm={4}>
                                                    {isUpdate ? (
                                                        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                                            <InputLabel htmlFor="outlined-adornment-person-to-contact">
                                                                Person to Contact
                                                            </InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-person-to-contact"
                                                                type="text"
                                                                value={values.personToContact}
                                                                name="personToContact"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                inputProps={{}}
                                                            />
                                                        </FormControl>
                                                    ) : (
                                                        <>
                                                            <Grid container direction="column">
                                                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>
                                                                    Person to Contact
                                                                </Typography>
                                                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>
                                                                    {userData[0] != undefined && userData[0].persontocontact}
                                                                </Typography>
                                                            </Grid>
                                                        </>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    {isUpdate ? (
                                                        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                                            <InputLabel htmlFor="outlined-adornment-relation">Relation</InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-relation"
                                                                type="text"
                                                                value={values.relation}
                                                                name="relation"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                inputProps={{}}
                                                            />
                                                        </FormControl>
                                                    ) : (
                                                        <>
                                                            <Grid container direction="column">
                                                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>Relation</Typography>
                                                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>
                                                                    {userData[0] != undefined && userData[0].relation}
                                                                </Typography>
                                                            </Grid>
                                                        </>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    {isUpdate ? (
                                                        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                                            <InputLabel htmlFor="outlined-adornment-contact-number">
                                                                Contact Number
                                                            </InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-contact-number"
                                                                type="text"
                                                                value={values.contactNumber}
                                                                name="contactNumber"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                inputProps={{}}
                                                            />
                                                        </FormControl>
                                                    ) : (
                                                        <>
                                                            <Grid container direction="column">
                                                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>
                                                                    CP Number
                                                                </Typography>
                                                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>
                                                                    {userData[0] != undefined && userData[0].contactnumber}
                                                                </Typography>
                                                            </Grid>
                                                        </>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12} sm={3}>
                                                    {isUpdate ? (
                                                        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                                            <InputLabel htmlFor="outlined-adornment-allergy">Allergy</InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-allergy"
                                                                type="text"
                                                                value={values.allergy}
                                                                name="allergy"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                inputProps={{}}
                                                            />
                                                        </FormControl>
                                                    ) : (
                                                        <>
                                                            <Grid container direction="column">
                                                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>Allergy</Typography>
                                                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>
                                                                    {userData[0] != undefined && userData[0].allergy}
                                                                </Typography>
                                                            </Grid>
                                                        </>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12} sm={3}>
                                                    {isUpdate ? (
                                                        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                                            <InputLabel htmlFor="outlined-adornment-pathology">Pathology</InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-pathology"
                                                                type="text"
                                                                value={values.pathology}
                                                                name="pathology"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                inputProps={{}}
                                                            />
                                                        </FormControl>
                                                    ) : (
                                                        <>
                                                            <Grid container direction="column">
                                                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>
                                                                    Pathology
                                                                </Typography>
                                                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>
                                                                    {userData[0] != undefined && userData[0].pathology}
                                                                </Typography>
                                                            </Grid>
                                                        </>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    {isUpdate ? (
                                                        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                                            <InputLabel htmlFor="outlined-adornment-medications">Medications</InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-medications"
                                                                type="text"
                                                                value={values.medications}
                                                                name="medications"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                inputProps={{}}
                                                            />
                                                        </FormControl>
                                                    ) : (
                                                        <>
                                                            <Grid container direction="column">
                                                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>
                                                                    Medications
                                                                </Typography>
                                                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>
                                                                    {userData[0] != undefined && userData[0].medications}
                                                                </Typography>
                                                            </Grid>
                                                        </>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12} sm={2}>
                                                    {isUpdate ? (
                                                        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                                            <InputLabel htmlFor="outlined-adornment-organ-donor">Organ Donor</InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-organ-donor"
                                                                type="text"
                                                                value={values.organDonor}
                                                                name="organDonor"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                inputProps={{}}
                                                            />
                                                        </FormControl>
                                                    ) : (
                                                        <>
                                                            <Grid container direction="column">
                                                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>
                                                                    Organ Donor
                                                                </Typography>
                                                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>
                                                                    {userData[0] != undefined && userData[0].organdonor}
                                                                </Typography>
                                                            </Grid>
                                                        </>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item sx={{ mt: 1, mb: 2 }}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12} sm={6}>
                                                    {isUpdate ? (
                                                        <FormControl
                                                            fullWidth
                                                            error={Boolean(touched.email && errors.email)}
                                                            sx={{ ...theme.typography.customInput }}
                                                        >
                                                            <InputLabel htmlFor="outlined-adornment-email-register">
                                                                Email Address / Username
                                                            </InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-email-register"
                                                                type="email"
                                                                value={values.email}
                                                                name="email"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                inputProps={{}}
                                                            />
                                                            {touched.email && errors.email && (
                                                                <FormHelperText error id="standard-weight-helper-text--register">
                                                                    {errors.email}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    ) : (
                                                        <>
                                                            <Grid container direction="column">
                                                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>Email</Typography>
                                                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>
                                                                    {userData[0] != undefined && userData[0].username}
                                                                </Typography>
                                                            </Grid>
                                                        </>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    {isUpdate ? (
                                                        <FormControl
                                                            fullWidth
                                                            error={Boolean(touched.password && errors.password)}
                                                            sx={{ ...theme.typography.customInput }}
                                                        >
                                                            <InputLabel htmlFor="outlined-adornment-password-register">
                                                                handleMouseDownPassword
                                                            </InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-password-register"
                                                                type={showPassword ? 'text' : 'password'}
                                                                value={values.password}
                                                                name="password"
                                                                label="Password"
                                                                onBlur={handleBlur}
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                    changePassword(e.target.value);
                                                                }}
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            aria-label="toggle password visibility"
                                                                            onClick={handleClickShowPassword}
                                                                            onMouseDown={handleMouseDownPassword}
                                                                            edge="end"
                                                                            size="large"
                                                                        >
                                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                }
                                                                inputProps={{}}
                                                            />
                                                            {touched.password && errors.password && (
                                                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                                                    {errors.password}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    ) : (
                                                        <>
                                                            <Grid container direction="column">
                                                                <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>Password</Typography>
                                                                <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>
                                                                    {userData[0] != undefined && userData[0].password}
                                                                </Typography>
                                                            </Grid>
                                                        </>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {strength !== 0 && (
                                            <FormControl fullWidth>
                                                <Box sx={{ mb: 2 }}>
                                                    <Grid container spacing={2} alignItems="center">
                                                        <Grid item>
                                                            <Box
                                                                style={{ backgroundColor: level?.color }}
                                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                                {level?.label}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </FormControl>
                                        )}

                                        {errors.submit && (
                                            <Box sx={{ mt: 3 }}>
                                                <FormHelperText error>{errors.submit}</FormHelperText>
                                            </Box>
                                        )}
                                    </Grid>
                                </DialogContentText>
                            </DialogContent>
                        </form>
                    )}
                </Formik>
            </Dialog>
            <Dialog open={delopen} fullWidth={true} maxWidth={'xs'} onClose={closeDelConfirmation}>
                <DialogTitle id="delete-confirmation-dialog">
                    <Typography align="center" sx={{ fontSize: '1.5rem', fontWeight: 500 }}>
                        Confirm Delete!
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText align="center">
                        <Typography align="center" sx={{ fontSize: '1rem', mr: 1, mt: 1.75, mb: 0.75 }}>
                            Are you sure you want to delete this user?
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDelete(userData[0] != undefined && userData[0].id)}>Confirm</Button>
                    <Button onClick={closeDelConfirmation}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AllUsers;
