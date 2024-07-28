console.log('JS is sourced!');

// MY TODOS
    // 1. npm install
    // 2. Create database && check to see if server works
    // 3. Think about GET && POST and where it goes on HTML.
        // Button will need a POST
        // Will need a GET function
            // Remember to clear data
        // Will need function that displays data
            // innerHTML needs:
                // 1. <tr> and <td> to display info
                // 2. <button> to delete
                // 3. <button> to mark complete
    // 4. DELETE button will have axios.delete
    // 5. Mark complete button will UPDATE and have axios.put

let cardBody = document.querySelector('#cardBody');
let todoInput = document.querySelector('#todoInput');
let todoTitle = document.querySelector('#todoTitle');


getToDo();
// ~~~~~~~~~~~~~~~~~~~~~~~ NOTE: console.logs in BROWSER!!!!!!!!!
// ================== GET FUNCTION ================== 

function getToDo() {

    axios({
        method: 'GET',
        url: '/todos'
    })

    .then((response) => {
        let data = response.data;
        
        console.log('This is data:', data);
        displayToDo(data);
    })

    .catch((err) => {
        console.log('Error in getting data:', err);
    })
}


// ================== DISPLAY FUNCTION ================== 

function displayToDo(list) {

    cardBody.innerHTML = '';
    for(let todo of list) {

        // <div class="col-xxl-2">${todo.isComplete}</div>
        // <div class="col">
        // <button 
        //     data-testid="completeButton"
        //     type="button"
        //     class="btn btn-success"
        //     onClick="completeButton(${todo.id})">Mark Complete</button>
        // </div>

        // // --------------------- data test id's
        if(todo.isComplete === true) {
            cardBody.innerHTML += `
                <div 
                data-testid="toDoItem"
                class="completed"
                class="card-text" 
                id="todoInfo">
                    <form class="todoForm"
                    class="input-group">
                    <input 
                        data-testid="completeButton"
                        type="checkbox" 
                        id="flexCheckChecked" checked
                        class="checkbox"
                        class="form-check-input mt-0"
                        onClick="completeButton(${todo.id})">
                    <label class="todoText" for="flexCheckChecked" id="complete">${todo.text}</label>
                    <button 
                        type="button" class="btn btn-outline-danger"
                        id="deleteButton"
                        data-testid="deleteButton"
                        onClick="deleteToDo(${todo.id})">Delete
                    </button>
                    </form>
                </div>`;
            console.log(`${todo.text}:${todo.id} in ${cardBody} with complete`);

        } else if(todo.isComplete === false) {
            cardBody.innerHTML += `
                <div 
                data-testid="toDoItem"
                class="card-text" 
                id="todoInfo">
                    <form class="todoForm"
                    class="input-group">
                    <input 
                        data-testid="completeButton"
                        type="checkbox" 
                        id="flexCheckDefault"
                        class="checkbox"
                        class="form-check-input mt-0"
                        onClick="completeButton(${todo.id})">
                    <label class="todoText" for="flexCheckDefault">${todo.text}</label>
                    <button 
                        type="button" class="btn btn-outline-danger"
                        id="deleteButton"
                        data-testid="deleteButton"
                        onClick="deleteToDo(${todo.id})">Delete
                    </button>
                    </form>
                </div>`;

            // <div class="card" data-testid="toDoItem" id="todoInfo">
            //     <div class="col" id="todoText">${todo.text}</div>
            //     <div class="col" >
            //         <button 
            //             data-testid="completeButton"
            //             type="button"
            //             class="btn btn-success"
            //             onClick="completeButton(${todo.id})">Mark Complete</button>
            //     </div>
            //     <div class="col" >
            //         <button 
            //             data-testid="deleteButton"
            //             class="btn btn-danger"
            //             data-testid="deleteButton"
            //             id="deleteButton"
            //             onClick="deleteToDo(${todo.id})">Delete</button>
            //     </div>
            // </div>`;
            console.log(`${todo.text}:${todo.id} in ${cardBody} without complete`);
        }
    }
}


// ================== ADD BUTTON && POST FUNCTION ================== 

function addToDo(event) {
    event.preventDefault();

    axios({
        method: 'POST',
        url: '/todos',
        data: { text: todoInput.value, isComplete: false }
    })

    .then((response) => {
        console.log('It was sent over to server:', response.data);
        getToDo();
    })

    .catch((err) => {
        console.log('Was not sent to server:', err);
    })

    document.querySelector('#inputForm').reset();
}


// ================== DELETE FUNCTION ================== 

// STRETCH sweet-alert turned off for test
function deleteToDo(listId) {

    // swal({
    //     title: 'Are you sure?',
    //     text: 'The to-do will be permanently deleted.',
    //     icon: 'warning',
    //     buttons: true,
    //     dangerMode: true
    // }).then((deleted) => {

    //     if(deleted) {
    //         swal('Your to-do has been deleted.', {
    //             icon: 'success'
    //         });

            axiosDelete(listId);
    //     }
    // })
}

function axiosDelete(listId) {

    axios({
        method: 'DELETE',
        url: `/todos/${listId}`
    })

    .then((response) => {
        console.log('Item was deleted:', response.data);
        getToDo();
    })

    .catch((err) => {
        console.log('Did not delete item:', err);
    })

}



// ================== PUT/UPDATE FUNCTION ================== 

function completeButton(listId) {

    axios({
        method: 'PUT',
        url: `/todos/${listId}`
    })

    .then((response) => {
        console.log('Item was updated:', response.data);
        getToDo();
    })

    .catch((err) => {
        console.log('Item has not been updated:', err);
    })

}


