module.exports = (req, res, next) => {

  const { usuario } = req.session;

  if (!usuario) {
    return res.redirect("/usuario/login");
  }
  
  return next();
};
