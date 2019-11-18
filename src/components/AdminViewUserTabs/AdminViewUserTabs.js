import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import WorkoutCards from '../WorkoutCards/WorkoutCards';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
        root: {
        backgroundColor: '#84c8b9',
            width: "100%",
            fontFamily: 'PT Sans Narrow'
        },
        palette: {
            color: 'teal',
            textColor: 'teal',
            indicatorColor: 'teal'
        }
}));
const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(function FullWidthTabs(props) {
    const user_id = props.params
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    class={classes.palette}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="inherit"
                    textColor="teal"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab className={classes.palette} label="WORKOUTS" {...a11yProps(0)} icon={<FitnessCenterIcon className={classes.palette} />} />
                    <Tab className={classes.palette} label="DATA" {...a11yProps(1)} icon={<TrendingUpIcon className={classes.palette}/>} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    {/* <UserInputs /> */}
                    USER WORKOUTS
                    <WorkoutCards userId = {props.userId}/>
                    <br/>
                    <Link to= {`/admin/addworkout/${props.userId}`}>
                        <button>Add Workout</button>
                    </Link>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    {/* <UserGoals /> */}
                    USER DATA
                </TabPanel>
            </SwipeableViews>
        </div>
    );
})