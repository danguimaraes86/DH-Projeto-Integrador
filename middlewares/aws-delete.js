const AWS = require('aws-sdk')
const fs = require('fs')

AWS.config.region = process.env.BUCKETEER_AWS_REGION;
const S3_BUCKET = process.env.BUCKETEER_BUCKET_NAME;

module.exports = (imagem) => {

    const s3 = new AWS.S3({
        accessKeyId: process.env.BUCKETEER_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY,
    });

    const nomeArquivo = () => {
        if(typeof(imagem) == 'string'){
            return imagem.split('/public/')[1]
        } else {
            return imagem.caminho.split('/public/')[1]
        }
    }

    const s3Params = {
        Bucket: S3_BUCKET,
        Key: `public/${nomeArquivo}`,
    };

    s3.deleteObject(s3Params, function (err, data) {
        if (err) {
            console.log("Error: ", err);
        } else {
            console.log(data);
        }
    });
    
}