function checkTime(req, res, next) {
    const currentTime = new Date().toLocaleString();
    console.log("Ciao, sei passato dal middleware in questo alle");
    console.log(currentTime);
    if (currentTime.includes() < "13:00:00") {
        res.status(503).send("Siamo chiusi");
        return;
    }
    next();
  }
  
  module.exports = checkTime;