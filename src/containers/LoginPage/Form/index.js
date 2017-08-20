// libs
import React from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field, submit, reset as formReset} from 'redux-form';
// components
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {
  TextField,
} from 'redux-form-material-ui';

class LoginForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  submit = () => {
    this.props.dispatch(submit('loginForm'));
  }

  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <Card>
        <CardHeader
          title={<h2>Login</h2>}
        />

        <CardText>
          <form onSubmit={handleSubmit}>
            <div>
              <Field name="email" component={TextField} hintText="Email" fullWidth />
            </div>
            <div>
              <Field
                name="password"
                component={TextField}
                hintText="Password"
                type="password"
                fullWidth
              />
            </div>
          </form>
        </CardText>

        <CardActions style={{textAlign: 'right'}}>
          <RaisedButton label="Reset" disabled={pristine || submitting} onClick={reset} />
          <RaisedButton label="Login" primary disabled={submitting} onClick={this.submit} />
        </CardActions>
      </Card>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};

export default reduxForm({
  form: 'loginForm',
  validate,
  onSubmitSuccess: (result, dispatch) => dispatch(formReset('loginForm')),
})(LoginForm);
