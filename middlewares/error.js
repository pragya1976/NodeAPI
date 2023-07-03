class errorhandler extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errormiddleware = (err, req, res, next) => {
  err.message = err.message || "internal server error";
  err.statusCode = err.statusCode || 500;
  return res.status(404).json({
    success: false,
    message: err.message,
  });
};
export default errorhandler;
