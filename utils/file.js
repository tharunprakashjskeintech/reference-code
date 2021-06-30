
const multer = require('multer');
const fs = require('fs');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //dynamic destination for different elements


        console.log('MIME TYPE ---------->', file.mimetype)

        var file_type = `${file.mimetype.split('/')[0]}`
        var destination = `${process.env.APP_BASE_PATH}/public/${file_type}`;

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
        req.body[file.fieldname] = []

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

module.exports.upload = upload