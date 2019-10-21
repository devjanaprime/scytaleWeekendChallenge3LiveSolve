$( document ).ready( onReady );

function addTask(){
    const taskName = $( '#taskNameIn' ).val();
    console.log( 'in addTask:', taskName );
} // end addTask

function onReady(){
    $( '#addTaskButton' ).on( 'click', addTask );
}