import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import WorkoutsPage from '../WorkoutsPage/WorkoutsPage';
import WorkoutSummary from '../WorkoutSummary/WorkoutSummary';
import WorkoutPreview from '../WorkoutPreview/WorkoutPreview';
import WeeksPage from '../WeeksPage/weeksPage';
import AdminLandPage from '../AdminLandPage/adminLandPage'
import Test from '../testRoutesPage/testRoutesPage';

import UserProfile from '../UserProfile/UserProfile';
import AdminViewUser from '../AdminViewUser/AdminViewUser';

import './App.css';
import UserExercise from '../UserExercise/UserExercise';
import adminLandPage from '../AdminLandPage/adminLandPage';
import AddExercise from '../AddExercise/AddExercise'

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            <ProtectedRoute
              exact
              path="/workouts"
              component={WorkoutsPage}
            />
            <ProtectedRoute
              exact
              path="/exercise"
              component={UserExercise}
            />
            <ProtectedRoute
              exact
              path="/profile"
              component={UserProfile}
            />
            <ProtectedRoute
              exact
              path="/preview"
              component={WorkoutPreview}
            />
            <ProtectedRoute
              exact
              path="/summary"
              component={WorkoutSummary}
            />
            {/* This route is to show all the routes to the user
            */}
            <ProtectedRoute
              exact
              path="/weeks"
              component={WeeksPage}
            />
             <ProtectedRoute
              exact
              path="/admin"
              component={adminLandPage}
              />
            <ProtectedRoute
              exact
              path="/test"
              component={Test}
            />
            <ProtectedRoute
              exact
              path="/adminviewuser"
              component={AdminViewUser}
            />
            <ProtectedRoute
              path="/addExercise"
              component={AddExercise}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default connect()(App);
