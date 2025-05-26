
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

export function formatLeaderboard(leaderboardName) {
    var leaderboard = leaderboards.find(lb => lb.name === leaderboardName);
    if (leaderboard) {
        var txt = "";
        var maxUserLength = 0;
        var maxScoreLength = 0;
        for (user in leaderboard.users) {
            if (user.name.lengh > maxUserLength) {
                maxUserLength = user.name.length
            }
            if (user.score.toString().length > maxScoreLength) {
                maxScoreLength = user.score.toString().length;
            }
        }
        var tableLength = maxUserLength+maxScoreLength+7;
        txt += '+' + "-".repeat(maxUserLength+2)+'+'+"-".repeat(maxScoreLength+2)+'+';
        txt += '\n';
        for (user in leaderboard.users) {
            txt += '| ';
            txt += user.name;
            txt += " ".repeat(maxUserLength-user.name.length);
            txt += ' | ';
            txt += user.score;
            txt += " ".repeat(maxScoreLength - user.score.toString().length);
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
