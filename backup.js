const cron = require('node-cron');
const { exec } = require('child_process');
require('dotenv').config();

// Path to your batch files
const createBatchFilePath = 'batch_mysql_dump.bat';
const deleteBatchFilePath = 'batch_delete_mysqldump.bat';

// Schedule the create backup task to run daily at 1:00 AM IST
// cron.schedule('0 1 * * *', () => {
    cron.schedule('* * * * *', () => {
    console.log('Running the backup creation script...');

    exec(createBatchFilePath, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing backup creation batch file: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`Error output during backup creation: ${stderr}`);
            return;
        }

        console.log(`Backup creation output: ${stdout}`);
        console.log('Backup creation completed successfully.');
    });
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});

console.log('Backup creation scheduler is running. Press Ctrl+C to exit.');

// Schedule the delete old backups task to run daily at 2:00 AM IST
// cron.schedule('0 2 * * *', () => {
    cron.schedule('* * * * *', () => {
    console.log('Running the backup deletion script...');

    exec(deleteBatchFilePath, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing backup deletion batch file: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`Error output during backup deletion: ${stderr}`);
            return;
        }

        console.log(`Backup deletion output: ${stdout}`);
        console.log('Backup deletion completed successfully.');
    });
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});

console.log('Backup deletion scheduler is running. Press Ctrl+C to exit.');
