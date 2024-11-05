const mongoose = require('mongoose');
const suivieEntrepriseSchema = new mongoose.Schema({
  nomContact: {
    type: String,
    required: false,
  },
  nomEntreprise: {
    type: String,
    required: false,
  },
  telephone: {
    type: String,
    required: false,
  },
  adresseMail: {
    type: String,
    required: false,
  },
  sources: {
    type: String,
    required: false,
  },
  formationConcernee: {
    type: String,
    required: false,
  },
  commentaire: {
    type: String,
    required: false,
  },
  dateContact1: {
    type: Date,
    required: false,
  },
  positionnement1: {
    type: String,
    required: false,
  },
  reponsesEtudiants1: {
    type: String,
    required: false,
  },
  relance1: {
    type: String,
    required: false,
  },
  dateContact2: {
    type: Date,
    required: false,
  },
  positionnement2: {
    type: String,
    required: false,
  },
  reponsesEtudiants2: {
    type: String,
    required: false,
  },
  relance2: {
    type: String,
    required: false,
  },
  dateContact3: {
    type: Date,
    required: false,
  },
  positionnement3: {
    type: String,
    required: false,
  },
  reponsesEtudiants3: {
    type: String,
    required: false,
  },
  relance3: {
    type: String,
    required: false,
  },
  dateContact4: {
    type: Date,
    required: false,
  },
  positionnement4: {
    type: String,
    required: false,
  },
  reponsesEtudiants4: {
    type: String,
    required: false,
    },
    relance4: {
    type: String,
    required: false,
  },
});
module.exports = mongoose.model('Suivie_entreprise', suivieEntrepriseSchema);
  