function currentTime(){

  var d = new Date();
  var n = d.toLocaleString([], {year: "numeric", month: "short",  
  day: "numeric", hour: '2-digit', minute: '2-digit', second: '2-digit' });
  document.getElementById("currentTime").innerHTML = n;

}
currentTime();

console.log('Loading js ...');

function createReimbursement(event) {
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const status = "Pending";
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const submitted = new Date().toISOString().slice(0, 19).replace('T', ' ');
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

      body: JSON.stringify(reimbursement)

    })
    .then(resp => resp.json())
    .then(resp => {
      localStorage.setItem('reimbursement', JSON.stringify(resp));
      window.location = 'http://localhost:3000/see-all/see-reimbursements.html';
    })
    .catch(err => {
      console.log(err);
    });
  }
  