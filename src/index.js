import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validPasswordRegex = RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
const validPhoneNoRegex = RegExp(/^(?=.*\d).{10,}$/);
class RegistrationComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userDetail: {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        countryCode: '+91'
      },
      errors: {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: ''
      }
    }
  }

  onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let errors = this.state.errors;

    switch (name) {
      case 'userName':
        errors.userName = ( 6 < value.length && value.length < 20)
          ? 'User Name should be min 6 and Max 20 characters'
          : '';
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password':
        errors.password =
          validPasswordRegex.test(value)
            ? ''
            : 'Password must have 1 uppercase, 1 specialcharacter, 1 number and lowercase';
        break;
      case 'confirmPassword':
        errors.confirmPassword = value !== this.state.userDetail.password
        ? 'Confirm password doesn\'t match with password'
        : '';
        break;
      case 'phoneNumber':
        errors.phoneNumber = validPhoneNoRegex.test(value)
        ? ''
        : 'Phonenumber is Invalid'
      default:
        break;
    }

    this.setState({errors,
      userDetail: {
        ...this.state.userDetail,
        [name]: value
      }
    });
  }

  onRegistrationHandler = (e) => {
    e.preventDefault();
    console.log(this.state.userDetail);
  }

  render() {
    const {errors} = this.state;
    return (
      <div>
        <h1>Registration</h1>
        <form>
          <p>
            <label>User Name : </label>
            <input type="text" name="username" value={this.state.userName} onChange={this.onChangeHandler} />
            <br/>
            {errors.userName.length > 0 && <span className="error">{errors.userName}</span>}
          </p>
          <p>
            <label>Email : </label>
            <input type="text" name="email" value={this.state.userDetail.email} onChange={this.onChangeHandler} />
            <br/>
            {errors.email.length > 0 && <span className="error">{errors.email}</span>}
          </p>
          <p>
            <label>Password : </label>
            <input type="password" name="password" value={this.state.userDetail.password} onChange={this.onChangeHandler} />
            <br/>
            {errors.password.length > 0 && <span className="error" type="error">{errors.password}</span>}
          </p>
          <p>
            <label>Confirm Password : </label>
            <input type="password" name="confirmPassword" value={this.state.userDetail.confirmPassword} onChange={this.onChangeHandler} />
            <br/>
            {errors.confirmPassword.length > 0 && <span className="error">{errors.confirmPassword}</span>}
          </p>
          <p>
            <label>Phone Number : </label>
            <select name="countryCode" value={this.state.userDetail.countryCode} onChange={this.onChangeHandler}>
              <option value="+91">+91</option>
              <option value="+92">+92</option>
              <option value="+93">+93</option>
            </select>
            <input type="text" name="phoneNumber" value={this.state.userDetail.phoneNumber} onChange={this.onChangeHandler} />
            <br/>
            {errors.phoneNumber.length > 0 && <span className="error">{errors.phoneNumber}</span>}
          </p>
          <button onClick={this.onRegistrationHandler}>Register</button>
        </form>
      </div>
    );
  }


}

ReactDOM.render(
  <RegistrationComponent />,
  document.getElementById('root')
);

