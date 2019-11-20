
exports.up = function(knex) {
    return knex.schema.createTable('observedData', col => {
        col.increments();
        col.string('dateTime').notNullable();
        col.integer('waterDepth').notNullable();
        col.integer('discharge').notNullable();
       
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('observedData');   
};
