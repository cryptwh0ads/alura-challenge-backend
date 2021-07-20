const router = require('express').Router()

const controller = require('../controller/video.controller')

// Create
router.post('/', controller.create)
// Read All
router.get('/', controller.index)
// Read one
router.get('/:videoId', controller.getOne)
// Update
router.put('/:videoId', controller.update)
// Delete
router.delete('/:videoId', controller.remove)

module.exports = router