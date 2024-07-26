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

let tableBody = document.querySelector('#tableBody');
let todoInput = document.querySelector('#todoInput');


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
        
        tableBody.innerHTML = '';
        for(let todo of data) {

            // --------------------- data test id's
            if(todo.isComplete === true) {

                tableBody.innerHTML += `

                <tr data-testid="toDoItem" id="todoInfo" class="complete">
                    <td id="todoText">${todo.text}</td>
                    <td >${todo.isComplete}</td>
                    <td >
                        <button 
                            data-testid="completeButton"
                            onClick="completeButton(${todo.id})">Mark Complete</button>
                    </td>
                    <td >
                        <button 
                            data-testid="deleteButton"
                            onClick="deleteToDo(${todo.id})">Delete</button>
                    </td>
                </tr>`;

                console.log(`${todo.text}:${todo.id} in ${tableBody} with complete`);

            } else if(todo.isComplete === false) {

                tableBody.innerHTML += `

                <tr data-testid="toDoItem" id="todoInfo">
                    <td id="todoText">${todo.text}</td>
                    <td >${todo.isComplete}</td>
                    <td >
                        <button 
                            data-testid="completeButton"
                            onClick="completeButton(${todo.id})">Mark Complete</button>
                    </td>
                    <td >
                        <button 
                            data-testid="deleteButton"
                            onClick="deleteToDo(${todo.id})">Delete</button>
                    </td>
                </tr>`;

                console.log(`${todo.text}:${todo.id} in ${tableBody} without complete`);
            }

        }
    })

    .catch((err) => {
        console.log('Error in getting data:', err);
    })
}


// ================== DISPLAY FUNCTION ================== 

// function displayToDo(list) {

//     tableBody.innerHTML = '';
//     for(let todo of list) {
//         // --------------------- data test id's
//         tableBody.innerHTML += `

//             <tr data-testid="toDoItem">
//                 <td data-testid="toDoItem" id="todoInfo">${todo.text}</td>
//                 <td data-testid="toDoItem" >${todo.isComplete}</td>
//                 <td data-testid="toDoItem" >
//                     <button 
//                         data-testid="completeButton"
//                         onClick="markComplete(${todo.id})">Mark Complete</button>
//                 </td>
//                 <td data-testid="toDoItem" >
//                     <button 
//                         data-testid="deleteButton"
//                         onClick="deleteToDo(${todo.id})">Delete</button>
//                 </td>
//             </tr>`;

//         if(todo.isComplete === true) {
//             document.querySelector('#todoInfo').classList.add('complete');
//         }
//     }
// }


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

function deleteToDo(listId) {

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


