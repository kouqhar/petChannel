const { error } = require('winston');

module.exports = function(err, req, res, next){
    // Log the exception
    error(err.message, err)

    console.log(err);

    // Send an internal error message to the user
    res.status(500).send(`Error middleware error message from ${req}. ${err}`)
}