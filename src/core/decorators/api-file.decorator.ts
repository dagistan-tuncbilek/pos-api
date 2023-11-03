import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import {fileMimetypeFilter} from "../filters/file-mimetype-filter";

export function ApiImageFile(fileName = 'image', required = false) {
  return ApiFile(fileName, required, {
    fileFilter: fileMimetypeFilter('image'),
  });
}

// export function ApiPdfFile(fileName = 'document', required = false) {
//   return ApiFile(fileName, required, {
//     fileFilter: fileMimetypeFilter('pdf'),
//   });
// }

export function ApiFile(
  fieldName = 'file',
  required = false,
  localOptions?: MulterOptions,
) {
  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldName, localOptions)),
    // ApiConsumes('multipart/form-data'),
    // ApiBody({
    //   schema: {
    //     type: 'object',
    //     required: required ? [fieldName] : [],
    //     properties: {
    //       [fieldName]: {
    //         type: 'string',
    //         format: 'binary',
    //       },
    //     },
    //   },
    // }),
  );
}
