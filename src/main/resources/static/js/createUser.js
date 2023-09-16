const urlPost = '/users/add'
$(document).ready();
{
    console.log('starting')
    $('#addForm').css('border', '1px solid red');
    const newUserForm = document.querySelector('button')
    console.log(newUserForm);
    newUserForm
        .addEventListener('click', (e) => {
            e.preventDefault()
            console.log(123)
            let nameRole = document.querySelectorAll("option");
            let listRoles = []
            nameRole.forEach((option, i) => {
                if (option.selected) {
                    listRoles.push({id: i + 1, name: option.value});
                }
            });
            console.log(listRoles);

            fetch(urlPost, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    username: document.getElementById("usernameCreate").value,
                    password: document.getElementById("passwordCreate").value,
                    email: document.getElementById("emailCreate").value,
                    roles: listRoles
                })
            }).then(() => {
                fillTable();
            })
            document.getElementById("adminTable").click();
        })
}