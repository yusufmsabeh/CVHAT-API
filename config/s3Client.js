import awsSDK from "aws-sdk";
const { S3 } = awsSDK;
const s3 = new S3({
  endpoint: process.env.AWS_ENDPOINT,
  region: process.env.AWS_REGION,
  s3ForcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default s3;
