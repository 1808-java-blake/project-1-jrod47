function currentTime(){

  var d = new Date();
  var n = d.toLocaleString([], {year: "numeric", month: "short",  
  day: "numeric", hour: '2-digit', minute: '2-digit', second: '2-digit' });
  document.getElementById("currentTime").innerHTML = n;

  setTimeout(function () {
      currentTime()
  }, 500);
}
currentTime();

console.log('Loading js ...');

function createReimbursement(event) {
    event.preventDefault();

    const amount = document.getElementById('username').value;
    const status = "Pending";
    const type = document.getElementById('type').value;
    const description = document.getElementById('lastname').value;
    const submitted = document.getElementById('currentTime').valuel;
    const author = JSON.parse(localStorage.getItem('user')).ers_user_id;
    

    const reimbursement = {
        amount,
        status,
        type,
        description,
        submitted,
        author
    }

    fetch('http://localhost:3000/reimbursement', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        reimbursement: 'include',
        body: JSON.stringify(reimbursement)
      })
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        } else {
          document.getElementById('error-message').innerText = 'Failed to create Reimbursement at this time';
        }
        throw 'Failed to Create Reimbursement';
      })
      .then(resp => resp.json())
      .then(resp => {
        window.location = 'http://localhost:3000/login-page/login.html';
      })
      .catch(err => {
        console.log(err);
      });
    }