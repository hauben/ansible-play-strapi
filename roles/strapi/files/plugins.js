module.exports = ({ env }) => ({
    upload: {
        provider: 'aws-s3',
        providerOptions: {
            accessKeyId: env('AWS_ACCESS_KEY_ID'),
            secretAccessKey: env('AWS_ACCESS_SECRET'),
            region: env('UPLOAD_S3_BUCKET_REGION'),
            params: {
                Bucket: env('UPLOAD_S3_BUCKET'),
            },
        },
    }
});
