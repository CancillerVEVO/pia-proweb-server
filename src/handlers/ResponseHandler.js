const createdResponse = (data = null, message = "Creado con exito!") => {
  return (res) => {
    res.status(201).json({
      status: "success",
      message,
      data,
    });
  };
};

const successResponse = (data = null, message = "Operacion exitosa!") => {
  return (res) => {
    res.status(200).json({
      status: "success",
      message,
      data,
    });
  };
};

const noContentResponse = (message = "No hay contenido") => {
  return (res) => {
    res.status(200).json({
      status: "success",
      message,
      data: null,
    });
  };
};

module.exports = {
  createdResponse,
  successResponse,
  noContentResponse,
};
