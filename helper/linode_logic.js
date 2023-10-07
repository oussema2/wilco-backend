// uploads a file to s3

const fs = require("fs");

const { Credentials } = require("aws-sdk");
const S3 = require("aws-sdk/clients/s3");
const bucketName = process.env.AWS_BUCKET_NAME || "viveca33101";
const endpoint = "https://us-east-1.linodeobjects.com";
const region = process.env.AWS_BUCKET_REGION || "us-east-1";
const accessKeyId = process.env.AWS_ACCESS_KEY || "OEO32GA0BW7FSREN6Z1K";
const secretAccessKey =
  process.env.AWS_SECRET_KEY || "k40uqDmk4uNemhjN6oPmxKefm74D4pxLhxgHALJR";

const s3Client = new S3({
  region: region,
  endpoint: endpoint,
  sslEnabled: true,
  s3ForcePathStyle: false,
  credentials: new Credentials({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  }),
});

exports.uploadFile = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: new Date().getTime() + file.originalname.replace(/\s/g, ""),
    ACL: "public-read",
    ContentEncoding: "base64",
    ContentType: file.mimetype,
  };

  const { Location } = await s3Client.upload(uploadParams).promise();
  return { location: Location, key: uploadParams.Key };
};

// downloads a file from s3
// exports.getFileStream = (fileKey) => {
//   const downloadParams = {
//     Key: fileKey,
//     Bucket: bucketName,
//   };

//   return s3.getObject(downloadParams).createReadStream();
// };

exports.deleteFile = async (key) => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  const response = await s3Client.deleteObject(params).promise();
  return response;
};

exports.uploadFiles = async (files) => {
  const filesData = [];
  for (let i = 0; i < files.length + 1; i++) {
    if (i === files.length) {
      return filesData;
    }
    const file = files[i];
    const resFile = await this.uploadFile(file);
    filesData.push(resFile.location);
  }
};
