/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('group_contacts', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    group_id: {
      type: 'integer',
      notNull: true,
      references: '"groups"',
    },
    contact_id: {
      type: 'integer',
      notNull: true,
      references: '"contacts"'
    }
  });
};

exports.down = (pgm) => {

};
