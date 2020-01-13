add-groups-table
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

add-group-contacts-table
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

add-contacts-table
exports.up = pgm => {
  pgm.createTable('contacts', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    userId: {
      type: 'integer',
      notNull: true,
      references: '"users"', 
    },
    first_name: {
      type: 'text',
      notNull: true,
    },
    last_name: {
      type: 'text',
      notNull: true,
    },
    home_phone: {
      type: 'text',
      notNull: true,
    },
    mobile_phone: {
      type: 'text',
      notNull: true,
    },
    work_phone: {
      type: 'text',
      notNull: true,
    },
    email: {
      type: 'text',
      notNull: true,
    },
    city: {
      type: 'text',
      notNull: true,
    },
    state_or_province: {
      type: 'text',
      notNull: true,
    },
    postal_code: {
      type: 'text',
      notNull: true,
    },
    country: {
      type: 'text',
      notNull: true,
    },
  });
};