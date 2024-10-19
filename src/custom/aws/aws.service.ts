import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { Observable } from 'rxjs';
import { SuccessResponseDto } from '../../globalDto/successResponseDto';
import { throwApiError } from '../http.utility';
import { CustomExceptionCode } from '../../enum/customExceptionCode.enum';
import { ApiErrorEnum } from '../../enum/apiError.enum';

@Injectable()
export class AwsService {
  bucketName = process.env.AWS_BUCKET_NAME;
  s3 = new S3({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
    region: process.env.AWS_REGION,
  });

  async uploadMultipleFiles(files: { dataBuffer: Buffer; filename: string }[]) {
    console.log('files:', files);
    try {
      const uploadPromises = files.map((file) =>
        this.s3
          .upload({
            Bucket: this.bucketName,
            Body: file.dataBuffer,
            Key: file.filename,
            ACL: 'public-read',
            ContentDisposition: 'inline',
          })
          .promise(),
      );

      const uploadResults = await Promise.allSettled(uploadPromises);

      const successfulUploads = uploadResults.filter(
        (result) => result.status === 'fulfilled',
      ) as PromiseFulfilledResult<AWS.S3.ManagedUpload.SendData>[];

      const failedUploads = uploadResults.filter(
        (result) => result.status === 'rejected',
      ) as PromiseRejectedResult[];

      if (failedUploads.length > 0) {
        const errors = failedUploads.map((error) => error.reason);
        console.error('Error uploading multiple files:', errors);
        throwApiError(
          CustomExceptionCode.API_ERROR,
          ApiErrorEnum.api_error_failed_to_upload_files,
        );
      }

      return successfulUploads.map((result) => result.value);
    } catch (error) {
      console.error('Error uploading multiple files:', error);
      throw error;
    }
  }

  async uploadSingleFile(file: { dataBuffer: Buffer; filename: string }) {
    console.log('file:', file);
    try {
      return await this.s3
        .upload({
          Bucket: this.bucketName,
          Body: file.dataBuffer,
          Key: file.filename,
          ACL: 'public-read',
          ContentDisposition: 'inline',
        })
        .promise();
    } catch (error) {
      console.error('Error uploading the file:', error);
      throw error;
    }
  }

  async deletePublicFile(fileKey: string): Promise<SuccessResponseDto> {
    try {
      await this.s3
        .deleteObject({
          Bucket: this.bucketName,
          Key: fileKey,
        })
        .promise();
      return Promise.resolve({ status: true });
    } catch (error) {
      console.log(error);
    }
  }

  async getPresignedUrl(fileKey: string): Promise<string> {
    try {
      return await this.s3.getSignedUrlPromise('getObject', {
        Bucket: this.bucketName,
        Key: fileKey,
        Expires: 60,
      });
    } catch (error) {
      console.error('Error getting presigned URL:', error);
      throw error;
    }
  }
}

export class FileExtender implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context.switchToHttp().getRequest();
    return next.handle();
  }
}
