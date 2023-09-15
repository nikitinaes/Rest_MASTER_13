// function deleteUser(id) {
//     function setSuccessMessage() {
//         console.log("Deleted")
//         fillTable();
//     }
//
//     fetch('/users/delete/'+id,  {
//         method: "DELETE" }).then((res)=>res.json())
//         .then(
//             (response)=>{
//                 setSuccessMessage(response.message);
//             }
//         )
// }
// function deleteUser(id) {
//     function setSuccessMessage() {
//         console.log("Deleted")
//         fillTable();
//     }
//
//     fetch('/get_user/'+id,  {
//         method: "GET" }).then(function (res) {
//         return  res.json();
//     })
//         .then(
//             (response)=>{
//                 console.log(response);
//                 window.hello = response;
//                 Object.keys(window.hello).forEach(function(k) {
//                     if(typeof(window.hello[k])!=="object") {
//                         console.log(k);
//                         console.log(k);
//                         var new_label = document.createElement('label');
//                         new_label.innerHTML = k;
//                         new_label.setAttribute("for",k);
//                         var new_input = document.createElement('input');
//                         new_input.type = "text";
//                         new_input.value = window.hello[k];
//                         new_input.setAttribute("id",k);
//
//                         $('#delete_user_form').append(new_label);
//                         $('#delete_user_form').append(new_input);
//                     }
//                 });
//
//                 console.log(response.username);
//                 $('#username_delete').val(response.username);
//                 $('#username_id').val(response.id);
//                 //console.log(res);
//
//                 setSuccessMessage(response.message);
//             }
//         )
/*
    fetch('/users/delete/'+id,  {
        method: "DELETE" }).then((res)=>res.json())
        .then(
            (response)=>{
                setSuccessMessage(response.message);
            }
        )*/
// }

function deleteUser(id) {
    const modalWindow = document.querySelector("#deleteModal");
    fillModal(modalWindow,id, '#deleteModal');

    // let findModalWindow = setInterval(function() {
    //     if (document.querySelector("#delete_user_form")){
    //         clearInterval(findModalWindow);
    //         const modalWindow = document.querySelector("#deleteModal"),
    //             modalInput = modalWindow.querySelectorAll('input'),
    //             modalSelect = modalWindow.querySelector('#role_delete');
    //         fetch(`/getUser/${id}`)
    //             .then((resp) => resp.json())
    //             .then((data) => {
    //                 modalInput.forEach((element) => {
    //                     element.value = data[element.id];
    //                 });
    //                 data.roles.forEach((item, index) => {
    //                     const option = document.createElement('option');
    //                     option.value = item.name;
    //                     option.textContent = item.name === 'ROLE_USER' ? 'USER' : 'ADMIN';
    //                     console.log(option);
    //                     const number = index + 1;
    //                     modalSelect.setAttribute('size', `${number}`);
    //                     modalSelect.append(option);
    //                 });
    //             });
    //
    //     }
    // }, 1000);

    modalWindow
        .querySelector('#deleteUserButton')
        .addEventListener('click', (e) => {
            e.preventDefault();

            deleteItem();
            // modalWindow.classList.remove('show');
            // modalWindow.style.display = 'none';
            // modalWindow.removeAttribute('role');
        });

    function deleteItem() {
        fetch('/users/delete/'+id,  {
            method: "DELETE" }).then((res)=>res.json())
            .then(
                ()=>{
                    fillTable();
                }
            )
    }
}