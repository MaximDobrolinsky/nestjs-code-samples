import { Injectable } from '@nestjs/common';
import {
  DeleteBucketCommandOutput,
  DeleteObjectCommand,
  GetObjectCommand,
  GetObjectCommandOutput,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { AWS_ACL } from '../enums';

@Injectable()
export class AwsS3Service {
  private client: S3Client;
  private bucketName: string;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_S3_REGION,
    });
    this.bucketName = process.env.AWS_S3_BUCKET_NAME;
  }

  async getObject(key: string): Promise<GetObjectCommandOutput> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    const response = await this.client.send(command);

    return response;
  }

  async uploadObject(
    key: string,
    object: any,
    contentType: string,
    acl?: AWS_ACL,
  ): Promise<PutObjectCommandOutput> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ACL: acl || AWS_ACL.PRIVATE,
      ContentType: contentType,
      Body: object,
    });

    const response = await this.client.send(command);

    return response;
  }

  async removeObject(key: string): Promise<DeleteBucketCommandOutput> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return this.client.send(command);
  }
}
