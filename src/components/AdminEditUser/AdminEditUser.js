import React, { Component } from 'react';
import AdminEditUserTabs from '../AdminEditUserTabs/AdminEditUserTabs';
import './AdminEditUser.css';
import { connect } from 'react-redux';

class AdminEditUser extends Component {
    componentDidMount = () =>{
        this.props.dispatch({ type: 'ADMIN_FETCH_USER', payload: this.props.match.params.id })
    }
    render() {
        return (
            <>
            <div>
                <AdminEditUserTabs userId = {this.props.match.params.id}/>
            </div>
            </>
        )
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
});
export default connect(mapStateToProps)(AdminEditUser);