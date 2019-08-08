import React from "react";
import "./style2.css";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

class signInPage extends React.Component {
  componentDidMount() {
    fetch("http://localhost:3001/users/test/", {
      credentials: "include",
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.success == true) {
          this.props.history.push(`/profile`);
        }
      })
      .catch(error => {
        console.log(error);
        window.alert(error.message);
      });
  }
  validate() {
    var noti = document.querySelector(".noti");
    while (noti.firstChild) noti.removeChild(noti.firstChild);
    var email1 = document.querySelector(".email").value;
    var password1 = document.querySelector(".password").value;
    if (!this.validateEmail(email1)) {
      document.querySelector(".noti").insertAdjacentHTML(
        "beforeend",
        `<div classNameName="alert alert-danger" role="alert">
          Wrong email address
        </div>`
      );
    } else if (password1.length < 6) {
      document.querySelector(".noti").insertAdjacentHTML(
        "beforeend",
        `<div classNameName="alert alert-danger" role="alert">
          Password must be at least 6 characters
        </div>`
      );
    } else {
      fetch("http://localhost:3001/users/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email1,
          password: password1
        })
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          if (data.success === false) {
            document.querySelector(".noti").insertAdjacentHTML(
              "beforeend",
              `<div classNameName="alert alert-danger" role="alert">
            ${data.message}!
        </div>`
            );
          } else {
            document.querySelector(".noti").insertAdjacentHTML(
              "beforeend",
              `<div classNameName="alert alert-success" role="alert">
            Log in succesful
          </div>`
            );
            //console.log(this.props.history);
            setTimeout(() => {
              //this.props.history.;
              this.props.history.push(`/profile`);
              //window.location.href ="http://localhost:3000";
            }, 1000);
          }
        })
        .catch(error => {
          console.log(error);
          window.alert(error.message);
        });
    }
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  responseGoogle = response => {
    console.log(response);
    if (response.error) {
      console.log(response.error);
      window.alert(response.error);
    } else {
      fetch("http://localhost:3001/users/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: response.tokenId
        })
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          document.querySelector(".noti").insertAdjacentHTML(
            "beforeend",
            `<div classNameName="alert alert-danger" role="alert">
        ${data.message}!
    </div>`
          );
          //this.props.history.;
          this.props.history.push(`/profile`);
          //window.location.href ="http://localhost:3000";
        })
        .catch(error => {
          console.log(error);
          window.alert(error.message);
        });
    }
  };

  render() {
    return (
      <div className="form-body">
        <div className="website-logo">
          <a href="/signin">
            <div className="logo">
              <img className="logo-size" src="images/logo-light.svg" alt="" />
            </div>
          </a>
        </div>
        <div className="row">
          <div className="img-holder">
            <div className="bg" />
            <div className="info-holder" />
          </div>
          <div className="form-holder">
            <div className="form-content">
              <div className="form-items">
                <h3>Get more things done with Loggin platform.</h3>
                <p>
                  Access to the most powerfull tool in the entire design and web
                  industry.
                </p>
                <div className="page-links">
                  <a href="/signin" className="active">
                    Login
                  </a>
                  <a href="/register">Register</a>
                </div>
                <form
                  onSubmit={event => {
                    event.preventDefault();
                    this.validate();
                  }}
                >
                  <input
                    className="form-control email"
                    type="text"
                    name="username"
                    placeholder="E-mail Address"
                    required
                  />
                  <input
                    className="form-control password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <input type="checkbox" id="chk1" />
                  <label htmlFor="chk1">Remmeber me</label>
                  <div className="form-button">
                    <button id="submit" type="submit" className="ibtn">
                      Login
                    </button>{" "}
                    <a href="forget2.html">Forget password?</a>
                  </div>
                </form>
                <div className="noti" />
                <div className="other-links">
                  <span>Or login with</span>
                  {/*
                  <GoogleLogin
                    className="google"
                    clientId="992650410090-m4eo9ap8k0vkm3r4m0mefj3sfdt2jo35.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  >
                    Google
                  </GoogleLogin>*/}
                  ,<a href="/signin">Facebook</a>
                  <a href="/signin">Google</a>
                  <a href="/signin">Linkedin</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default signInPage;
