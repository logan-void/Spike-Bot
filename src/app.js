import * as Censor from "./censor.js";
import * as Msgfn from "./message_functions.js"

const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});


// Listens to incoming messages that contain swearwords
for (let word in Censor.swearwords) {
  app.message(word, async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`Hi <@${message.user}>, could you please not swear in the chat? Thank you!`);
  });
}

// I'm testing if I can receive a message: (using fetchMessage) (this only works in bot-testing-public)
app.message("testword", async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`Hi <@${message.user}>, this message has been recieved! Is this your message: `+Msgfn.fetchMessage(Msgfn.bot_testing_public)+'?');
  });

// app start

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  app.logger.info('⚡️ Bolt app is running!');
})();
