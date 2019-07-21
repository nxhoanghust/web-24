
window.onload = () => {
    function debounce(func, wait) {
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
    };
    let x = document.getElementById("search");
    document.querySelector('#keyword').addEventListener("input", debounce(() => {
        document.querySelector('#result-list').innerHTML = "";

        document.querySelector('#loading').innerHTML = "Loading ...";
        var test = document.querySelector('#keyword').value;


        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${test}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`, {
            method: 'GET',
        })
            .then((res) => {
                document.querySelector('#loading').innerHTML = "";
                return res.json();
            })
            .then((data) => {
                //console.log(data);
                //console.log(data.items);
                var item = document.querySelector(`#result-list`);
                if (data.items.length == 0) {
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
    }, 1000));
    x.addEventListener('submit', (event) => {
        event.preventDefault();
        var test = document.querySelector('#keyword').value;
        console.log(test);

        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${test}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`, {
            method: 'GET',
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                //console.log(data);
                //console.log(data.items);
                var item = document.querySelector(`#result-list`);
                if (data.items.length == 0) {
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
    });


}
