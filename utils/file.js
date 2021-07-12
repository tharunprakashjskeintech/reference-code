/**
 * @author Padmanaban
 * @email padmanaban.r@skeintech.com
 * @create date 2021-01-11 12:57:29
 * @modify date 2021-02-27 16:37:09
 * @desc [description]
 */
 const multer = require('multer');
 const fs = require('fs');
 const fsextra = require('fs-extra')
 const mime = require('mime');
 const AppErrorHandler = require('./error-handler');
 const logger = require('./winston');
 
 var storage = multer.diskStorage({
     destination: function (req, file, cb) {
         //dynamic destination for different elements
 
         var file_type = `${file.mimetype.split('/')[0]}`
         var destination = `${process.env.APP_BASE_PATH}/public/uploads/${file_type}`;
 
         var stat = null;
         try {
             stat = fs.statSync(destination);
         } catch (err) {
             //to make directory if not found
             fs.mkdirSync(destination);
         }
         if (stat && !stat.isDirectory()) {
             throw new Error("Directory cannot be created");
         }
 
         req.file_destination = file_type
 
         cb(null, destination);
 
 
     },
     filename: function (req, file, cb) {
         let req_field = file.fieldname;
         //check element to choose image name
 
         var file_name = Date.now() + "_" + file.originalname;
 
 
         //reassign request upload field to file_name
         req.body[req_field] = `${req.file_destination}/${file_name}`;
 
         cb(null, file_name);
     }
 });
 const upload = multer({ storage: storage });
 
 const base64ToImage =  function (file_name, fields = []) {
    if (typeof fields == 'string') {
        fields = [fields]
        
    }
    
    return [
        async (req, res, next) => {
            try {
                let base64Data = fields.map((item, i, array) => {

                    let data = null

                    if (req.body[item] != undefined) {
                        if (req.body[item] instanceof Array) {
                            let images = req.body[item]
                           
                            req.body[item] = []
                            data = images.map((itm, i, arr) => {
                               let image="";
                                if(itm){ 
                                 image =  convertBase64ToBuffer(itm,i)
                                req.body[item].push(`${image.base_path}/${image.timestamp}_${file_name}.${image.extension}`)
                                }
                                return image
                            })
                        }
                        else {
                        //    next()
                             data = convertBase64ToBuffer(req.body[item],i)
                             req.body[item] = `${data.base_path}/${data.timestamp}_${file_name}.${data.extension}`
                        }

                    }
                  
                    return data
                }).filter(item => item != null)

                var merged = [].concat.apply([], base64Data)
                
                merged.forEach(async element => {
                   
                   if(element){ 
                    let dir = `${process.env.APP_BASE_PATH}public/uploads/${element.base_path}`
                    try {

                        await fsextra.mkdir(dir)
                    }
                    catch (err) {
                        if (err.code == 'EEXIST') {
                            logger.info(`DIRECTORY ALREADY EXISTS ${dir}`)
                        }
                        else {
                            logger.info(err)

                        }
                    }
                    let file_store_path = `${dir}/${element.timestamp}_${file_name}.${element.extension}`;
                    await fsextra.writeFile(file_store_path, element.buffer, 'utf8');
                   }
                   });
                next();
            }
            catch (err) {
                new AppErrorHandler(res, err.message)
            }

        }
    ]

}


function convertBase64ToBuffer(ibuffer,i) {
   
    //let matches = ibuffer.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let matches = ibuffer.match(/^data:([A-Za-z0-9-+.-/\/]+);base64,(.+)$/);
    let response = {};

    if (!(matches instanceof Array)) {
        throw new Error('Invalid base64 string');
    }

    if (matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }

    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');

    let imageBuffer = response.data;
    let type = response.type;
    let extension = mime.getExtension(type)

    let base_path = response.type.split('/')[0];
console.log("base_path====>",base_path,"Date.now()+++>",Date.now()+i);
    return {
        base_path: base_path,
        timestamp: Date.now()+i,
        type: type,
        extension: extension,
        buffer: imageBuffer
    }

}
 
 const FileUpload = {
     upload,
     base64ToImage
 }
 
 module.exports = FileUpload
 