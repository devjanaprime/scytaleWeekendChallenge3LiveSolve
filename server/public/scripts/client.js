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
    }).catch( function( err ){
        alert( 'error adding task. See console for details' );
        console.log( 'ERROR:', err );
    }) // end AJAX
} // end addTask

function onReady(){
    $( '#addTaskButton' ).on( 'click', addTask );
}