import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AiService } from './ai.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('image-classifier')
  @UseInterceptors(FileInterceptor('file'))
  async imageClassifier(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { message: 'No file uploaded' };
    }
    return this.aiService.imageClassifier(file);
  }

}
