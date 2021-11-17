document.getElementById('fetch-posts').onclick = function () {

    var url = 'http://jsonplaceholder.typicode.com/posts';

    sendRequest(url, 'GET', null, function (posts) {

        var listHTML = ''

        for (var post of posts) {
            listHTML += '<p>' + post.title + '</p>' + post.body
        }
        document.getElementById('post-list-container').innerHTML = listHTML;
    })
}








function sendRequest(url, method, body, callback) {
    var xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function () {
        if (xhr.readyState = 4 && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText))
        }
    }
    xhr.open(method, url)
    xhr.send(body)
}