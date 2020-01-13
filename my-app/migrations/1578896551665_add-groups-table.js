/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('groups', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    userId: {
      type: 'integer',
      notNull: true,
      references: '"users"', // this is how we associate a profile with a specific user.
    },
    group_name: {
      type: 'text',
      notNull: true,
    }
  });
};

exports.down = (pgm) => {

};
