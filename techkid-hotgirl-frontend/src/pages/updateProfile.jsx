import React from "react";
class updateProfile extends React.Component {
  state = {
    currentUser: {
      email: "",
      fullName: "",
      _id: ""
    }
  };
  componentDidMount() {
    const email = window.localStorage.getItem("email");
    const fullName = window.localStorage.getItem("fullName");
    const id = window.localStorage.getItem("id");
    if (email && fullName) {
      this.setState({
        currentUser: {
          _id: id,
          email: email,
          fullName: fullName
        }
      });

      document.querySelector(".fullName1").innerHTML = `${fullName}  `;
      document.querySelector(".email").innerHTML = `Email: ${email}`;
    } else {
      window.location.href = "/signin";
    }
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
              <a className="dropdown-item" href="/update-profile">
                Update profile
              </a>
              <div className="dropdown-divider" />
              <button className="dropdown-item" onClick={this.logout}>
                Logout
              </button>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Full Name:
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Username"
              aria-describedby="basic-addon1"
              placeholder={this.state.currentUser.fullName}
            />
          </div>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                @example.com
              </span>
            </div>
          </div>

          <label for="basic-url">Your vanity URL</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon3">
                https://example.com/users/
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
            />
          </div>

          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">With textarea</span>
            </div>
            <textarea className="form-control" aria-label="With textarea" />
          </div>
        </div>
      </div>
    );
  }
}
export default updateProfile;
