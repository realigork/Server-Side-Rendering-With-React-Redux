import React from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from '../actions';

class AdminsList extends React.Component {
  componentDidMount() {
    this.props.fetchAdmins();
  }
  
  render() {
    return (
      <div>
        <div>AdminsList</div>
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }

  renderUsers() {
    return this.props.admins.map(admin => {
      return <li key={admin.id}>{admin.name}</li>;
    });
  }
};

function mapStateToProps({ admins }) {
  return { admins }
}

function loadData(store) {
  return store.dispatch(fetchAdmins());
}

export default {
  loadData,
  component: connect(mapStateToProps, { fetchAdmins })(AdminsList)
};
