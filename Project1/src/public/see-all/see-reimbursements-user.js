function filterText()
	{  
		var rex = new RegExp($('#filterText').val());
		if(rex =="/all/"){clearFilter()}else{
			$('.content').hide();
			$('.content').filter(function() {
			return rex.test($(this).text());
			}).show();
	}
	}
	
function clearFilter()
	{
		$('.filterText').val('');
		$('.content').show();
	}

const role = JSON.parse(localStorage.getItem('user')).user_role;
if(role === 'Customer'){
function addReimbursementsToTable(reimbursement) {
    const tbody = document.getElementById('reimbursement-table-body');
    tbody.innerHTML += `
    <tr class="content">
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
  }else if (role === 'Manager') {
    function addReimbursementsToTable(reimbursement) {
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
        addReimbursementsToTable(reimbursement);
    })
  })
  .catch(err => {
    console.log(err);
  })
}