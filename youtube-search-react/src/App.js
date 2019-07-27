import React from 'react';
import _ from "lodash";
import './App.css'

class App extends React.Component {
  state = {
    keyword: '',
  };
  submitFuntion = (event) => {
    event.preventDefault();
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${this.state.keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`, {
      method: "GET",
    })
      .then((res) => {
        document.querySelector('#loading').innerHTML = "";
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.items.length === 0) {
          document.querySelector('#loading').innerHTML = "No result found!!";
        } else {
          for (let i = 0; i < data.items.length; i++) {
            document.querySelector(`#result-list`).insertAdjacentHTML('beforeend', `<a class="result col-md-12" href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}?autoplay=true" target="_blank">
          <img src="${data.items[i].snippet.thumbnails.medium.url}" alt="">
          <div class="video_info">
              <h2 class="title">${data.items[i].snippet.title}</h2>
              <p class="description">${data.items[i].snippet.description}</p>  
              <span>View >></span>
              </div>
          </a>`);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.message);
      });
  };

  /*debounce(func, wait) {
    var timeout;

    return function () {
      var context = this,
        args = arguments;

      var executeFunction = function () {
        func.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(executeFunction, wait);
    };
  };*/

  rekeyword = _.debounce((e) => {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${this.state.keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`, {
      method: 'GET',
    })
      .then((res) => {
        document.querySelectorAll('.loadend').innerHTML = "";
        document.querySelector('#loading').innerHTML = "";
        return res.json();
      })
      .then((data) => {
        console.log(data);
        //console.log(data.items);
        var item = document.querySelector(`#result-list`);
        if (data.items.length === 0) {
          document.querySelector('#loading').innerHTML = "No result found!!";
        } else {
          for (let i = 0; i < data.items.length; i++) {
            item.insertAdjacentHTML('beforeend', `<a class="result col-md-12" href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}?autoplay=true" target="_blank">
                        <img src="${data.items[i].snippet.thumbnails.medium.url}" alt="">
                        <div class="video_info">
                            <h2 class="title">${data.items[i].snippet.title}</h2>
                            <p class="description">${data.items[i].snippet.description}</p>  
                            <span>View >></span>
                            </div>
                        </a>`);
          }
          document.querySelector('#result-list').insertAdjacentHTML('afterend', '<div class="loadend">Loading...</div>');
          window.onscroll = _.debounce(() => {
            var d = document.documentElement;
            var offset = d.scrollTop + window.innerHeight;
            var height = d.offsetHeight;

            if (offset >= height) {
              fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=chipu&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${data.nextPageToken}`, {
                method: "GET",
              })
                .then((res) => {
                  document.querySelectorAll('#loading').innerHTML = "";
                  document.querySelectorAll('.loadend').innerHTML = "";
                  return res.json();
                })
                .then((nextData) => {
                  var item = document.querySelector(`#result-list`);
                  for (let i = 0; i < nextData.items.length; i++) {
                    item.insertAdjacentHTML('beforeend', `<a class="result col-md-12" href="https://www.youtube.com/watch?v=${nextData.items[i].id.videoId}?autoplay=true" target="_blank">
                                    <img src="${nextData.items[i].snippet.thumbnails.medium.url}" alt="">
                                    <div class="video_info">
                                        <h2 class="title">${nextData.items[i].snippet.title}</h2>
                                        <p class="description">${nextData.items[i].snippet.description}</p>  
                                        <span>View >></span>
                                        </div>
                                    </a>`);
                  }
                })
                .catch((error) => {
                  console.log(error);
                  window.alert(error.message);
                });
            }
          }, 1000);

        }
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.message);
      });
  }, 1000);


  /*changeFuntion(event) {
    document.querySelector(`#result-list`).innerHTML = '';
    document.querySelector('#loading').innerHTML = "Loading ...";
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${event.target.value}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`, {
      method: 'GET',
    })
      .then((res) => {
        document.querySelector('#loading').innerHTML = "";
        return res.json();
      })
      .then((data) => {
        console.log(data);
        //console.log(data.items);
        var item = document.querySelector(`#result-list`);
        if (data.items.length === 0) {
          document.querySelector('#loading').innerHTML = "No result found!!";
        } else {
          for (let i = 0; i < data.items.length; i++) {
            item.insertAdjacentHTML('beforeend', `<a class="result col-md-12" href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}?autoplay=true" target="_blank">
                        <img src="${data.items[i].snippet.thumbnails.medium.url}" alt="">
                        <div class="video_info">
                            <h2 class="title">${data.items[i].snippet.title}</h2>
                            <p class="description">${data.items[i].snippet.description}</p>  
                            <span>View >></span>
                            </div>
                        </a>`);
          }
          window.onscroll = function () {
            var d = document.documentElement;
            var offset = d.scrollTop + window.innerHeight;
            var height = d.offsetHeight;

            if (offset >= height) {
              fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=chipu&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${data.nextPageToken}`, {
                method: "GET",
              })
                .then((res) => {
                  return res.json();
                })
                .then((nextData) => {
                  var item = document.querySelector(`#result-list`);
                  for (let i = 0; i < nextData.items.length; i++) {
                    item.insertAdjacentHTML('beforeend', `<a class="result col-md-12" href="https://www.youtube.com/watch?v=${nextData.items[i].id.videoId}?autoplay=true" target="_blank">
                                    <img src="${nextData.items[i].snippet.thumbnails.medium.url}" alt="">
                                    <div class="video_info">
                                        <h2 class="title">${nextData.items[i].snippet.title}</h2>
                                        <p class="description">${nextData.items[i].snippet.description}</p>  
                                        <span>View >></span>
                                        </div>
                                    </a>`);
                  }
                })
                .catch((error) => {
                  console.log(error);
                  window.alert(error.message);
                });
            }
          };

        }
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.message);
      });
  }*/

  render() {
    console.log(this.state.keyword);
    return (
      <div>
        <form id="search" onSubmit={this.submitFuntion}>
          <div className="form-group">
            <input type="text"
              name="keyword"
              id="keyword"
              className="form-control"
              required
              onChange={(event) => {
                this.setState({
                  keyword: event.target.value,
                });
                document.querySelector(`#result-list`).innerHTML = '';
                document.querySelector('#loading').innerHTML = "Loading ...";
                this.rekeyword(event);
                if(document.querySelector('.loadend')!= null){
                  document.querySelector('.loadend').innerHTML = "";
                }
              }
                //console.log(event.target.value);
                /* this.setState({
                   keyword: event.target.value,
                 });
                 //this.handleChange(event.target.value);
                 this.changeFuntion(event);
                 //this.submitFuntion();*/
              } />
            <input type="submit" className="btn btn-primary form-control" value="Submit" />
          </div>
        </form>
        <div id="loading"></div>
        <div id="result-list">

        </div>
      </div>
    );
  }
}

export default App;