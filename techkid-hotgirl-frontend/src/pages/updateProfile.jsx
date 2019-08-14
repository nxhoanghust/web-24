import React from "react";

class updateProfile extends React.Component {
  state = {
    currentUser: {
      email: "",
      fullName: "",
      _id: ""
    },
    imageSrc: "",
    imgFile: undefined,
    errMessage: "",
    avaUrl: ""
  };
  componentDidMount() {
    const email = window.localStorage.getItem("email");
    const fullName = window.localStorage.getItem("fullName");
    const id = window.localStorage.getItem("id");
    const ava = window.localStorage.getItem("avaUrl");
    if (email && fullName) {
      this.setState({
        currentUser: {
          _id: id,
          email: email,
          fullName: fullName,
          avaUrl: ava
        }
      });
      document.querySelector(".fullName1").innerHTML = `${fullName}  `;
      document.querySelector(".email").innerHTML = `Email: ${email}`;
      fetch("http://localhost:3001/users/profile", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: id
        })
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data.data);
          if (data.data.DOB || data.data.address) {
            document.querySelector(".DOB").placeholder = data.data.DOB;
            document.querySelector(".address").placeholder = data.data.address;
          }
        })
        .catch(error => {
          this.setState({
            errMessage: error.message
          });
        });
    } else {
      window.location.href = "/signin";
    }
  }

  validateForm = () => {
    var newName = document.querySelector(".newName").value;
    const dateOfBirth = document.querySelector(".DOB").value;
    const address = document.querySelector(".address").value;
    if (!newName) {
      newName = this.state.currentUser.fullName;
    }
    if (!dateOfBirth || !address) {
      this.setState({
        errMessage: "Please input all"
      });
    }
    //Uploading image
    const formData = new FormData();
    formData.append("image", this.state.imgFile);
    fetch("http://localhost:3001/upload/image", {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: formData
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          avaUrl: data.data.imageUrl
        });
        window.localStorage.setItem("avaUrl", data.data.imageUrl);
        // post to sv
        fetch("http://localhost:3001/users/update", {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            _id: this.state.currentUser._id,
            fullName: newName,
            dateOfBirth: dateOfBirth,
            address: address,
            avaUrl: data.data.imageUrl
          })
        })
          .then(res => {
            return res.json();
          })
          .then(data1 => {
            console.log(data1);
          })
          .catch(error => {
            this.setState({
              errMessage: error.message
            });
          });
      })
      .catch(error => {
        this.setState({
          errMessage: error.message
        });
      });
  };
  handleImageChange = event => {
    const imageFile = event.target.files[0];
    console.log(imageFile);
    if (!imageFile) {
      this.setState({
        errMessage: "Please choose file a picture"
      });
    }
    if (imageFile.size > 5000000) {
      this.setState({
        errMessage: "Please choose file with size <5MB"
      });
    } else if (!imageFile.name.match(/jpeg|png|jpg|PNG|JPG|JPEG/)) {
      this.setState({
        errMessage: "Not recorgnize the type"
      });
    } else {
      this.setState({
        errMessage: ""
      });
      document.querySelector(".fileLabel").innerHTML = `${imageFile.name}`;
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);
      fileReader.onloadend = data => {
        this.setState({
          imageSrc: data.target.result,
          imgFile: imageFile
        });
      };
    }
  };

  logout() {
    fetch("http://localhost:3001/users/logout", {
      credentials: "include",
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("fullName");
        window.localStorage.removeItem("id");
        if (window.localStorage.avaUrl) {
          window.localStorage.removeItem("avaUrl");
        }
        //console.log(data);
        window.location.href = "/";
      })
      .catch(error => {
        console.log(error);
        window.alert(error.message);
      });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <form
            className="form-inline col-4"
            id="form-submit"
            onSubmit={event => {
              event.preventDefault();
              this.validateForm();
            }}
          >
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
            <img
              src={this.state.currentUser.avaUrl}
              style={{
                width: "30px",
                borderRadius: "50%",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            />
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
              className="form-control newName"
              aria-label="Username"
              aria-describedby="basic-addon1"
              placeholder={this.state.currentUser.fullName}
            />
          </div>
          <div className="well">
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                className="form-control DOB"
                id="exampleInputDOB1"
                placeholder="Date of Birth"
                required
              />
            </div>
          </div>

          <label htmlFor="basic-url">Address</label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control address"
              id="basic-url"
              aria-describedby="basic-addon3"
              placeholder="Where are you form ?"
              required
            />
          </div>
          <label>Avatar</label>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={this.handleImageChange}
              required
            />
            <label className="custom-file-label fileLabel" htmlFor="customFile">
              Choose file
            </label>
            <button
              className="btn btn-primary mt-4"
              type="submit"
              form="form-submit"
            >
              Submit
            </button>
            {this.state.errMessage ? (
              <div class="alert alert-danger" role="alert">
                {this.state.errMessage}
              </div>
            ) : null}
            {this.state.imageSrc ? (
              <div>
                <img src={this.state.imageSrc} alt="preview" width="200px" />
              </div>
            ) : null}
            <div className="noti" />
          </div>
        </div>
      </div>
    );
  }
}
export default updateProfile;
