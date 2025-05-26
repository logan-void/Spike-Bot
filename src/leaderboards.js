
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