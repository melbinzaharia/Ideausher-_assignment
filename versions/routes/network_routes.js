const Express = require('express')
// const SError = require('../errors/server_errors')

const PostRouter = require('../controllers/users/post_router')


 
var router = Express.Router()

router.use('/post', PostRouter)


module.exports = router