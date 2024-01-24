const jwt = require('jsonwebtoken');

const auth = (role) => async (req, res, next) => {
  try {
    const token = req.header("auth").replace("Bearer ", ""); 
    const verify = jwt.verify(token, process.env.SECRET_KEY);

    if (verify && verify.role === role) {
      req.idUsuario=verify.id;
      req.idCarrito=verify.idCarrito;
      req.idFav=verify.idFav;
      next();
    } else {
      res.status(401).json({ mensaje: "No estás autorizado" });
    }

  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
}

module.exports = auth;
