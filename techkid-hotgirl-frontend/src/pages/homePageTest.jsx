import React from "react";
import "./style4.css";

class homePageTest extends React.Component {
  /*componentDidMount() {
    
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

  }*/
  state = {
    currentUser: {
      email: "",
      fullName: "",
      _id: ""
    },
    imageSrc: "",
    imgFile: undefined,
    errMessage: "",
    avaUrl: "",
    postImg: []
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
          fullName: fullName
        },
        avaUrl: ava
      });

      // test hw
      document.querySelector(".fullName1").innerHTML = `${fullName}  `;
      document.querySelector(".email").innerHTML = `Email: ${email}`;
      fetch("http://localhost:3001/posts/get", { method: "GET" })
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].content.length > 267) {
              var newstr = data.data[i].content.substring(0, 267) + "...";
            } else {
              newstr = data.data[i].content;
            }
            console.log(data.data[i].imageUrl);
            document.querySelector(".postScreen").insertAdjacentHTML(
              "afterbegin",
              `<a class="card bg-light mb-3 border-light" style="width: 18rem;"
               data-toggle="modal" data-target="#exampleModalLong${i}"
               >
          <img class="card-img-top" src=${
            data.data[i].imageUrl
          }  style="height:200px" />
          <div class="card-body">
            <h5 class="card-title" >${data.data[i].author.fullName}</h5>
            <p class="card-text content-text" maxlength="200"  style="height:200px">${newstr}</p>
          </div>
          <div class="card-footer">
      <small class="text-muted">
      <i class="fas fa-eye icon"> ${data.data[i].view}</i>
      <i class="far fa-calendar-times icon"> ${data.data[i].createAt.substring(
        0,
        10
      )}</i>
      </small>
      </div>
        </a>
             
      <!-- Modal -->
      <div class="modal fade" id="exampleModalLong${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title strong" id="exampleModalLongTitle">${
                data.data[i].author.fullName
              }</h3>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <img class="card-img-top" src="${
              data.data[i].imageUrl
            }"  style="height:200px"/>
            <div class="modal-body">
            ${data.data[i].content}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>`
            );
          }
        })
        .catch(error => {
          console.log(error);
          window.alert(error.message);
        });
      // end test
    } else {
      window.location.href = "/signin";
    }
  }
  /*showPost = data => {
    for (let i = 0; i < data.data.length; i++) {
      if (data.data[i].content.length > 267) {
        var newstr = data.data[i].content.substring(0, 267) + "...";
      } else {
        newstr = data.data[i].content;
      }
      /*document
        .querySelector(".postScreen")
        .insertAdjacentHTML(
          "afterbegin",
          `<img src="${data.data[i].imageUrl}"  style="height:200px"//>`
        );
      console.log(data.data[i].imageUrl);
      document.querySelector(".postScreen").insertAdjacentHTML(
        "afterbegin",
        `<a class="card bg-light mb-3 border-light"
        onClick={this.handleView;} style="width: 18rem;"
         data-toggle="modal" data-target="#exampleModalLong${i}"
         >
    <img class="card-img-top" src="${
      data.data[i].imageUrl
    }"  style="height:200px"/>
    <div class="card-body">
      <h5 class="card-title" >${data.data[i].author.fullName}</h5>
      <p class="card-text content-text" maxlength="200"  style="height:200px">${newstr}</p>
    </div>
    <div class="card-footer">
<small class="text-muted">
<i class="fas fa-eye icon"> ${data.data[i].view}</i>
<i class="far fa-calendar-times icon"> ${data.data[i].createAt.substring(
          0,
          10
        )}</i>
</small>
</div>
  </a>
       
<!-- Modal -->
<div class="modal fade" id="exampleModalLong${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title strong" id="exampleModalLongTitle">${
          data.data[i].author.fullName
        }</h3>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <img class="card-img-top" src="${
        data.data[i].imageUrl
      }"  style="height:200px"/>
      <div class="modal-body">
      ${data.data[i].content}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>`
      );
    }
  };*/
  upperCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
  createNewPost = () => {
    //uploadimg

    if (!this.state.imgFile) {
      this.setState({
        errMessage: "Please input all"
      });
    } else {
      const formData = new FormData();
      formData.append("image", this.state.imgFile);
      fetch("http://localhost:3001/upload/image", {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json"
          //"Content-Type": "multipart/form-data"
        },
        body: formData
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          //console.log(data.data.imageUrl);
          var content = document.querySelector(".content").value;
          //console.log(content);
          fetch("http://localhost:3001/posts/create", {
            credentials: "include",
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              currentUser: this.state.currentUser,
              content: content,
              imageUrl: data.data.imageUrl
            })
          })
            .then(res => {
              return res.json();
            })
            .then(data1 => {
              console.log(data1);
              window.location.href = "/";
            })
            .catch(err => {
              console.log(err);
              this.setState({
                errMessage: err.message
              });
            });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            errMessage: error.message
          });
        });
    }
  };
  handleInputChange = event => {
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
    //validate image:size+
  };
  validateUrl(url) {
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    if (expression.test(url)) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    console.log(this.state);
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
          <button
            className="btn btn-outline-success"
            data-toggle="modal"
            data-target="#newPost"
          >
            New Posts
          </button>
          <div className="nav-item dropdown">
            <img
              src={this.state.avaUrl}
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
        <div className="postScreen container" />

        <div
          className="modal fade"
          id="newPost"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  New Post
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form
                  id="form1"
                  onSubmit={event => {
                    event.preventDefault();
                    this.createNewPost();
                  }}
                >
                  <fieldset disabled>
                    <div className="form-group">
                      <label htmlFor="disabledTextInput">Full Name:</label>
                      <input
                        type="text"
                        id="disabledTextInput"
                        className="form-control"
                        placeholder={this.state.currentUser.fullName}
                      />
                    </div>
                  </fieldset>
                  <div className="form-group">
                    <div className="input-group mb-3">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="inputGroupFile01"
                          onChange={this.handleInputChange}
                        />
                        <label
                          className="custom-file-label fileLabel"
                          htmlFor="inputGroupFile01"
                        >
                          Select file to upload...
                        </label>
                      </div>
                    </div>
                    {this.state.imageSrc ? (
                      <div>
                        <img
                          src={this.state.imageSrc}
                          alt="preview"
                          style={{ width: "200px" }}
                        />
                      </div>
                    ) : null}

                    <label htmlFor="exampleFormControlTextarea1">
                      Content:
                    </label>
                    <textarea
                      className="form-control content"
                      id="exampleFormControlTextarea1"
                      rows="10"
                      placeholder="What do you think?"
                      maxLength="500"
                      required
                    />
                  </div>
                </form>
              </div>
              {this.state.errMessage ? (
                <div className="alert alert-danger" role="alert">
                  {this.state.errMessage}
                </div>
              ) : null}
              <div className="noti container" />
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary" form="form1">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default homePageTest;