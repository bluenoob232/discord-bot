const { Discord, MessageEmbed } = require('discord.js');
const Prefix = require('../main.json').Prefix;

module.exports.run = async(client, msg, cmd) => {
    msg.reply("Look at DM");

    const embed = new MessageEmbed()
        .setTitle("Commands")
        .setDescription("It's Bot Commands")
        .setColor("#2271f0");

    client.commands.array().forEach((cmds) => {
        embed.addField(
            Prefix + cmds.info.name,
            cmds.info.description,
            true
        );
    });

    embed.setTimestamp();
    
    msg.author.send(embed);
};

module.exports.info = {
    name: "help",
    description: "Showing Commands."
};