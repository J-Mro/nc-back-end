invalidMethodHandler = (req, res, next) => {
  res.status(405).send({ msg: "Invalid method" });
};
module.exports = invalidMethodHandler;
