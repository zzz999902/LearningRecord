const Book = require('../models/Book');

exports.AddBook = async function (bookObj) {
  const ins = await Book.create(bookObj);
  return ins.toJSON();
};

exports.deleteBook = async function (bookObj) {
  const result = await Book.destroy({
    where: {
      id: bookObj,
    },
  });
  return result;
};

exports.updateAdmin = async function (id, bookObj) {
  const result = await Book.update(bookObj, {
    where: {
      id,
    },
  });
  return result;
};
