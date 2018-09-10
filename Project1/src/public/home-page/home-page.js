const first = JSON.parse(localStorage.getItem('user')).user_first_name;
const last = JSON.parse(localStorage.getItem('user')).user_last_name;
const role = JSON.parse(localStorage.getItem('user')).user_role;
$(document).ready(function () {
if (role == "Manager"){
    $("div.manager").show();
    }

            if (role == "Customer"){
    $("div.customer").show();
    }
});

document.getElementById('currentUser').innerText = `${first} ${last}`;
document.getElementById('currentManager').innerText = `${first} ${last}`;

