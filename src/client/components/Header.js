import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = ({ auth }) => {
  const authButton = auth 
    ? <a href="/api/logout">Logout</a>
    : <a href="/api/auth/google">Login</a>;

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">React SSR</Link>
        <ul class="right">
          <li>
            <Link to="/users">Users</Link>
          </li>

          <li>
            <Link to="/admins">Admins</Link>
          </li>

          <li>
            {authButton}
          </li>
        </ul>
      </div>
    </nav>
  );
};

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Header);
