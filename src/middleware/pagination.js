function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);

    const startIndex = (page - 1) * 3;

    const results = {};

    try {
      res.paginatedResults = await model.find().limit(3).skip(startIndex).exec();
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default paginatedResults;
