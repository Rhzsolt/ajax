/*
    Login url: https://reqres.in/api/login
    Body:
    {
      email: "eve.holt@reqres.in",
      password: "ok"
    }

    Users url: https://reqres.in/api/users
*/

var state = {
    users: [],
    isLoggedIn: false,
    isLoginPending: false
};

window.onload = renderLoginComponent;

function renderLoginComponent() {
    if (state.isLoggedIn) {
        document.getElementById("login-component").innerHTML = "";
        return;
    }

    document.getElementById("login-component").innerHTML = `
        <div class="card p-3">    
          <h1>Bejelentkezés</h1>   
          <form id="login" class="p-3">
            <label class="w-100">
              Email:
              <input type="text" name="email" class="form-control" ${state.isLoginPending ? "disabled" : ""
        }  />
            </label>
            <label class="w-100">
              Jelszó:
              <input type="password" name="password" class="form-control" ${state.isLoginPending ? "disabled" : ""
        } />
            </label>
            <button type="submit" class="btn btn-primary" ${state.isLoginPending ? "disabled" : ""
        }>Küldés</button>
            <div id="message" class="float-right mt-2">
              ${state.isLoginPending ? "Bejelentkezés folyamatban..." : ""}
            </div>
          </form>
        </div>
    `;

    document.getElementById("login").onsubmit = function (event) {
        event.preventDefault();
        var email = event.target.elements.email.value;
        var password = event.target.elements.password.value;
        var body = JSON.stringify({
            email: email,
            password: password
        });
        state.isLoginPending = true;
        renderLoginComponent();


        fetch("https://reqres.in/api/login", {
            method: "POST",
            body: body,
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(function (vadtoken) {
                if (!vadtoken.ok) {
                    return Promise.reject("Bejelentkezés sikertelen");
                }
                return vadtoken.json();
            })
            .then(function (jotoken) {
                state.isLoggedIn = true;
                state.isLoginPending = false;
                renderLoginComponent();
                return fetch("https://reqres.in/api/users");
            })
            .then(function (vaduser) {
                if (!vaduser.ok) {
                    return Promise.reject("users error");
                }
                return vaduser.json();
            })
            // action
            .then(function (jouser) {
                // state change
                state.users = jouser.data;
                // render
                renderUsers();
            })
            .catch(function (error) {
                state.isLoginPending = false;
                renderLoginComponent();
                alert(error);
            });

    };
}

function renderUsers() {
    var userHTML = '';
    for (var st of state.users) {
        userHTML += `<li>${st.first_name} ${st.last_name}</li>`
    }
    document.getElementById("user-list-container").innerHTML = '<ul>' + userHTML + '</ul>'
}
