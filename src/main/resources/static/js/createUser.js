const urlPost = '/users/add'
$(document).ready();
{

    const button = document.querySelector('button');
    // button.setAttribute('data-toggle', 'tab');
    // button.setAttribute('href', '#adminTable');
    const links = document.querySelector('.tabs').querySelectorAll('a');
    
    console.log(button);
    button
        .addEventListener('click', (e) => {
            e.preventDefault()
            console.log(123)
            const addUser = document.querySelector('#newUser');
            let nameRole = addUser.querySelectorAll("option");
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
                links[0].classList.add('active');
                links[1].classList.remove('active');
                document.querySelector('#adminTable').classList.add('active', 'show');
                document.querySelector('#newUser').classList.remove('active', 'show');
                fillTable();
            })
            document.getElementById("adminTable").click();
        })
}