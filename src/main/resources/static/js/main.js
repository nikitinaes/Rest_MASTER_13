const url = 'http://localhost:8030/users';
const addUserForm = document.querySelector('.addForm');
$(document).ready(); {
    fillTable();
}

function fillTable() {
    fetch(url).then(
        response => {
            response.json().then(
                data => {
                    let temp = "";
                    data.forEach((user) => {
                        temp += "<tr>";
                        temp += "<td>" + user.id + "</td>";
                        temp += "<td>" + user.username + "</td>";
                        temp += "<td>" + user.email + "</td>";
                        temp += "<td>" + user.roles.map(role => role.name === 'ROLE_USER' ? 'ROLE_USER' : 'ROLE_ADMIN') + "</td>";
                        temp += "<td>" +
                            "<a class='btn btn-info' role='button' onclick='fillEditModal(" + user.id + ")'  data-toggle='modal' data-target='#editModal'>Edit</a>" +
                            "</td>";
                        temp += "<td>" +
                            "<a class='btn btn-danger' role='button' onclick='deleteUser(" + user.id + ")' data-toggle='modal' data-target='#deleteModal'>Delete</a>" +
                            "</td>"
                        temp += "</tr>"
                    })
                    $('table tbody').empty().append(temp);
                });
        });
}``




