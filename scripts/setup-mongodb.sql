-- This is a MongoDB setup guide (not actual SQL)
-- MongoDB doesn't use SQL, but here are the collections we'll create:

-- Collections that will be automatically created:
-- 1. users - stores user account information
-- 2. translations - stores translation history

-- Sample MongoDB commands to run in MongoDB shell or MongoDB Compass:

-- Create database (will be created automatically when first document is inserted)
use translator-app

-- Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true })
db.translations.createIndex({ "userId": 1, "createdAt": -1 })

-- Sample user document structure:
-- {
--   "_id": ObjectId,
--   "name": "John Doe",
--   "email": "john@example.com",
--   "password": "hashed_password",
--   "createdAt": ISODate
-- }

-- Sample translation document structure:
-- {
--   "_id": ObjectId,
--   "userId": "user_object_id",
--   "originalText": "Hello world",
--   "translatedText": "Hola mundo",
--   "sourceLang": "en",
--   "targetLang": "es",
--   "createdAt": ISODate
-- }
