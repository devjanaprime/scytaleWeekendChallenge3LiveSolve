$( document ).ready( onReady );

function addTask(){
    const taskName = $( '#taskNameIn' ).val();
    console.log( 'in addTask:', taskName );
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: { name: taskName }
    }).then( function( response ){
        console.log( 'back from POST with:', response );
        // update tasks on page
        getTasks();
    }).catch( function( err ){
        alert( 'error adding task. See console for details' );
        console.log( 'ERROR:', err );
    }) // end AJAX
} // end addTask

function deleteTask(){
    let myId = $( this ).data( 'id' );
    console.log( 'in deleteTask:', myId );
} //end deleteTask

function getTasks(){
    console.log( 'in getTasks' );
    // get AJAX call
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then( function ( response ){
        console.log( 'back from GET with:', response );
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
            appendString +=`<button class="deleteTaskButton" data-id="${ thisTask.id}">Delete</button>`;
            el.append( appendString );
        }
        
    }).catch( function ( err ){
        alert( 'error getting tasks. see console for details' );
        console.log( 'Error getting tasks:', err );
    })
}

function onReady(){
    $( '#addTaskButton' ).on( 'click', addTask );
    $( '#tasksOut' ).on( 'click', '.deleteTaskButton', deleteTask );
    getTasks();
}