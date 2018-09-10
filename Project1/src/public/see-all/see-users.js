function addUsersToTable(users) {
    const tbody = document.getElementById('reimbursement-table-body');
    tbody.innerHTML += `
    <tr>
      <th scope="row">${users.username}</th>
      <td>${users.firstname}</td>
      <td>${users.lastname}</td>
      <td>${users.email}</td>
      <td>${users.role}</td>
    </tr>
    `
  }
  
  fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(res => {
      res.forEach(users => {
        addUsersToTable(users);
      })
    })
    .catch(err => {
      console.log(err);
    })