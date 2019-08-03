import React from "react";
import "./style3.css";

class homePage extends React.Component {
  componentDidMount() {
    fetch("http://localhost:3001/users/test/", {
      credentials: "include",
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.success == false) {
          console.log("false");
          this.props.history.push(`/signin`);
          //window.location.href = "/signin";
        } else {
          console.log(data);
          /*document.querySelector(".profile").insertAdjacentHTML(
            "beforeend",
            `<div>Name: ${data.data.fullName}</div>
            <div>Email: ${data.data.email}</div>`
          );*/
          document.querySelector(".card1").innerHTML = `Full Name: ${
            data.data.fullName
          }`;
          document.querySelector(".card2").innerHTML = `Email Adress: ${
            data.data.email
          }`;
        }
      })
      .catch(error => {
        console.log(error);
        window.alert(error.message);
      });
  }
  logout() {
    fetch("http://localhost:3001/users/logout", {
      credentials: "include",
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        window.location.href = "/";
      })
      .catch(error => {
        console.log(error);
        window.alert(error.message);
      });
  }
  render() {
    return (
      <div className="container">
        <h1>Home Page</h1>
        <div className="container profile" />
        <div>
          <a
            className="btn btn-outline-info"
            data-toggle="collapse"
            href="#collapseExample1"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample1"
          >
            Full Name
          </a>
          <div className="collapse" id="collapseExample1">
            <div className="card1 card-body" />
          </div>
        </div>
        <div>
          <button
            className="btn btn-outline-info"
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample2"
            aria-expanded="false"
            aria-controls="collapseExample2"
          >
            Email
          </button>
        </div>
        <div className="collapse" id="collapseExample2">
          <div className="card2 card-body" />
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={this.logout}
        >
          Logout
        </button>
      </div>
    );
  }
}

export default homePage;
