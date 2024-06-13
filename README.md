Post Upload Project
This project is a simple Node.js and MongoDB application that allows users to upload posts with multiple tags. Images are uploaded using Multer, and tags are managed to ensure that only new tags are added to the tag collection.

Features
Create posts with a title, description, image, and tags.
Automatically create and save tags that are not already in the collection.
Retrieve posts with options for sorting, pagination, keyword filtering, and tag filtering.

Technologies Used
Node.js
Express.js
MongoDB
Mongoose
Multer
Joi for validation

Prerequisites
Node.js installed on your machine
MongoDB instance running if running locally when we start the server

steps
clone the project
npm install
npm start

API Endpoints
Create Post
URL: https://ideausher-assignment.onrender.com/api/v1/post/create-post
Method: POST
Headers: Content-Type: multipart/form-data
Body (form-data):
title: string (required)
description: string (required)
image: file (required)
tags: array of strings (required)
Description: This endpoint allows you to create a new post. Tags that are not already in the tag collection will be created.


Get Posts
URL:  https://ideausher-assignment.onrender.com/api/v1/post/get-post
Method: GET
Query Parameters:
sort: string (field to sort by, e.g., 'title', 'description', 'createdAt')
order: string ('asc' for ascending, 'desc' for descending)
page: number (page number for pagination)
limit: number (number of posts per page)
keyword: string (keyword to filter posts by title or description)
tag: string (tag to filter posts by)
Description: This endpoint retrieves posts with options for sorting, pagination, keyword filtering, and tag filtering.
