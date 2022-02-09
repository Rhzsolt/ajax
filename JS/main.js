/*document.getElementById('users').onclick = function(){
    var xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function(){
        if(xhr.readyState ===4 && xhr.status ===200){
            var posts = JSON.parse(xhr.responseText)
            var postHTML='';
            for(var post of posts){
                postHTML +='<h5>'+ post.title+ '</h5>' + post.body
            }
            document.getElementById("user-list-container").innerHTML = postHTML
        }
    }

    xhr.open('GET','http://jsonplaceholder.typicode.com/Posts')
    xhr.send()
}*/
/////////////////////////////////////////////////----CALLBACK---//////////////////////////////////////
/*
document.getElementById('users').onclick = function(){
    let url = 'http://jsonplaceholder.typicode.com/Posts'
    sendRequest(url,'GET',null,function(Posts){
        var postHTML='';
            for(var post of Posts){
                postHTML +='<h5>'+ post.title+ '</h5>' + post.body
            }
            document.getElementById("user-list-container").innerHTML = postHTML
    })
}

function sendRequest(url, method, body, callback) {
    var xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText))
        }
    }
    xhr.open(method, url)
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.send(body)

}*/
//////////////////////////////////-----CALLBACK-----///////////////////////////////////////////////////////
/*
document.getElementById('users').onclick = function(){
    let url ='https://reqres.in/api/user'
    let body =JSON.stringify({
        email:'eve.holt@reqres.in',
        password:'citislicka'
    })
    sendRequest(url,'GET',null,function(users){
        console.log(users.data)
        var postHTML='';
       for(let user of users.data){
        postHTML+= `<p>${user.name}</p>`
        }
        
           document.getElementById("user-list-container").innerHTML = postHTML
    })
}

function sendRequest(url, method, body, callback) {
    var xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText))
        }
    }
    xhr.open(method, url)
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.send(body)

}*/

///////////////////////////////////////---PROMISE---//////////////////////////////////////


/*document.getElementById('users').onclick = function(){
    let url ='https://reqres.in/api/login'
    let body =JSON.stringify({
        email:'eve.holt@reqres.in',
        password:'citislicka'
    })

    sendRequest(url,'POST',body)
    .then(function(token){
        return sendRequest('https://reqres.in/api/login','GET',null)
    })
    .then(x=>console.log(x.data[1].name))
    
}
function sendRequest(url,method,body){
    return new Promise(function(resolve,reject){
        var xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status>= 200 && xhr.status<300){
                    resolve(JSON.parse(xhr.responseText))
                }
                else{reject(xhr.responseText)}
            }
        }
      xhr.open(method,url) 
      xhr.setRequestHeader('content-type','application/json') 
      xhr.send(body)
    })
    
}*/
/////////////////////////---FETCH----------////////////////////////////////////////////////////////

/*document.getElementById('login').onsubmit = function(event){
    event.preventDefault()
    let email= event.target.elements.email.value;
    let password = event.target.elements.password.value;
    let body = JSON.stringify({
        email:email,
        password:password
    })

    fetch('https://reqres.in/api/login',{
method:'POST',
body:body,
headers:{'content-type':'application/json'}
    })
    .then(function(vtoken){
        if(!vtoken.ok){return Promise.reject('Hiba')}
        return vtoken.json()
    })
    .then(function(jtoken){
        return fetch('https://reqres.in/api/user')
    })
    .then(function(vuser){
        return vuser.json()
    })
    .then(function(juser){
        console.log(juser.data[1].name)
    })
    .catch(function(x){
        alert(x)
    })
    
}*/
//////////////////---ASYNC FÜGGVÉNY FETCH-----///////////////////////////////////
/*let state =[
    users ='',
    logged = false
]

document.getElementById("empty").innerHTML = `
<div class="card p-3">
    <h1>Bejelentkezés</h1>
    <form id="login" class="p-3">
        <label class="w-100">
            Email:
            <input type="text" name="email" class="form-control" />
        </label>
        <label class="w-100">
            Jelszó:
            <input type="password" name="password" class="form-control" />
        </label>
        <button type="submit" class="btn btn-primary">Küldés</button>
        <div id="message" class="float-right mt-2">
        </div>
    </form>
    <div id="login-component"></div>
</div>
`

document.getElementById('login').onsubmit = function (event) {
    event.preventDefault()
    let email = event.target.elements.email.value
    let password = event.target.elements.password.value
    let body = JSON.stringify({
        email: email,
        password: password
    })
Fetchuser(body)
}

async function Fetchuser(body) {
    let vtoken = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        body: body,
        headers: { 'content-type': 'application/json' }
    })
    let jtoken= await vtoken.json()
    let vuser= await fetch('https:/reqres.in/api/user')
let juser= await vuser.json()
state.users = juser.data
Renderuser()
state.logged = true;
loggedin()

}


function Renderuser(){

    let userHTML =''
    for(let user of state.users){
       userHTML+= `<p>${user.name} </p>`
    }
    document.getElementById("user-list-container").innerHTML=userHTML
}

function loggedin(){
    if(state.logged){document.getElementById("empty").innerHTML =''}
}

window.onload =loggedin()*/