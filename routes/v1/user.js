const express = require('express');
const router = express.Router();

const service = require('../../services/v1/user');

// on utilise le middleware security pour vérifier la validité du JWT avant d'effectuer une action
const security = require('../../middlewares/security');

// on autorise les utilisateurs non authentifiés à rajouter un nouvel utilisateur (inscription)
router.put('/add', service.add);

router.get('/:id', security.checkJWT, service.getById);

router.patch('/update', security.checkJWT, service.update);

router.delete('/delete', security.checkJWT, service.delete);

router.post('/auth', service.auth);

module.exports = router;