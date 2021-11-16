document.getElementById('fetch-posts').onclick = function(){
var xhr = new XMLHttpRequest;

xhr.onreadystatechange = function(){

    if(xhr.readyState === 4 && xhr.status === 200){
        var posts = JSON.parse(xhr.responseText);

        var postListHTML = '' ;
        for(var post of posts){
            postListHTML += post.body + post.title
        }

        document.getElementById('post-list-container').innerHTML = postListHTML;

    }
}
xhr.open('GET','http://jsonplaceholder.typicode.com/posts')

xhr.send()

}