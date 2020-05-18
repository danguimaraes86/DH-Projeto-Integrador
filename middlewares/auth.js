module.exports = (req, res, next) => {

  const { usuario } = req.session; 

  if (!usuario) {    
    return res.redirect("/login");
  };
  
  res.locals.usuario = usuario;

  return next();
};