module.exports = (sequelize, Sequelize) => {
  const Courrier = sequelize.define("courrier", {
    numberInscription: {
      type: Sequelize.STRING,
      allowNull: false, // Le numéro d'inscription ne peut pas être nul
      unique: 'uniqueNumberInscription', // Nom de la contrainte d'unicité
    },
    name: {
      type: Sequelize.STRING
    },
    tel: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATE
    },
    destination: {
      type: Sequelize.STRING
    },
    nature: {
      type: Sequelize.STRING
    },
    dateDepart: {
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: false // Default value is set to false
    }
  },
      {
      uniqueKeys: {
        uniqueNumberInscription: {
          fields: ['numberInscription', 'nature', 'destination']
        }
      }
    
      
    });

return Courrier;
  };