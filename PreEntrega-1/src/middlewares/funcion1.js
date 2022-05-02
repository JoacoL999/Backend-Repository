const admin = false;

const validarAdmin = (req, res, next) => {
  if (admin) next();
  else res.status(401).json({ Error: 'ERROR_AUTENTICATION_INVALID', Descripcion: 'No tienes permiso para acceder a estas funciones' });
};

module.exports = {
  validarAdmin,
};
