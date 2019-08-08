import React from "react";
import "./style4.css";

class homePageTest extends React.Component {
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
          document.querySelector(".fullName").innerHTML = `FullName: ${
            data.data.fullName
          }`;
          document.querySelector(".fullName1").innerHTML = `${
            data.data.fullName
          }  `;
          document.querySelector(".email").innerHTML = `Email: ${
            data.data.email
          }`;
          if (data.data.img) {
            document
              .querySelector(".fullName1")
              .insertAdjacentHTML(
                "afterbegin",
                `<img src=${data.data.img} class="ava" height="30" width="30">`
              );
          }
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
      <div>
        <nav className="navbar navbar-light bg-light">
          <form className="form-inline col-4">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
          <nav className="navbar navbar-expand-lg navbar-light bg-light col-4">
            <a className="navbar-brand" href="/profile">
              TechKid HotGirl
            </a>
          </nav>
          <div className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle fullName1"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              href="/"
            />
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <div className="dropdown-item email" />
              <div className="dropdown-item fullName" />
              <div className="dropdown-divider" />
              <button className="dropdown-item" onClick={this.logout}>
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default homePageTest;
