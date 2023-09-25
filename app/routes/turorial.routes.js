module.exports = (app) => {
  const courriers = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", courriers.create);
  // router.post("/", courriers.createCourrier);

  // Retrieve all courriers
  router.get("/", courriers.findAll);
  router.get("/natureautre", courriers.findByNatureAutre);
  router.get("/dassntel", courriers.findByAllTelDASSN);
  router.get("/dpshtel", courriers.findByAllTelDPSH);

  // Retrieve all published courriers
  router.get("/dpsh", courriers.findAllDPSH);
  router.get("/dassn", courriers.findAllDASSN);
  router.get("/autre", courriers.findAllAutre);
  router.get("/statistique", courriers.statistiques);

  // Retrieve a single Tutorial with id
  router.get("/:id", courriers.findOne);

  // Update a Tutorial with id
  router.put("/:id", courriers.update);

  // Delete a Tutorial with id
  router.delete("/:id", courriers.delete);

  // Create a new Tutorial
  router.delete("/", courriers.deleteAll);

  app.use('/api/tutorials', router);
};
// module.exports = app => {
//     const tutorials = require("../controllers/tutorial.controller.js");

//     var router = require("express").Router();

//     // Create a new Tutorial
//     router.post("/", tutorials.create);

//     // Retrieve all Tutorials
//     router.get("/", tutorials.findAll);

//     // Retrieve all published Tutorials
//     router.get("/published", tutorials.findAllPublished);

//     // Retrieve a single Tutorial with id
//     router.get("/:id", tutorials.findOne);

//     // Update a Tutorial with id
//     router.put("/:id", tutorials.update);

//     // Delete a Tutorial with id
//     router.delete("/:id", tutorials.delete);

//     // Create a new Tutorial
//     router.delete("/", tutorials.deleteAll);

//     app.use('/api/tutorials', router);
//   };
