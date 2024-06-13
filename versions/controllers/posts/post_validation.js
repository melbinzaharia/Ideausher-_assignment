const Joi = require('joi');
const multer = require('multer');
const SError = require('../../errors/server_errors');

//Setup multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//joi validation schema
const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    tags: Joi.array().items(Joi.string())
}).unknown(false)//will not allow unknown fields;

// -validation schema for get request
const getSchema = Joi.object({
    sort: Joi.string().valid('createdAt', 'title','description').default('-createdAt'),
    order:Joi.string().valid('asc','desc').default('desc'),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    keyword: Joi.string().trim(),
    tag: Joi.string().trim()
}).unknown(false); 

// console.log("reached in validation")
//validation middleware for post
const validatePost = async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body);
        req.body = value;
        next();
    } catch (err) {
        console.log(err);
        res.status(SError.InvalidParameters.statusCode).send({
            code: SError.InvalidParameters.code,
            message: err.details[0].message
        });
    }
};

//to check image file exist or not
const checkFile = (req, res, next) => {
    if (!req.file) {
        return res.status(SError.InvalidParameters.statusCode).send({
            code: SError.InvalidParameters.code,
            message: 'Image file is required'
        });
    }
    next();
};



exports.createPostValidate = [
    upload.single('image'), 
    checkFile,
    validatePost 
];

//validation middleware for GET request
const validateGet = async (req, res, next) => {
    try {
        const value = await getSchema.validateAsync(req.query);
        req.query = value;
        next();
    } catch (err) {
        console.error('Joi validation error:', err);
        res.status(SError.InvalidParameters.statusCode).send({
            code: SError.InvalidParameters.code,
            message: err.details[0].message
        });
    }
};

exports.getPostsValidate = validateGet;