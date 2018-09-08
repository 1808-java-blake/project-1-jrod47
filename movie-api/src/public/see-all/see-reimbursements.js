function addReimbursementsToTable(reimbursement) {
    const tbody = document.getElementById('reimbursement-table-body');
    tbody.innerHTML += `
    <tr>
      <th scope="row">${reimbursement.reimb_type}</th>
      <td>${reimbursement.reimb_amount}</td>
      <td>${reimbursement.reimb_status}</td>
      <td>${reimbursement.reimb_description}</td>
      <td>${reimbursement.reimb_submitted}</td>
      <td>${reimbursement.reimb_author_id}</td>
      <td>${reimbursement.reimb_resolved}</td>
      <td>${reimbursement.reimb_resolver_id}</td>
    </tr>
    `
  }

  user = JSON.parse(localStorage.getItem('user'));
  
  fetch(`http://localhost:3000/reimbursement/${user.ers_user_id}`)
  .then(res => res.json())
  .then(res => {
    res.forEach(reimbursement => {
        addReimbursementsToTable(reimbursement);
    })
  })
  .catch(err => {
    console.log(err);
  })