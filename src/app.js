const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

/* some functions to find conversations and messages */

let conservationID;
// Find conversation ID using the conversations.list method
async function findConversation(name) {
  try {
    // Call the conversations.list method using the built-in WebClient
    const result = await app.client.conversations.list({
      // The token you used to initialize your app
      token: process.env.SLACK_BOT_TOKEN
    });

    for (const channel of result.channels) {
      if (channel.name === name) {
        conversationId = channel.id;

        // Print result
        console.log("Found conversation ID: " + conversationId);
        // Break from for loop
        break;
      }
    }
  }
  catch (error) {
    console.error(error);
  }
}
findConversation("bot-testing-public")

// ID of channel you watch to fetch the history for
let channelId = conservationID;

// Store message
let message;

// find last message
async function fetchMessage(id) {
  try {
    // Call the conversations.history method using the built-in WebClient
    const result = await app.client.conversations.history({
      // The token you used to initialize your app
      token: process.env.SLACK_BOT_TOKEN,
      channel: id,
      // Limit results
      inclusive: true,
      limit: 1
    });
    // There should only be one result (stored in the zeroth index)
    message = result.messages[0];
    // Print message text
    console.log(message.text);
    return message.text
  }
  catch (error) {
    console.error(error);
  }
}


// censor function

var swearwords = ["shit", "fuck", "damn", "testcensor"]; // sorry for the obscene code (:

function censor(string) { // unused, but can at some point be used to censor strings
    var newString = string;
    for (let word in swearwords) {
        console.log(swearwords[word])
        newString = string.replaceAll(swearwords[word], '{censored}');
    }
    return newString;
}



//actual actions

// Listens to incoming messages that contain swearwords
for (let word in swearwords) {
  app.message(word, async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`Hi <@${message.user}>, could you please not swear in the chat? Thank you!`);
  });
}

// I'm testing if I can receive a message: (using fetchMessage) (this only workks in bot-testing-public)
app.message("testword", async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`Hi <@${message.user}>, this message has been recieved! Is this your message: `+fetchMessage(channelId)+'?');
  });

// app start

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  app.logger.info('⚡️ Bolt app is running!');
})();
