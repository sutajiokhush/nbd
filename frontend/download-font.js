const fs = require('fs');
const https = require('https');
const path = require('path');

const fileUrl = "https://github.com/google/fonts/raw/main/ofl/spicysale/SpicySale-Regular.ttf";
const outputDir = path.join(__dirname, 'public', 'fonts');
const outputPath = path.join(outputDir, 'SpicySale-Regular.ttf');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const file = fs.createWriteStream(outputPath);

console.log(`Downloading ${fileUrl} to ${outputPath}...`);

https.get(fileUrl, (response) => {
    if (response.statusCode !== 200) {
        console.error(`Failed to download: HTTP Status Code ${response.statusCode}`);
        return;
    }

    response.pipe(file);

    file.on('finish', () => {
        file.close();
        console.log('Download completed successfully.');
    });
}).on('error', (err) => {
    fs.unlink(outputPath, () => { }); // Delete the file async. (But we don't check for this)
    console.error(`Error downloading file: ${err.message}`);
});
