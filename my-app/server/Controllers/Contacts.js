function listAsc(req, res) {
  const db = req.app.get("db");

  db.query(
    `SELECT *
  FROM contacts 
  WHERE "userId" = ${req.params.id} 
  ORDER BY contacts.first_name ASC`
  )
    .then(contact => res.status(200).json(contact))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function listDesc(req, res) {
  const db = req.app.get("db");

  db.query(
    `SELECT *
  FROM contacts 
  WHERE "userId" = ${req.params.id} 
  ORDER BY contacts.last_name ASC`
  )
    .then(contact => res.status(200).json(contact))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function create(req, res) {
  const db = req.app.get("db");

  const {
    userId,
    first_name,
    last_name,
    home_phone,
    mobile_phone,
    work_phone,
    email,
    city,
    state_or_province,
    postal_code,
    country
  } = req.body;

  db.contacts
    .save({
      userId: userId,
      first_name: first_name,
      last_name: last_name,
      home_phone: home_phone,
      mobile_phone: mobile_phone,
      work_phone: work_phone,
      email: email,
      city: city,
      state_or_province: state_or_province,
      postal_code: postal_code,
      country: country
    })
    .then(contact => {
      res.status(201).json(contact);
    })
    .catch(err => {
      console.error(err);
    });
}

function update(req, res) {
  const db = req.app.get("db");
  const {
    userId,
    first_name,
    last_name,
    home_phone,
    mobile_phone,
    work_phone,
    email,
    city,
    state_or_province,
    postal_code,
    country
  } = req.body;

  db.contacts
    .update(
      {
        id: req.params.id
      },
      {
        userId: userId,
        first_name: first_name,
        last_name: last_name,
        home_phone: home_phone,
        mobile_phone: mobile_phone,
        work_phone: work_phone,
        email: email,
        city: city,
        state_or_province: state_or_province,
        postal_code: postal_code,
        country: country
      }
    )
    .then(post => res.status(201).send(post))
    .catch(err => {
      console.err(err);
      res.status(500).end();
    });
}

function deleteContact(req, res) {
  const db = req.app.get("db");
  
  db.contacts
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

module.exports = {
  create,
  listAsc,
  listDesc,
  update,
  deleteContact
};
