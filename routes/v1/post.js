const express = require('express');
const router = express.Router();

const service = require('../../services/v1/post');

// on utilise le middleware security pour vérifier la validité du JWT avant d'effectuer une action
const security = require('../../middlewares/security');

// il faut être authentifié pour lire/modifier/supprimer un post
router.put('/add', security.checkJWT, service.add);

router.get('/:id', security.checkJWT, service.getById);

router.patch('/update', security.checkJWT, service.update);

router.delete('/delete', security.checkJWT, service.delete);

module.exports = router;