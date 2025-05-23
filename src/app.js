const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

var swearwords = ["shit", "fuck", "damn", "testcensor"]; // sorry for the obscene code (:

function censor(string) { // unused, but can at some point be used to censor strings
    var newString = string;
    for (let word in swearwords) {
        console.log(swearwords[word])
        newString = string.replaceAll(swearwords[word], '{censored}');
    }
    return newString;
}

// Listens to incoming messages that contain swearwords
for (let word in swearwords) {
  app.message(word, async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`Hi <@${message.user}>, could you please not swear in the chat? Thank you!`);
  });
}

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  app.logger.info('⚡️ Bolt app is running!');
})();
