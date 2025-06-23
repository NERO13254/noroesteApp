const fs = require('fs');
const { google } = require('googleapis');
const readline = require('readline');

const client_id = "457329231616-mh3idrlg6v2448bk5kp82k3udu9e3dfl.apps.googleusercontent.com";
const client_secret = "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";
const redirect_uris = ["http://localhost"];

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

function getAccessToken() {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Autoriza esta app visitando esta URL:', authUrl);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Introduce el código de autorización aquí: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error recuperando el token', err);
            oAuth2Client.setCredentials(token);
            fs.writeFileSync('C:\\Users\\Usuario\\Desktop\\electron\\2\\tokens.json', JSON.stringify(token));
            console.log('Token guardado en token.json');
        });
    });
}

getAccessToken();