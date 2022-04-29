import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { pth } from '../../app.properties';
const fs = require('fs')
@Injectable()
export class ImageService {

  constructor(  @Inject('winston') protected readonly logger: Logger) { }

  create(id: string, body: CreateImageDto) {
    let buff = Buffer.from(body.base64.toString(), 'base64');
    try {
      
      let path = pth[body.entity as keyof typeof pth]

      if (!fs.existsSync(path)){
        fs.mkdirSync(path, { recursive: true });
      }

      fs.writeFile( path + id+'.jpg', buff,  function(err: any, result: any) {if (err) console.log(err)});
    } catch (error) {
      this.logger.error(error);
    }
    return 'Image added';
  }
}
