const one = function (req, res, next) {
    console.log("one called");

    //this is not important part
    //middleware always calls next function
    //rather than giving response
    next();
};

module.exports = one;
