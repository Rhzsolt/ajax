var state = [];


document.getElementById('login').onsubmit = function (event) {
    event.preventDefault();
    var email = event.target.elements.email.value;
    var password = event.target.elements.password.value
    var body = JSON.stringify({
        email: email,
        password: password
    })

    fetch('https://reqres.in/api/login', {
        method: 'POST',
        body: body,
        headers: { 'content-type': 'application/json' }
    })
        .then(function (vadToken) {
            console.log()
            if (!vadToken.ok) {
                return Promise.reject('Login hiba')
            }
            return vadToken.json()
        })
        .then(function (joToken) {
            console.log()
            return fetch('https://reqres.in/api/users')
        })
        .then(function (vadUser) {
            console.log()
            if (!vadUser.ok) {
                return Promise.reject('User error')
            }

            return vadUser.json()
        })

        .then(function (joUser) {
            state = joUser.data;
            renderUser()
        })

        .catch(function (x) {
            console.log(x)
        })


}

function renderUser() {
    var userHTML = '';
    for (var user of state) {
        userHTML += `<li class="list-group-item">${user.first_name} ${user.last_name}</li>`
    }
    document.getElementById("user-list-container").innerHTML ='<ul class="list-group">' + userHTML + '</ul>'; 
}