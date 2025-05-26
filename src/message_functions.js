/* some functions to find conversations and messages */

// Find conversation ID using the conversations.list method
export async function findConversation(name) {
  try {
    // Call the conversations.list method using the built-in WebClient
    const result = await app.client.conversations.list({
      // The token you used to initialize your app
      token: process.env.SLACK_BOT_TOKEN
    });

    for (const channel of result.channels) {
      if (channel.name === name) {
        console.log("Found conversation ID: " + conversationId);
        return channel.id
      }
    }
  }
  catch (error) {
    console.error(error);
  }
}
// find last message
export async function fetchMessage(id, returnAsString=false) {
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
    var message = result.messages[0];
    // Print message text
    console.log(message.text);
    if (returnAsString) {
        return message.text
    }
    return message
  }
  catch (error) {
    console.error(error);
  }
}

export var bot_testing_public = findConversation("bot-testing-public")