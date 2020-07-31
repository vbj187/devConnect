import React from 'react';
// to establish connection with redux, also export
import { connect } from "react-redux";
// to declare type of property
import PropTypes from 'prop-types';

// alerts prop is obtained from reducer by mapStateToProps variable
const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        < div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.message}
        </div >
    ));

// declaring propTypes
Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
};

// fetch the alert state
const mapStateToProps = state => ({
    // obtaining state from the reducer
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
