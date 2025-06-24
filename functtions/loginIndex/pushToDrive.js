const {exec} = require("child_process");
const { auth } = require("google-auth-library");
const {google} = require("googleapis");
const fs = require("fs");

async function pushToDrive() {
    // credenciales
    const credentials = JSON.parse(fs.readFileSync('C:\\Users\\Usuario\\Desktop\\electron\\2\\credentials.json'));
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // carga el token de acceso
    let token 
    try {
        token = JSON.parse(fs.readFileSync('C:\\Users\\Usuario\\Desktop\\electron\\2\\tokens.json'))
        oAuth2Client.setCredentials(token);
    } catch (error) {
        console.log(error)
        return
    }
    
    const drive = google.drive({version:"v3", auth: oAuth2Client})

    const fileMetadata = {name : "db.db"}
    const media = {
        mimeType: 'application/db',
        body : fs.createReadStream(`\\\\SANDRA\\db\\db.db`)
    }

    // Corrobora si existe el archivo
    const listRes = await drive.files.list({
        q: `name='db.db' and trashed=false`,
        fields: 'files(id , name)'
    });

    // si existe lo actualiza
    if (listRes.data.files.length>0){
        const fileId = listRes.data.files[0].id;
        const updateRes = await drive.files.update({
            fileId   : fileId,
            media   : media
        })
    }
    else{
        // si no existe lo crea
        const res = await drive.files.create({
            resource : fileMetadata,
            media : media,
            fields : 'id'
        })
    }


    console.log("el archivo db.db se subió al drive  de marcosmarchese04@gmail.com");
}


module.exports = {
    pushToDrive
}