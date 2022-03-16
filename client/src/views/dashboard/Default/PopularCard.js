import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Button,
    CardActions,
    CardContent,
    Divider,
    Grid,
    Menu,
    MenuItem,
    Typography,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useSelector } from 'react-redux';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
    const theme = useTheme();
    const loadbrgys = useSelector((state) => state.user);
    const load = useSelector((state) => state.ui.loading);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    loadbrgys.brgys.forEach((item, i) => {
        item.id = i + 1;
    });

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing} style={{ maxHeight: '100%', overflow: 'auto' }}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Top Emergency Brgy's</Typography>
                                    </Grid>
                                    <Grid item>
                                        <MoreHorizOutlinedIcon
                                            fontSize="small"
                                            sx={{
                                                color: theme.palette.primary[200],
                                                cursor: 'pointer'
                                            }}
                                            aria-controls="menu-popular-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        />
                                        <Menu
                                            id="menu-popular-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}> Today</MenuItem>
                                            <MenuItem onClick={handleClose}> This Month</MenuItem>
                                            <MenuItem onClick={handleClose}> This Year </MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                {load.loading ? (
                                    "Loading Brgy's"
                                ) : (
                                    <>
                                        {loadbrgys.brgys
                                            .filter((item, idx) => idx < 7)
                                            .map((item) => (
                                                <div key={item.id}>
                                                    <Grid container direction="column">
                                                        <Grid item>
                                                            <Grid container alignItems="center" justifyContent="space-between">
                                                                <Grid item>
                                                                    <Typography variant="subtitle1" color="inherit">
                                                                        {item.brgy}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                                        <Grid item>
                                                                            <Typography variant="subtitle1" color="inherit">
                                                                                {item.numberofreport}
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <Avatar
                                                                                variant="rounded"
                                                                                sx={{
                                                                                    width: 16,
                                                                                    height: 16,
                                                                                    borderRadius: '5px',
                                                                                    backgroundColor: theme.palette.success.light,
                                                                                    color: theme.palette.success.dark,
                                                                                    ml: 2
                                                                                }}
                                                                            >
                                                                                <LocalHospitalIcon fontSize="small" color="inherit" />
                                                                            </Avatar>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                                                                {item.contactnumber}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Divider sx={{ my: 1.5 }} />
                                                </div>
                                            ))}
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                        <Button size="small" disableElevation onClick={handleClickOpen}>
                            View All
                            <ChevronRightOutlinedIcon />
                        </Button>
                    </CardActions>
                </MainCard>
            )}
            <Dialog
                open={open}
                onClose={handleClickClose}
                scroll={'paper'}
                maxWidth={'sm'}
                fullWidth={true}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">
                    <Typography align="center" sx={{ fontSize: '1.2rem', fontWeight: 500 }}>
                        Top Emergency Brgy's
                    </Typography>
                </DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                        {loadbrgys.brgys.map((item) => (
                            <div key={item.id}>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    {item.brgy}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            {item.numberofreport}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Avatar
                                                            variant="rounded"
                                                            sx={{
                                                                width: 16,
                                                                height: 16,
                                                                borderRadius: '5px',
                                                                backgroundColor: theme.palette.success.light,
                                                                color: theme.palette.success.dark,
                                                                ml: 2
                                                            }}
                                                        >
                                                            <LocalHospitalIcon fontSize="small" color="inherit" />
                                                        </Avatar>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                                            {item.contactnumber}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 1.5 }} />
                            </div>
                        ))}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
