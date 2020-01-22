const express = require("express");
const massive = require("massive");
const secret = require("../secret");
const jwt = require("jsonwebtoken");
const cors = require("cors");
//IMPORTS
const users = require("./Controllers/Users");
const contacts = require("./Controllers/Contacts");
const groups = require("./Controllers/Groups");

massive({
  host: "localhost",
  port: 5432,
  database: "addressbook",
  user: "postgres",
  password: "addressbook"
}).then(db => {
  const app = express();

  app.set("db", db);
  app.use(cors());
  app.use(express.json());

  //GROUP CONTACTS
  app.get("/api/groupcontacts/:id", groups.listGroupContacts)
  app.get("/api/groupcontacts/user/:contact_id", groups.listMissingGroup)
  app.delete("/api/groupcontacts/:id", groups.removeContact)
  //GROUPS
  app.post("/api/groups", groups.createGroup);
  app.get("/api/users/:id/groups/asc", groups.listAsc);
  app.put("/api/groups/:id", groups.update);
  app.delete("/api/groups/:id", groups.deleteGroup);
  app.post("/api/groups/:group_id/:contact_id", groups.addContactGroup)
 
  //CONTACTS
  app.post("/api/contacts", contacts.create);
  app.get("/api/users/:id/contacts/asc", contacts.listAsc);
  app.get("/api/users/:id/contacts/desc", contacts.listDesc);
  app.put("/api/contacts/:id", contacts.update);
  app.delete("/api/contacts/:id", contacts.deleteContact);
  app.get("/api/contacts/:id", contacts.viewContactInfo)
  //USERS
  app.get("/api/users", users.list);
  app.post("/api/users", users.create);
  app.get("/api/users/:id", users.getById);
  app.get("/api/users/:id/profile", users.getProfile);
  app.post("/api/login", users.login);
  app.get("/api/protected/data", (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, secret);
      res.status(200).json({ data: "here is the protected data" });
    } catch (err) {
      console.error(err);
      res.status(401).end();
    }
  });

  const PORT = 3003;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
