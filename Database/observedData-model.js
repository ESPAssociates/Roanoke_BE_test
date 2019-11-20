const db = require('./dbConfig')

module.exports = {
  add,
  find,
  findBy,

};

function find() {
  return db('observedData')
}

function findBy(fliter) {
  return db('observedData').where(fliter);
}

async function add(data) {
  const [id] = await db('observedData').insert(data);

  return findBy(id);
}
