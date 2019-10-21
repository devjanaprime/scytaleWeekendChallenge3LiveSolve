// requires
const express = require( 'express' );
const router = express.Router();
const pool = require( '../modules/pool' );
// routes
router.get( '/', ( req, res )=>{
    console.log( 'in /tasks GET' );
    res.send( 'woof' );
})// end GET

router.post( '/', ( req, res )=>{
    console.log( 'in /tasks POST:', req.body );
    res.send( 'meow' );
})// end POST
// exports
module.exports = router;