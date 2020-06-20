const AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')


AWS.config.region = process.env.BUCKETEER_AWS_REGION;
const S3_BUCKET = process.env.BUCKETEER_BUCKET_NAME;

module.exports = (file) => {

    const s3 = new AWS.S3({
        accessKeyId: process.env.BUCKETEER_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY,
    });

    const s3Params = {
        Bucket: S3_BUCKET,
        Key: `public/${file.filename}`,
        Body: fs.readFileSync(file.path),
        ContentType: file.mimetype,
        ACL: 'public-read'
    };

    s3.putObject(s3Params, function (err, data) {
        if (err) {
            console.log("Error: ", err);
        } else {
            console.log(data);
        }
    });
    
    return `https://${S3_BUCKET}.s3.amazonaws.com/${s3Params.Key}`
}