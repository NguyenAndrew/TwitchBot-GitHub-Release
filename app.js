var tmi = require("tmi.js");
var oauthFile = require("./oauth.js")
var configFile = require("./configs.js")
var commandsJSON = require("./commands.json");

var options = {
    options: {
        debug: true

    },
    connection: {
        reconnect: true
    },
    identity: {
        username: oauthFile.BotchannelName,
        password: oauthFile.password,
    },
    channels: [configFile.channelName],
}

var client = new tmi.client(options);

client.connect();

////////////////////////////MODERATION NOTIFYS///////////////

// When user gets timed out
client.on("timeout", function (channel, username, reason, duration) {
    client.say(configFile.channelName, username + " has been timed out for " + duration + " seconds. Reason: " + reason)
});

/////////////////////////////SUPPORT NOTIFYS////////////////////////

// When user resubs!
client.on("resub", function (channel, username, months, message, userstate, methods) {
    client.say(configFile.channelName, username + " has resubed for " + months + "! Saying: " + message + "!")
});

//When someone subscribes
client.on("subscription", function (channel, username, method, message, userstate) {
    client.say(configFile.channelName, username + " thanks for subscribing! ")
});

client.on("hosted", function (channel, username, viewers, autohost) {
    client.say(configFile.channelName, username + " has Hosted " + configFile.channelName + " with " + viewers + " viewers!")
});

/////////////////////////////////////////CHANNEL STATE NOTIFYS/////////////

//sub mode notify
client.on("subscribers", function (channel, enabled) {
    client.say(configFile.channelName, "Subscriber mode has been enabled or disabled")
});

//slow mode notify
client.on("slowmode", function (channel, enabled, length) {
    client.say(configFile.channelName, "Slow mode has been enabled or disabled!")
});

//followerOnly mode notify
client.on("followersonly", function (channel, enabled, length) {
    client.say(configFile.channelName, "Follow only mode enabled or disabled!")

});

// COMMANDS!
client.on("chat", (channel, user, message, self) => {
    //NORMAL COMMANDS///////////////////////////////////////////////////////////////////
    for (var commandSuffix in commandsJSON) {
        if (message == configFile.prefix + commandSuffix) {
            client.say(configFile.channelName, commandsJSON[commandSuffix])
        }
    }
    ////////////////////////////////////////////////////////////

    // When prefix is only stated
    if (message == configFile.prefix) {
        client.say(configFile.channelName, "Command not defined! I'll pull up a list of commands!")
        client.say(configFile.channelName, "*commands")
    }

    // TODO: Fix Ping command, runs indefinitely instead of just once. 
    // if (message == configFile.prefix + "ping") {
    //     client.say(configFile.channelName, "Please give me a second to process you're request!")
    //     client.on("pong", function (latency) {
    //         client.say(configFile.channelName, "Pong, returned at " + latency + "ms!")
    //     });
    // }

    //MOD COMMANDS///////////////////////////////////////////////////////////////////

    //When prefix is only stated
    if (message == configFile.ModsPrefix) {
        if (message == configFile.ModsPrefix && user.mod) {
            client.say(configFile.channelName, "Mod Command not defined! Please try again!")
        } else {
            client.say(configFile.channelName, "Hands off!, this command ain't for you!")
        }

    }

    if (message == configFile.ModsPrefix + "modping") {
        if (message == configFile.ModsPrefix + "modping" && user.mod) {
            client.say(configFile.channelName, "granted")
        } else {
            client.say(configFile.channelName, "Hands off!, this command ain't for you!")
        }

    }
});