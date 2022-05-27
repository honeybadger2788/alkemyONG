const router = require('express').Router()
const categorySchema = require('../schemas/category')
const { validateSchema } = require('../middlewares/validateErrors')

const { list, listCategory, post } = require('../controllers/categories')

// get a category by id
router.get('/:id', listCategory)

// get all categories
router.get('/', list)

// create a new category
router.post('/', validateSchema(categorySchema), post)

module.exports = router