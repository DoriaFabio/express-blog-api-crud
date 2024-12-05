function index(req, res) {
    res.sendFile("index.html", { root: __dirname + "/../views" });
}

module.exports = { index };