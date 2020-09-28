module.exports = (req, res, next) => {
    console.log("dev mode is on >>> ");
    req.session.currentUser = {
        _id: "5f678198f11dfd12c0ba3f82",
        username: "kenwele",
        role: "admin",
        email: "kenwele@hotmail.fr",
    };
    next();
};

//ici c'est quand le mode dev est active conf app js