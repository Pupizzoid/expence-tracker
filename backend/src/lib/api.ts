export const requestHandler = (name, schema, typeOfValidation, handler) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[typeOfValidation]);

    if (error?.isJoi) {
      const errorValue = error.details.map(err => err.message);
      // logger.report('Joi validation error', { errorValue });
      // return next(new HTTP400Error(error.details));
      return next(error.details);
    }
    // logger.info(name, req[typeOfValidation]);
    return handler(req, res, next).catch(next);
  };
};
