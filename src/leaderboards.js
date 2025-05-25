
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
        var userEntry = leaderboard.users.find(name => name === userName);
        if (userEntry) {
            userEntry.score += score;
        } else {
            leaderboard.users.push({ name: userName, score: score });
        }
    } else {
        console.error('Leaderboard ${leaderboardName} not found.');
    }
}
