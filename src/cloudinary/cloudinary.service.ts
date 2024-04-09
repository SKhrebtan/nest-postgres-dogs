import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import * as sharp from 'sharp';
const streamifier = require('streamifier');
@Injectable()
export class CloudinaryService {
  uploadFile(
    file: Express.Multer.File,
    folder: string,
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      if (folder === 'avatars') {
        sharp(file.buffer)
          .resize(200, 200)
          .toBuffer()
          .then((data) => {
            streamifier.createReadStream(data).pipe(uploadStream);
          })
          .catch((error) => {
            reject(error);
          });
        return;
      }

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
