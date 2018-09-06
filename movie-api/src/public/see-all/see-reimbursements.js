function addMovieToTable(reimbursement) {
    const tbody = document.getElementById('reimbursement-table-body');
    tbody.innerHTML += `
    <tr>
      <th scope="row">${reimbursement.type}</th>
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
  
  fetch('http://localhost:3000/reimbursement')
    .then(res => res.json())
    .then(res => {
      res.forEach(reimbursement => {
        addMovieToTable(reimbursement);
      })
    })
    .catch(err => {
      console.log(err);
    })