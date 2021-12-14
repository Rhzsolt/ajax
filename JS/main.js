var state = {
    users: [],
    loggedIn: false
}


document.getElementById('login-component').innerHTML = `
 <h1>Bejelentkezés</h1>   
            <form id="login" class="p-3">
              <label class="w-100">
                Email:
                <input type="text" name="email" class="form-control"/>
              </label>
              <label class="w-100">
                Jelszó:
                <input type="password" name="password" class="form-control"/>
              </label>
              <button type="submit" class="btn btn-primary">Küldés</button>
              <div id="message" class="float-right mt-2">
              </div>
            </form>

`



function loggedin() {
    if (state.loggedIn) {
        document.getElementById('login-component').innerHTML = ''
        return
    }
}


document.getElementById('login').onsubmit = function (event) {
    event.preventDefault()
    var email = event.target.elements.email.value;
    var password = event.target.elements.password.value;
    var body = JSON.stringify({
        email: email,
        password: password
    }) 
    fetchUser(body) 
}

async function fetchUser(body) {
    var vadresp = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        body: body,
        headers: { 'content-type': 'application/json' }
    });
    if (!vadresp.ok) {
        alert('Hibás jelszó')
        return
    }
    var joresptoken = await vadresp.json();
    state.loggedIn = true
    loggedin()
    
    var vaduser = await fetch('https://reqres.in/api/users');
    if (!vaduser.ok) {
        alert('Hibás user')
        return
    }
    var jouser = await vaduser.json()
    state.users = jouser.data
    renderuser()
}


function renderuser() {
    var userHTML = ''
    for (var st of state.users) {
        userHTML += `<li>${st.first_name}${st.last_name}</li>`
    }
    document.getElementById('post-list-container').innerHTML = '<ol>' + userHTML + '</ol>';
}


window.onload = loggedin()
