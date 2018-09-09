// function addReimbursementsToTable(reimbursement) {
//   const tbody = document.getElementById('reimbursement-table-body');
//   tbody.innerHTML += `
//   <tr>
//     <th scope="row">${reimbursement.id}</th>
//     <td>${reimbursement.type}</td>
//     <td>${reimbursement.amount}</td>
//     <td>${reimbursement.status}</td>
//     <td>${reimbursement.description}</td>
//     <td>${reimbursement.submitted}</td>
//     <td>${reimbursement.author}</td>
//     <td>${reimbursement.resolved}</td>
//     <td>${reimbursement.resolver}</td>
//   </tr>
//   `
// }

// user = JSON.parse(localStorage.getItem('user'));

// fetch('http://localhost:3000/reimbursement/')
// .then(res => res.json())
// .then(res => {
//   res.forEach(reimbursement => {
//       addReimbursementsToTable(reimbursement);
//   })
// })
// .catch(err => {
//   console.log(err);
// })

// function currentTime(){

//   var d = new Date();
//   var n = d.toLocaleString([], {year: "numeric", month: "numeric",  
//   day: "numeric", hour: '2-digit', minute: '2-digit', second: '2-digit' });
//   document.getElementById("currentTime").innerHTML = n;

// }
// currentTime();

function updateReimbursement(event) {
    event.preventDefault();

    let reimbursement = JSON.parse(localStorage.getItem('reimbursement'));
     reimbursement.status = document.getElementById('status').value;
     reimbursement.resolved = new Date().toISOString().slice(0, 19).replace('T', ' ');
     reimbursement.resolver = JSON.parse(localStorage.getItem('user')).ers_user_id;
     console.log(reimbursement)
    

    // const reimbursement = {
    //     status,
    //     resolved,
    //     resolver
    // }

fetch('http://localhost:3000/reimbursement', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(reimbursement)
    })
    .then(resp => resp.json())
    .then(resp => {
      window.location = 'http://localhost:3000/edit-reimbursement/edit-reimbursement.html';
    })
    .catch(err => {
      console.log(err);
    });
  }