import React from "react"
import ValidationError from '../validationError'
import AuthApiService from '../services/auth-api-service'
import TokenService from "../services/token-service.js"


class FormSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: {
                value: "",
                touched: false,
            },
            password: {
                value: "",
                touched: false,
            },
            repeatPassword: {
                value: "",
                touched: false,
            },
        };
    }

    changeUsername(userName) {
        this.setState({
            userName: { value: userName, touched: true },
        });
    }

    changePassword(password) {
        this.setState({
            password: { value: password, touched: true },
        });
    }

    updateRepeatPassword(repeatPassword) {
        this.setState({
            repeatPassword: { value: repeatPassword, touched: true },
        });
    }

    validateUserName() {
        const userName = this.state.userName.value.trim();
        if (userName.length === 0) {
            return <p className="input-error">Username is required</p>;
        } else if (userName.length < 2) {
            return (
                <p className="input-error">
                    Username must be at least 2 characters long
                </p>
            );
        }
    }

    validatePassword() {
        const password = this.state.password.value.trim();
        if (password.length === 0) {
            return <p className="input-error">Password is required</p>;
        } else if (password.length < 6 || password.length > 72) {
            return (
                <p className="input-error">
                    Password must be between 6 and 72 characters long
                </p>
            );
        } else if (!password.match(/[0-9]/)) {
            return (
                <p className="input-error">
                    Password must contain at least one number
                </p>
            );
        }
    }

    validateRepeatPassword() {
        const repeatPassword = this.state.repeatPassword.value.trim();
        const password = this.state.password.value.trim();
        // this.setState({submitButtonDisabled: 'disabled'});
        if (repeatPassword !== password) {
            return <p className="input-error">Passwords do not match</p>;
        }
        // else {
        //     this.setState({submitButtonDisabled: ''});
        // }
    }
    registerUser = (event) => {
      event.preventDefault();
        //get the input from the form submission
        const data = {};
        //get the payload from the form submission
        const formData = new FormData(event.target);
        for (let value of formData) {
            data[value[0]] = value[1];
        }
       // console.log(data);

        let { userName, password} = data;
        //console.log(userName, password, repeatPassword);
        //validate user data

      this.setState({ error: null })
      AuthApiService.postUser({
          user_name: userName,
          password: password,
      })
  
      .then(response => {
          //console.log('user:', response)
          // userName.value = ''
          // password.value = ''
          // repeatPassword.value = ''
          TokenService.saveAuthToken(response.authToken)
          TokenService.saveUserId(response.id)
          window.location = "/main"
      }) 
  
      .catch(res => {
          this.setState({ error: res.error })
      })  
     }


    render() {
        return (
            <div className="Register">
                <section id="signUpPage">
                <h2>Sign up</h2>
                    <form className="registerForm" onSubmit={this.registerUser}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="userName"
                            placeholder="Username"
                            onChange={(e) =>
                                this.changeUsername(e.target.value)
                            }
                            required
                        />
                        {this.state.userName.touched && (
                            <ValidationError
                                message={this.validateUserName()}
                            />
                        )}

                        <label>Password</label>
                        <input
                            type="Password"
                            name="password"
                            placeholder="Password"
                            onChange={(e) =>
                                this.changePassword(e.target.value)
                            }
                            required
                        />
                        
                        {this.state.password.touched && (
                            <ValidationError
                                message={this.validatePassword()}
                            />
                        )}

                        <label>Repeat Password</label>
                        <input
                            type="Password"
                            name="repeatPassword"
                            placeholder="Repeat Password"
                            onChange={(e) =>
                                this.updateRepeatPassword(e.target.value)
                            }
                            required
                        />
                         
                        {this.state.repeatPassword.touched && (
                            <ValidationError
                                message={this.validateRepeatPassword()}
                            />
                        )}

                        <button
                            className="signup-button"
                            id="register-button"
                            type="submit"
                            disabled={this.state.submitButtonDisabled}
                        >
                            Sign Up
                        </button>
                    </form>
                    <div className="login">
                        <p>
                            Already have an account? <a href="/user/login">Log in here</a>
                        </p>
                    </div>
                </section>
            </div>
        );
    }
}

export default FormSignUp;