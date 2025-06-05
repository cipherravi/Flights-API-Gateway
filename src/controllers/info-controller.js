function info(req, res) {
  // console.log(req.ip);
  // console.log(req);
  res.json({ Status: "OK" });
}

module.exports = info;
