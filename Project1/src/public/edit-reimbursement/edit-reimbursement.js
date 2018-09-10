  function addReimbursementsToTable(reimbursement) {
    const tbody = document.getElementById('reimbursement-table-body');
    tbody.innerHTML += `
    <tr>
      <th scope="row">${reimbursement.id}</th>
      <td>${reimbursement.type}</td>
      <td>${reimbursement.amount}</td>
      <td>${reimbursement.status}</td>
      <td>${reimbursement.description}</td>
      <td>${reimbursement.submitted}</td>
      <td>${reimbursement.author}</td>
      <td>${reimbursement.resolved}</td>
      <td>${reimbursement.resolver}</td>
    </tr>
    `
  }

user = JSON.parse(localStorage.getItem('user'));
  
  fetch('http://localhost:3000/reimbursement/')
  .then(res => res.json())
  .then(res => {
    res.forEach(reimbursement => {
        addReimbursementsToTable(reimbursement);
    })
  })
  .catch(err => {
    console.log(err);
  })

//   function currentTime(){

//     var d = new Date();
//     var n = d.toLocaleString([], {year: "numeric", month: "numeric",  
//     day: "numeric", hour: '2-digit', minute: '2-digit', second: '2-digit' });
//     document.getElementById("currentTime").innerHTML = n;
  
//   }
//   currentTime();
  
  function updateReimbursement(event) {      
        fetch(`http://localhost:3000/reimbursement/reimbursements/${document.getElementById('id').value}`)
        .then(resp => {
            if (resp.status === 401) {
              document.getElementById('error-message').innerText = 'Invalid Credentials';
            } else if (resp.status === 200) {
              return resp.json();
            } else {
              document.getElementById('error-message').innerText = 'Failed to Login at this time';
            }
            throw 'Failed to login';
          })
    .then(resp => {
        localStorage.setItem('reimbursement', JSON.stringify(resp));
        window.location = 'http://localhost:3000/edit-reimbursement2/edit-reimbursement2.html';
      })
      .catch(err => {
        console.log(err);
      });
  }
