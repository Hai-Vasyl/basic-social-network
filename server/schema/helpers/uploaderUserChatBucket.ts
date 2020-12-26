import { config } from "dotenv"
import { v4 as uuidv4 } from "uuid"
import AWS from "aws-sdk"
config()
const { AWS_ID, AWS_SECRET, AWS_BUCKET } = process.env

const s3 = new AWS.S3({
  accessKeyId: AWS_ID,
  secretAccessKey: AWS_SECRET,
})

export const uploadUserChatBucket = async (file: any) => {
  try {
    const { createReadStream, filename } = await file
    const params: any = {
      ACL: "public-read",
      Bucket: AWS_BUCKET,
      Key: `${uuidv4()}.${filename}`,
      Body: createReadStream(),
      Conditions: [{ acl: "public-read" }],
    }

    const uploaded = await s3.upload(params).promise()
    return uploaded
  } catch (error) {
    throw new Error(`Uploading file to aws bucket error: ${error.message}`)
  }
}
