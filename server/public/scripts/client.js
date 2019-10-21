$( document ).ready( onReady );

const verbose = false;

function addTask(){
    const taskName = $( '#taskNameIn' ).val();
    if( verbose ) console.log( 'in addTask:', taskName );
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: { name: taskName }
    }).then( function( response ){
        if( verbose ) console.log( 'back from POST with:', response );
        // update tasks on page
        getTasks();
    }).catch( function( err ){
        alert( 'error adding task. See console for details' );
        if( verbose ) console.log( 'ERROR:', err );
    }) // end AJAX
} // end addTask

function completeTask(){
    let myId = $( this ).data( 'id' );
    if( verbose ) console.log( 'in completeTask:', myId );
    $.ajax({
        type: 'PUT',
        url: '/tasks/' + myId
    }).then( function( response ){
        if( verbose ) console.log( 'back from PUT with:', response );
        getTasks();
    }).catch( function ( err ) {
        alert( 'error completing task' );
        if( verbose ) console.log( 'ERROR:', err );
    })
} // end completeTask

function deleteTask(){
    let myId = $( this ).data( 'id' );
    if( verbose ) console.log( 'in deleteTask:', myId );
    $.ajax({
        type: 'DELETE',
        url: '/tasks/' + myId,
    }).then( function ( response ){
        if( verbose ) console.log( 'back from DELETE with:', response );
        getTasks();
    }).catch( function( err ){
        alert( 'error deleting task' );
        if( verbose ) console.log( 'ERROR:', err );
    })
} //end deleteTask

function getTasks(){
    if( verbose ) console.log( 'in getTasks' );
    // get AJAX call
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then( function ( response ){
        if( verbose ) console.log( 'back from GET with:', response );
        // empty output el
        let el = $( '#tasksOut' );
        el.empty();
        // loop through response
        for( let i=0; i< response.length; i++ ){
            let thisTask = response[i];
            // display each on DOM
            let appendString = `<li class="task `
            if( thisTask.status ){
                appendString += `complete"`;
            }
            else{
                appendString += `incomplete"`;
            }
            appendString +=`>${ thisTask.name }`
            if( !thisTask.status ) appendString +=`<button class="completeTaskButton" data-id="${ thisTask.id}">Complete</button>`;
            appendString +=`<button class="deleteTaskButton" data-id="${ thisTask.id}">Delete</button>`;
            el.append( appendString );
        }
        
    }).catch( function ( err ){
        alert( 'error getting tasks. see console for details' );
        if( verbose ) console.log( 'Error getting tasks:', err );
    })
}

function onReady(){
    $( '#addTaskButton' ).on( 'click', addTask );
    $( '#tasksOut' ).on( 'click', '.completeTaskButton', completeTask );
    $( '#tasksOut' ).on( 'click', '.deleteTaskButton', deleteTask );
    getTasks();
}