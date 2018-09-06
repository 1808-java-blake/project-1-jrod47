console.log('Loading js ...');

function createUser(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    console.log(username);
    console.log(password);

    const user = {
        username,
        password,
        firstname,
        lastname,
        email,
        role
    }

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        } else {
          document.getElementById('error-message').innerText = 'Failed to create User at this time';
        }
        throw 'Failed to login';
      })
      .then(resp => resp.json())
      .then(resp => {
        window.location = 'http://localhost:3000/login-page/login.html';
      })
      .catch(err => {
        console.log(err);
      });
    }