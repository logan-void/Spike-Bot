
/* just some code to send leaderboard messages */
// - Charlie
// - 2023-10-01

const { App } = require('@slack/bolt');

async function getAllPeople() {
    try {
        // Call the users.list method using the WebClient
        const result = await client.users.list();

        return result
    }
    catch (error) {
        console.error(error);
    }
}

export var members = getAllPeople()

export var leaderboards = [
    {
        name: "labTime",
        description: "Most time spent in the lab",
        users: [
        ]
    }
]

export function addToLeaderboard(leaderboardName, userName, score) {
    var leaderboard = leaderboards.find(lb => lb.name === leaderboardName);
    if (leaderboard) {
        var userEntry = leaderboard.users.find(user => user.name === userName);
        if (userEntry) {
            userEntry.score += score;
        } else {
            leaderboard.users.push({ name: userName, score: score });
        }
    } else {
        console.error('Leaderboard ${leaderboardName} not found.');
    }
}

export function removeFromLeaderboard(leaderboardName, userName) {
    var leaderboard = leaderboards.find(lb => lb.name === leaderboardName);
    if (leaderboard) {
        var userEntry = leaderboard.users.find(user => user.name === userName);
        if (userEntry) {
            var index = leaderboard.users.indexOf(userEntry);
            leaderboard.users.splice(index, 1);
        } else {
            console.error('User ${userName} not found.');
        }
    } else {
        console.error('Leaderboard ${leaderboardName} not found.');
    }
}


export function addLeaderboard(name, description) {
    leaderboards.push({name: name, description: description, users: []})
}

/* example table:

LeaderboardName
+-------+-----+
| name1 | 100 |
+-------+-----+
| name2 | 90  |
+-------+-----+
*/

export function formatLeaderboard(leaderboardName) {
    var leaderboard = leaderboards.find(lb => lb.name === leaderboardName);
    if (leaderboard) {
        var txt = leaderboard.description + '\n';
        var maxUserLength = 0;
        var maxScoreLength = 0;
        for (let user in leaderboard.users) {
            if (leaderboard.users[user].name.length > maxUserLength) {
                maxUserLength = leaderboard.users[user].name.length
            }
            if (leaderboard.users[user].score.toString().length > maxScoreLength) {
                maxScoreLength = leaderboard.users[user].score.toString().length;
            }
        }
        txt += '+' + "-".repeat(maxUserLength+2)+'+'+"-".repeat(maxScoreLength+2)+'+';
        txt += '\n';
        for (let user in leaderboard.users) {
            txt += '| ';
            txt += leaderboard.users[user].name;
            txt += " ".repeat(maxUserLength-leaderboard.users[user].name.length);
            txt += ' | ';
            txt += leaderboard.users[user].score;
            txt += " ".repeat(maxScoreLength - leaderboard.users[user].score.toString().length);
            txt += " |";
            txt += '\n';
            txt += '+' + "-".repeat(maxUserLength+2)+'+'+"-".repeat(maxScoreLength+2)+'+';
            txt += '\n';
        }
        return txt
    } else {
        console.error('Leaderboard ${leaderboardName} not found.');
    }
}
