const express = require('express');
const router = express.Router();
const SuivieEntreprise = require('../model/suivie-entreprise');

router.get('/', async (req, res) => {
  try {
    const suivieEntreprises = await SuivieEntreprise.find();
    res.json(suivieEntreprises);  
}
  catch (error) {
    res.status(500).json({ message: 'Error retrieving suivie entreprises' });
  }
});

router.post('/', async (req, res) => {
    try {
      const suivieEntreprises = req.body; // Assuming req.body is an array
      const savedDocuments = [];
  
      // Iterate over the array and save each item
      for (const suivieEntrepriseData of suivieEntreprises) {
        const suivieEntreprise = new SuivieEntreprise(suivieEntrepriseData);
        const savedDocument = await suivieEntreprise.save();
        savedDocuments.push(savedDocument);
      }
  
      res.status(201).json(savedDocuments);
    } catch (error) {
      console.error('Error creating suivie entreprise:', error);
      res.status(500).json({ message: 'Error creating suivie entreprise' });
    }
  });
  
  module.exports = router;
