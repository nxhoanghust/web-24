import React from "react";
import "./style.css";

class registerPage extends React.Component {
  validate() {
    var noti = document.querySelector(".noti");
    while (noti.firstChild) noti.removeChild(noti.firstChild);
    var email1 = document.querySelector(".email").value;
    var password1 = document.querySelector(".password1").value;
    var password2 = document.querySelector(".password2").value;
    var fullName1 = document.querySelector(".fullName").value;
    if (!this.validateEmail(email1)) {
      document.querySelector(".noti").insertAdjacentHTML(
        "beforeend",
        `<div className="alert alert-danger" role="alert">
          Wrong email address!
        </div>`
      );
    } else if (password1.length < 6) {
      document.querySelector(".noti").insertAdjacentHTML(
        "beforeend",
        `<div classNameName="alert alert-danger" role="alert">
          Password must be at least 6 characters!
        </div>`
      );
    } else if (password1 !== password2) {
      document.querySelector(".noti").insertAdjacentHTML(
        "beforeend",
        `<div classNameName="alert alert-danger" role="alert">
          Confirm password is different from password!
        </div>`
      );
    } else {
      fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email1,
          password: password1,
          fullName: fullName1
        })
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          console.log(data.success);
          if (data.success === false) {
            document.querySelector(".noti").insertAdjacentHTML(
              "beforeend",
              `<div className="alert alert-danger" role="alert">
            ${data.message}!
        </div>`
            );
          } else {
            document.querySelector(".noti").insertAdjacentHTML(
              "beforeend",
              `<div className="alert alert-success" role="alert">
            Register succesful!
          </div>`
            );
            setTimeout(() => {
              this.props.history.push(`/signin`);
              //window.location.href = "http://localhost:3000/signin";
            }, 1500);
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
  render() {
    return (
      <div className="form-body">
        <div className="website-logo">
          <a href="/">
            <div className="logo">
              <img className="logo-size" src="./images/logo-light.svg" alt="" />
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
                  <a href="/signin">Login</a>
                  <a href="/register" className="active">
                    Register
                  </a>
                </div>
                <form
                  onSubmit={event => {
                    event.preventDefault();
                    this.validate();
                  }}
                >
                  <input
                    className="form-control fullName"
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                  />
                  <input
                    className="form-control email"
                    type="email"
                    name="email"
                    placeholder="E-mail Address"
                    required
                  />
                  <input
                    className="form-control password1"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <input
                    className="form-control password2"
                    type="password"
                    name="password"
                    placeholder="Confirm Password"
                    required
                  />
                  <div className="form-button">
                    <button id="submit" type="submit" className="ibtn">
                      Register
                    </button>
                  </div>
                </form>
                <div className="noti" />
                <div className="other-links">
                  <span>Or register with</span>
                  <a href="/register">Facebook</a>
                  <a href="/register">Google</a>
                  <a href="/register">Linkedin</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default registerPage;
