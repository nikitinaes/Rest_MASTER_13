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
            let nameRole = document.getElementById("rolesCreate")
            let listRoles = []
            let roleValue = ""
            for (let i = 0; i < nameRole.options.length; i++) {
                if (nameRole.options[i].selected) {
                    listRoles.push({
                         id:     (nameRole.options[i] === 'ADMIN' ? 1: 2),
                        role: "ROLE_" + nameRole.options[i].value
                    })
                    roleValue += nameRole.options[i].innerHTML + ''
                }
            } //added

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
            document.getElementById("adminTable").click()
        })
}