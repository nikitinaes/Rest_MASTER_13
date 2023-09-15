function fillModal (modalWindow, id, modalTarget) {
    let findModalWindow = setInterval(function() {
        if (modalWindow) {
            clearInterval(findModalWindow);
            const modalInput = modalWindow.querySelectorAll('input'),
                modalSelect = modalWindow.querySelector('select'),
                buttons = modalWindow.querySelectorAll('button');

            buttons.forEach((button) => {
                button.setAttribute('data-toggle', 'modal');
                button.setAttribute('data-target', modalTarget);
            })

            fetch(`/getUser/${id}`)
                .then((resp) => resp.json())
                .then((data) => {
                    modalInput.forEach((element) => {
                        const result = element.id.match(/(\w+)_/i);
                        const id = result ? result[1] : element.id;


                        if (id === 'password') {
                            return;
                        }
                        element.value = data[id];
                    });
                    data.roles.forEach((item, index) => {
                        const option = document.createElement('option');
                        option.value = item.name;
                        option.textContent = item.name === 'ROLE_USER' ? 'USER' : 'ADMIN';
                        console.log(option);
                        const number = index + 1;
                        modalSelect.setAttribute('size', `${number}`);
                        modalSelect.append(option);
                    });
                });
        }
    }, 1000);
}