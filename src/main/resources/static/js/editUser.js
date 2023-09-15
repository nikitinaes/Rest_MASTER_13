function fillEditModal(id) {
    const modalWindow = document.querySelector('#editModal');
    fillModal(modalWindow, id, '#editModal');

    const form = modalWindow.querySelector('#edit_user_form'),
        inputs = modalWindow.querySelectorAll('input'),
        select = modalWindow.querySelector('select');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const obj = {};

        inputs.forEach((input) => {
            const result = input.id.match(/(\w+)_/i);
            obj[result[1]] = input.value;
        })

        obj['roles'] = [{id: 1, name: select.value}];

       fetch('users/update/' + id, {
           method: 'PUT',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(obj)
       }).then(() => {
           fillTable();
       });
    });


}