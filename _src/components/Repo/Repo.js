import React, { Component} from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';

export default class Repo extends Component {
  render() {
    const {repo, owner} = this.props;
    const {login} = owner;
    const {name, description} = repo;

    return (
      <div>
        <h3>
          <Link to={`/${login}/${name}`}>
            {name}
          </Link>
          {' by '}
          <Link to={`/${login}`}>
            {login}
          </Link>
        </h3>
        {description &&
          <p>{description}</p>
        }
      </div>
    );
  }
}

Repo.propTypes = {
  repo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  owner: PropTypes.shape({
    login: PropTypes.string.isRequired
  }).isRequired
};
