import React from "react";

class homePage extends React.Component {
  componentDidMount() {
    fetch("http://localhost:3001/users/test/", {
      method: "GET",
      credentials: "include"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
        window.alert(error.message);
      });
  }
  render() {
    return <div>Home Page</div>;
  }
}

export default homePage;
