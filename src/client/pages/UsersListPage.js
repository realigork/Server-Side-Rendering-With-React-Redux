import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

class UsersList extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  head() {
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users loaded`}</title>
        <meta property="og:title" content="Users App" />
      </Helmet>
    )
  }
  
  render() {
    return (
      <div>
        {this.head()}
        <div>UsersList</div>
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }

  renderUsers() {
    return this.props.users.map(user => {
      return <li key={user.id}>{user.name}</li>;
    });
  }
};

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

function loadData(store) {
  return store.dispatch(fetchUsers());
}

export default {
  loadData,
  component: connect(mapStateToProps, { fetchUsers })(UsersList)
};
