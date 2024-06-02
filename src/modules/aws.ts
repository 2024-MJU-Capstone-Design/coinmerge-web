import AWS from "aws-sdk";

export const imageUploadS3 = async(image: File) => {
  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
      region: process.env.NEXT_PUBLIC_AWS_REGION,
    });

    const params = {
      Bucket: 'coinmerge',
      Key: image.name,
      Body: image,
      ContentType: image.type,
    };

    const uploadResponse = await s3.upload(params).promise();

    return uploadResponse.Location;
  } catch(e) {
    throw e;
  }
}

