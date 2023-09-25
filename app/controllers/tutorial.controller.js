const db = require("../models");
const Courrier = db.courriers;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.numberInscription) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const courrier = {
    numberInscription: req.body.numberInscription,
    date: req.body.date,
    destination: req.body.destination,
    nature: req.body.nature,
    dateDepart: req.body.dateDepart,
    name: req.body.name,
    tel: req.body.tel
  };

  // Save Tutorial in the database
  Courrier.create(courrier)
    .then(data => {
      res.status(201).send(data); // 201 Created
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(409).send({
          message: 'La combinaison de nature et destination doit être unique.'
        });
      }
      else {
        res.status(500).send({
          message: 'Une erreur s\'est produite lors de la création du courrier.'
        });
      }
      // res.status(500).send({
      //   message:
      //     err.message || "Some error occurred while creating the Tutorial."
      // });
    });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const tel = req.query.tel;
  var condition = tel ? { tel: { [Op.iLike]: `%${tel}%` } } : null;

  Courrier.findAll({ where: condition, order: [['date', 'DESC']], limit: 50 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.statistiques = async (req, res) => {
  try {
    const nbreDpsh = await Courrier.count({ where: { destination: 'DPSH' } });
    const nbreDpsh_instance = await Courrier.count({ where: { destination: 'DPSH', status: false } });
    const nbreDpsh_delivre = await Courrier.count({ where: { destination: 'DPSH', status: true } });
    const nbreDassn = await Courrier.count({ where: { destination: 'DASSN' } });
    const nbreDassn_instance = await Courrier.count({ where: { destination: 'DASSN', status: false } });
    const nbreDassn_delivre = await Courrier.count({ where: { destination: 'DASSN', status: true } });
    const nbreautre = await Courrier.count({ where: { destination: 'Autre' } });
    const nbreautre_instance = await Courrier.count({ where: { destination: 'Autre', status: false } });
    const nbreautre_livre = await Courrier.count({ where: { destination: 'Autre', status: true } });

    const resultat = {
      dpsh: {
        nom: 'DPSH', nbre_dpsh: nbreDpsh, nbreDpsh_instance: nbreDpsh_instance, nbreDpsh_delivre: nbreDpsh_delivre
      },
      dassn:{
        nom: 'DASSN', nbre_dassn: nbreDassn, nbreDassn_instance: nbreDassn_instance, nbreDassn_delivre: nbreDassn_delivre 
      },
      autre:{
        nom: 'Autre', nbreautre: nbreautre, nbreautre_instance: nbreautre_instance, nbreautre_livre: nbreautre_livre 
      },
      detail: [
        { nom: 'DPSH', nbre_dpsh: nbreDpsh, nbreDpsh_instance: nbreDpsh_instance, nbreDpsh_delivre: nbreDpsh_delivre },
        { nom: 'DASSN', nbre_dassn: nbreDassn, nbreDassn_instance: nbreDassn_instance, nbreDassn_delivre: nbreDassn_delivre },
        { nom: 'Autre', nbreautre: nbreautre, nbreautre_instance: nbreautre_instance, nbreautre_livre: nbreautre_livre },
      ],
      byname: {
        nbre_dpsh: nbreDpsh,
        nbre_dassn: nbreDassn,
        nbreautre: nbreautre

      }

    };

    res.json(resultat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des données.' });
  }
};
exports.findByNatureAutre = (req, res) => {
  const numberInscription = req.query.numberInscription;
  var condition = numberInscription ? { numberInscription: { [Op.iLike]: `%${numberInscription}%` }, destination: 'Autre' } : null;

  Courrier.findAll({ where: condition, order: [['date', 'DESC']], limit: 50 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
exports.findByAllTelDASSN = (req, res) => {
  const tel = req.query.tel;
  console.log("tel", tel);
  var condition = tel ? { tel: { [Op.iLike]: `%${tel}%` }, destination: 'DASSN' } : null;

  Courrier.findAll({ where: condition, order: [['date', 'DESC']], limit: 50 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
exports.findByAllTelDPSH = (req, res) => {
  const tel = req.query.tel;
  console.log("tel", tel);
  var condition = tel ? { tel: { [Op.iLike]: `%${tel}%` }, destination: 'DPSH' } : null;

  Courrier.findAll({ where: condition, order: [['date', 'DESC']], limit: 50 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Courrier.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Courrier.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Courrier.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Courrier.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};
// Find all published Tutorials
exports.findAllDPSH = (req, res) => {
  const destination = 'DPSH';
  var condition = destination ? { destination: { [Op.iLike]: `%${destination}%` } } : null;
  Courrier.findAll({ where: condition, order: [['date', 'DESC']] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
exports.findAllDASSN = (req, res) => {
  const destination = "DASSN";
  var condition = destination ? { destination: { [Op.iLike]: `%${destination}%` } } : null;
  Courrier.findAll({ where: condition, order: [['date', 'DESC']], limit: 50 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
exports.findAllAutre = (req, res) => {
  const destination = "Autre";
  var condition = destination ? { destination: { [Op.iLike]: `%${destination}%` } } : null;
  Courrier.findAll({ where: condition, order: [['date', 'DESC']] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};