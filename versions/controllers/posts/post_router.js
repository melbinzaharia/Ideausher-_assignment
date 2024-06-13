const Express = require('express')


const { createPostValidate,getPostsValidate } = require('./post_validation')
const { createPostController,getPostsController } = require('./post_controller')

var router = Express.Router()

console.log("reached in router")

router.post('/create-post', createPostValidate ,createPostController)
router.get('/get-post', getPostsValidate ,getPostsController)

module.exports = router