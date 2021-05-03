const { spawn } = require('child_process');

async function callToPythonAsync(file, args) {
    let p = spawn('python', [file, args]);
    for await (const data of p.stdout) {
        return data
    }
    p.kill('SIGINT');
}

const signInActivityLogger = ({ username, date, time, firstTimeUser, loggedIn }, activity) => {
    const loginActivity = (activity === "login") ? 
        `${username} tried logging-in on ${date} at ${time}. Able to log in: ${loggedIn}\n` : 
        `${username} tried creating a new account on ${date} at ${time}. First time user: ${firstTimeUser}\n`;
    fs.appendFile('signInActivity.txt', loginActivity, function (err) {
        if (err) return console.error(err);
        console.error('Sign-in activity written to signInActivity.txt');
    }); 
}

const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


module.exports.callToPythonAsync = callToPythonAsync;
module.exports.signInActivityLogger = signInActivityLogger;
module.exports.formatAMPM = formatAMPM;
