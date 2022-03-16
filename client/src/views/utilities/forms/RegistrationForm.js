import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'qrcode.react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    DialogActions,
    InputLabel,
    OutlinedInput,
    Typography,
    useMediaQuery,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Select,
    MenuItem
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { SET_USER_DATA, SEND_VALUES } from 'store/dataActions';
import { ADMIN_LOG } from 'store/adminActions';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const RegistrationForm = ({ ...others }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const scriptedRef = useScriptRef();
    const form = useRef(null);
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const loading = useSelector((state) => state.user);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cpnumber, setCPNumber] = useState('');
    const [birthdate, setBirthdate] = useState('01-01-1999');
    const [age, setAge] = useState(0);
    const [address, setAddress] = useState('');
    const [personToContact, setPersonToContact] = useState('');
    const [relation, setRelation] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [pathology, setPathology] = useState('');
    const [medication, setMedication] = useState('');
    const [allergy, setAllergy] = useState('');
    const [organDonor, setOrganDonor] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openDialog, setOpenDialog] = useState(true);

    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClose = () => {
        setOpenDialog(false);
        form.current.reset();
        handleClearInputs();
    };

    const handleReset = (resetForm) => {
        resetForm();
        handleClearInputs();
    }

    const handleClearInputs = () => {
        setFirstName('');
        setLastName('');
        setBirthdate('');
        setAge(0);
        setAddress('');
        setPersonToContact('');
        setPersonToContact('');
        setRelation('');
        setContactNumber('');
        setPathology('');
        setMedication('');
        setAllergy('');
        setOrganDonor('');
        setEmail('');
        setPassword('');
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

    useEffect(() => {
        dispatch({
            type: SET_USER_DATA,
            firstName: firstName,
            lastName: lastName,
            birthday: birthdate,
            cpnumber: cpnumber,
            age: age,
            address: address,
            personToContact: personToContact,
            relation: relation,
            contactNumber: contactNumber,
            allergy: allergy,
            pathology: pathology,
            medications: medication,
            organDonor: organDonor,
            email: email,
            password: password
        });
    }, [
        dispatch,
        firstName,
        lastName,
        cpnumber,
        birthdate,
        age,
        address,
        personToContact,
        relation,
        contactNumber,
        allergy,
        pathology,
        medication,
        organDonor,
        email,
        password
    ]);

    useEffect(() => {
        setOpenDialog(loading.isLoading);
    }, [loading.isLoading]);

    return (
        <>
            <Formik
                initialValues={{
                    firstName: firstName,
                    lastName: lastName,
                    cpnumber: cpnumber,
                    age: age,
                    address: address,
                    personToContact: personToContact,
                    relation: relation,
                    contactNumber: contactNumber,
                    allergy: allergy,
                    pathology: pathology,
                    medications: medication,
                    organDonor: organDonor,
                    email: email,
                    password: password,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: isSuccess });
                            setSubmitting(false);
                            dispatch({ type: SEND_VALUES, infoArr: values });
                            resetForm();
                            // submitReg(values);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: isSuccess });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form ref={form} noValidate onSubmit={handleSubmit} {...others}>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={5}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-firstname">First Name</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-firstname"
                                        type="text"
                                        value={values.firstName}
                                        name="firstName"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setFirstName(e.target.value);
                                        }}
                                        inputProps={{}}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-lastname">Last Name</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-lastname"
                                        type="text"
                                        value={values.lastName}
                                        name="lastName"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setLastName(e.target.value);
                                        }}
                                        inputProps={{}}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-age">Age</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-age"
                                        type="text"
                                        value={values.age}
                                        name="age"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setAge(e.target.value);
                                        }}
                                        inputProps={{}}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-birthdate" shrink>
                                        Birthdate
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-birthdate"
                                        type="date"
                                        value={birthdate}
                                        name="birthdate"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setBirthdate(e.target.value);
                                        }}
                                        inputlabelprops={{ shrink: true }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-address">Address</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-address"
                                        type="text"
                                        value={values.address}
                                        name="address"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setAddress(e.target.value);
                                        }}
                                        inputProps={{}}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-cpnumber">CP Number</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-cpnumber"
                                        type="text"
                                        value={values.cpnumber}
                                        name="cpnumber"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setCPNumber(e.target.value);
                                        }}
                                        inputProps={{}}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-person-to-contact">Person to Contact</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-person-to-contact"
                                        type="text"
                                        value={values.personToContact}
                                        name="personToContact"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setPersonToContact(e.target.value);
                                        }}
                                        inputProps={{}}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-relation">Relation</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-relation"
                                        type="text"
                                        value={values.relation}
                                        name="relation"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setRelation(e.target.value);
                                        }}
                                        inputProps={{}}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-contact-number">Contact Number</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-contact-number"
                                        type="text"
                                        value={values.contactNumber}
                                        name="contactNumber"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setContactNumber(e.target.value);
                                        }}
                                        inputProps={{}}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={3}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-allergy">Allergy</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-allergy"
                                        type="text"
                                        value={values.allergy}
                                        name="allergy"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setAllergy(e.target.value);
                                        }}
                                        inputProps={{}}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-pathology">Pathology</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-pathology"
                                        type="text"
                                        value={values.pathology}
                                        name="pathology"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setPathology(e.target.value);
                                        }}
                                        inputProps={{}}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-medications">Medications</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-medications"
                                        type="text"
                                        value={values.medications}
                                        name="medications"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setMedication(e.target.value);
                                        }}
                                        inputProps={{}}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="select-adornment-organ-donor">Organ Donor</InputLabel>
                                    <Select
                                        labelId="select-adornment-organ-donor"
                                        id="select-organ-donor"
                                        name="organDonor"
                                        value={organDonor}
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setOrganDonor(e.target.value);
                                        }}
                                        inputlabelprops={{ shrink: true }}
                                    >
                                        <MenuItem value={1}>Yes</MenuItem>
                                        <MenuItem value={0}>No</MenuItem>
                                    </Select>
                                    {/* <OutlinedInput
                                        id="outlined-adornment-organ-donor"
                                        type="text"
                                        value={values.organDonor}
                                        name="organDonor"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setOrganDonor(e.target.value);
                                        }}
                                        inputProps={{}}
                                    /> */}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.email && errors.email)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-register"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setEmail(e.target.value);
                                        }}
                                        inputProps={{}}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text--register">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.password && errors.password)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
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
                                            setPassword(e.target.value);
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

                        <Box sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            fullWidth
                                            size="medium"
                                            variant="outlined"
                                            onClick={handleReset.bind(null, resetForm)}
                                            sx={{
                                                color: 'grey.700',
                                                backgroundColor: theme.palette.grey[50],
                                                borderColor: theme.palette.grey[100]
                                            }}
                                        >
                                            Clear
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                        >
                                            Submit
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                )}
            </Formik>
            <Dialog fullWidth={true} maxWidth={'xs'} open={openDialog} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                    <Typography align="center" sx={{ fontSize: '1.5rem', fontWeight: 500 }}>
                        Success!
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText align="center">
                        <Typography align="center" sx={{ fontSize: '1.2rem', mr: 1, mb: 0.75 }}>
                            User Add Success
                        </Typography>
                        <Grid container alighItems="center" justifyContent="center">
                            <Grid item sx={{ mb: 1 }}>
                                <QRCode
                                    id="qrCodeEl"
                                    size={250}
                                    value={
                                        'app: brgy_rescue_hotline&' +
                                        firstName +
                                        ' ' +
                                        lastName +
                                        '&' +
                                        birthdate +
                                        '&' +
                                        organDonor +
                                        '&' +
                                        allergy +
                                        '&' +
                                        email +
                                        '&' +
                                        cpnumber +
                                        '&' +
                                        pathology +
                                        '&' +
                                        medication +
                                        '&' +
                                        personToContact +
                                        '&' +
                                        relation +
                                        '&' +
                                        contactNumber
                                    }
                                    includeMargin
                                    imageSettings={{
                                        src: '/static/media/location-icon_v.00bffa54.png',
                                        height: 90,
                                        width: 90
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDownload(firstName + lastName)}>Download</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default RegistrationForm;
