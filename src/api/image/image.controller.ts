import { Controller, Post, Body, Param, UseInterceptors, Get, UploadedFile } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { pth } from 'src/app.properties';
import { diskStorage } from 'multer'


@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

  @Post('upload/:entity/:id')
  @UseInterceptors(
    FileInterceptor("photo", {
      storage:
        diskStorage({
          destination: (req, file, cb) => {
            cb(null, getDestination(req.params.entity));
          },
          filename: (req, file, cb) => {
            let extension: string = file.originalname.split('.').pop()
            cb(null, req.params.id + '.' + extension);
          },
        })

    })
  )
  uploadSingle(@UploadedFile() file: any, @Param('id') id: string,) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }



}
function getDestination(entity: string): string {
  switch (entity) {
    case 'location': return pth.location
    case 'badge': return pth.badge
    case 'user': return pth.user
    default: return pth.all
  }
}

