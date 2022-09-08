module.exports = {
  serverError: (res, error) => {
    console.log(error);
    res.status(500).json({
      message: "Server error occurred",
    });
  },
  resourceError(res, errMessage){
    res.status(400).json({
      message: errMessage
  })
  }
};
