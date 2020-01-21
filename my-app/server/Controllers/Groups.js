function listAsc(req, res) {
  const db = req.app.get("db");

  db.query(
    `SELECT *
  FROM groups 
  WHERE "userId" = ${req.params.id} 
  ORDER BY groups.group_name ASC`
  )
    .then(group => res.status(200).json(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function createGroup(req, res) {
  const db = req.app.get("db");

  const { userId, group_name } = req.body;

  db.groups
    .save({
      userId: userId,
      group_name: group_name
    })
    .then(group => {
      res.status(201).json(group);
    })
    .catch(err => {
      console.error(err);
    });
}

function update(req, res) {
  const db = req.app.get("db");
  const { userId, group_name } = req.body;

  db.groups
    .update(
      {
        id: req.params.id
      },
      {
        userId: userId,
        group_name: group_name
      }
    )
    .then(group => res.status(201).send(group))
    .catch(err => {
      console.err(err);
      res.status(500).end();
    });
}

function deleteGroup(req, res) {
  const db = req.app.get("db");

  db.groups
    .destroy({
      id: req.params.id
    })
    .then(() => {
      res.status(200).send("Contact Deleted");
    })
    .catch(error => {
      console.error(error);
      res.status(500).end();
    });
}

function addContactGroup(req, res) {
  const db = req.app.get("db");

  db.group_contacts
    .save({
      group_id: req.params.group_id,
      contact_id: req.params.contact_id
    })
    .then(group => {
      res.status(201).json(group);
    })
    .catch(err => {
      console.error(err);
    });
}

function listGroupContacts(req, res) {
  const db = req.app.get("db");

  db.query(
    `SELECT *
  FROM group_contacts 
  WHERE group_id = ${req.params.id} `
  )
    .then(group => res.status(200).json(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function listMissingGroup(req, res) {
  const db = req.app.get("db");

  db.query(
    `SELECT  groups.* FROM groups where id NOT IN (SELECT group_id FROM group_contacts WHERE contact_id=${req.params.contact_id})`
  )
    .then(group => res.status(200).json(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

module.exports = {
  listAsc,
  createGroup,
  update,
  deleteGroup,
  addContactGroup,
  listGroupContacts,
  listMissingGroup
};
