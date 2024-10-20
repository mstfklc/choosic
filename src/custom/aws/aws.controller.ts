import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AwsService, FileExtender } from './aws.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/guard/jwt.guard';

@Controller('aws')
@ApiTags('Aws')
@ApiSecurity('access-token')
@UseGuards(JwtAuthGuard)
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Post('multiple')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FileExtender)
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const fileUploads = files.map((file) => ({
      dataBuffer: file.buffer,
      filename: file.originalname,
    }));
    return this.awsService.uploadMultipleFiles(fileUploads);
  }

  @Delete('/:key')
  async deleteFile(@Param('key') fileKey: string) {
    return this.awsService.deletePublicFile(fileKey);
  }

  @Get('presignedUrl/:fileKey')
  async getPresignedUrl(@Param('fileKey') fileKey: string) {
    return this.awsService.getPresignedUrl(fileKey);
  }
}
