// requires
const express = require( 'express' );
const router = express.Router();
const pool = require( '../modules/pool' );
// routes
router.delete( '/:id', ( req, res )=>{
    console.log( 'DELETE hit:', req.params );
    let queryString = 'DELETE FROM "tasks" WHERE id=$1';
    pool.query( queryString, [ req.params.id ] ).then( (result)=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( 'ERROR:', err );
        res.sendStatus( 400 );
    })
}) // end DELETE

router.get( '/', ( req, res )=>{
    console.log( 'in /tasks GET' );
    let queryString = 'SELECT * FROM "tasks"';
    pool.query( queryString ).then( ( result )=>{
        res.send( result.rows );
    }).catch( ( err )=>{
        console.log( 'ERROR getting tasks:', err );
        res.send( 400 );
    }) // end query
})// end GET

router.post( '/', ( req, res )=>{
    console.log( 'in /tasks POST:', req.body );
    let queryString = 'INSERT INTO "tasks" ( name, status ) VALUES ($1, $2)';
    pool.query( queryString, [ req.body.name, false ] ).then( ( result )=>{
        res.sendStatus( 201 );
    }).catch( ( err )=>{
        console.log( 'ERROR adding task:', err );
        res.sendStatus( 400 );
    }) // end query
})// end POST

router.put( '/:id', ( req, res )=>{
    console.log( 'in PUT:', req.params );
    let queryString = 'UPDATE "tasks" SET status=true WHERE id=$1'
    pool.query( queryString, [ req.params.id ] ).then( ( result )=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( 'ERROR:', err ); 
        res.sendStatus( 400 );
    })
}) //end PUT
// exports
module.exports = router;