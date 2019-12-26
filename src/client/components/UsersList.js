import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

class UsersList extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  
  render() {
    return (
      <div>
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

export { loadData };

export default connect(mapStateToProps, { fetchUsers })(UsersList);
