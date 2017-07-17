/*
    Please give credit to tmi.js and AcxRoz look at README.md
    on how to.
*/

var tmi = require("tmi.js");
var oauthFile = require("./oauth.js")
var configFile = require("./configs.js")

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


// AUTO STATS

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
    //REACT COMMANDS///////////////////////////////////////////////////////////////////
    //if(self) return;



    //NORMAL COMMANDS///////////////////////////////////////////////////////////////////

    //Dislays commands
    if(message == configFile.prefix + "commands") {
        client.say(configFile.channelName, "current prefix is " + configFile.prefix + " and our list of command are [discord, rip, satly, twitter, ping,]")
    }

    //Displays twitter
    if(message == configFile.prefix + "twitter") {
        client.say(configFile.channelName, "Find it here >> https://twitter.com/" + configFile.twitterHandle)
    }

    //Displays discord
    if(message == configFile.prefix + "discord") {
        client.say(configFile.channelName, "0ur Discord? Link: >>> https://discord.gg/" + configFile.discordPermLinkCode)
    }

    //Displays current project
    if(message == configFile.prefix + "project") {
        client.say(configFile.channelName, configFile.projectCommand)
    }

    // CUSTOM COMMANDS!!! /////////////////////////////////////

    //Displays Custom command one
    if(message == configFile.prefix + configFile.Custom_Command_Name_1) {
        client.say(configFile.channelName, configFile.Custom_Command_Output_1)
    }

     //Displays Custom command two
    if(message == configFile.prefix + configFile.Custom_Command_Name_2) {
        client.say(configFile.channelName, configFile.Custom_Command_Output_2)
    }

    //Displays Custom command three
    if(message == configFile.prefix + configFile.Custom_Command_Name_3) {
        client.say(configFile.channelName, configFile.Custom_Command_Output_3)
    }

    //Displays Custom command four
    if(message == configFile.prefix + configFile.Custom_Command_Name_4) {
        client.say(configFile.channelName, configFile.Custom_Command_Output_4)
    }

    //Displays Custom command five
    if(message == configFile.prefix + configFile.Custom_Command_Name_5) {
        client.say(configFile.channelName, configFile.Custom_Command_Output_5)
    }

    //Displays Custom command six
    if(message == configFile.prefix + configFile.Custom_Command_Name_6) {
        client.say(configFile.channelName, configFile.Custom_Command_Output_6)
    }

    ////////////////////////////////////////////////////////////

    //When prefix is only stated

    if(message == configFile.prefix) {
        client.say(configFile.channelName, "Command not defined! I'll pull up a list of commands!")
        client.say(configFile.channelName, "*commands")
    }

    if(message == configFile.prefix + "test") {
        client.say(configFile.channelName, "PJSalt ")
    }
    
    //Ping command
    if(message == configFile.prefix + "ping") {
        client.say(configFile.channelName, "Please give me a second to process you're request!")
        client.on("pong", function (latency) {
                client.say(configFile.channelName, "Pong, returned at " + latency + "ms!")
        });
    }

    //MOD COMMANDS///////////////////////////////////////////////////////////////////

    //When prefix is only stated
    if(message == configFile.ModsPrefix) {
        if(message == configFile.ModsPrefix && user.mod){
            client.say(configFile.channelName, "Mod Command not defined! Please try again!")
        }else{
            client.say(configFile.channelName, "Hands off!, this command ain't for you!")
        }
        
    }

    if(message == configFile.ModsPrefix + "modping") {
        if(message == configFile.ModsPrefix + "modping" && user.mod){
            client.say(configFile.channelName, "granted")
        }else{
            client.say(configFile.channelName, "Hands off!, this command ain't for you!")
        }
        
    }
});