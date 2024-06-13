const Post = require('../../models/post'); 
const Tag = require('../../models/tag'); 

// Controller function to handle the creation of a post
exports.createPostController = async (req, res) => {

    console.log("reached in controller")

    try {
       
        const { title, description } = req.body;
        const tags = req.body.tags;
        const imageFile = req.file;

        //to remove the repetitive tags
        const uniqueTags = [...new Set(tags)];
        const imageBase64 = imageFile.buffer.toString('base64');


        //if tags are unique only then save them in the tag collection
        for (const tagName of uniqueTags) {
            // console.log("tagName",tagName)
            let existingTag = await Tag.findOne({ name: tagName });
            if (!existingTag) {
                existingTag = new Tag({ name: tagName });
                await existingTag.save();
            }
           
        }

        // Create a new post object
        const newPost = new Post({
            title,
            description,
            image: imageBase64,
            tags: uniqueTags
        });

        // Save the post to the database
        await newPost.save();

        // Send a success response
        res.status(201).send({
            message: 'Post created successfully',
            post: newPost
        });
    } catch (err) {
        console.error(err);
        res.status(SError.InternalServerError.statusCode).send({
            code: SError.InternalServerError.code,
            message: 'An error occurred while creating the post'
        });
    }
};


exports.getPostsController = async (req, res) => {

    console.log("inside controller")
    const { sort, order, page, limit,keyword,tag } = req.query;

    // Determine the field to sort by and the sort order with default values
    const sortKey = sort || 'createdAt'; 
    const sortOrder = order && order.toLowerCase() === 'desc' ? -1 : 1; // Default to ascending order

    const pageNumber = parseInt(page) || 1; 
    const limitNumber = parseInt(limit) || 10; 

    try {
        // Aggregation pipeline stages
        const pipeline = [];

        const matchConditions = {};

        if (keyword) {
            matchConditions.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ];
        }

        pipeline.push({ $unwind: '$tags' });

        // tag filteration
        if (tag) {
            pipeline.push({ $match: { tags: tag } }); // Filter posts where tags array contains the specified tag name
        }


        pipeline.push({
            $group: {
                _id: '$_id', // Group by the _id field
                title: { $first: '$title' },
                description: { $first: '$description' },
                createdAt: { $first: '$createdAt' },
                tags: { $push: '$tags' }
            }
        });

        if (Object.keys(matchConditions).length > 0) {
            pipeline.push({ $match: matchConditions });
        }

        pipeline.push({ $sort: { [sortKey]: sortOrder } });

        const skip = (pageNumber - 1) * limitNumber;
        pipeline.push({ $skip: skip });
        pipeline.push({ $limit: limitNumber });

        const posts = await Post.aggregate(pipeline);

        const total = await Post.countDocuments(matchConditions);

        res.status(200).json({ success: true, total, data: posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch posts.' });
    }
};
