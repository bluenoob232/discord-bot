// [ Bot - Made By BlueBlue21 ]

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const moment = require('moment');

const Prefix = require('./main.json').Prefix;
const Token = require('./main.json').Token;

client.commands = new Discord.Collection();

const CmdFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of CmdFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.info.name, command);
}

client.on('ready', () => {
    console.log('Bot Start Time : ' + moment().format('hh:mm A'));
    console.log('Prefix : ' + Prefix + ' / ' + 'Token : ' + Token);

    client.user.setPresence({ activity: { name: Prefix + 'help'}, status: 'online'});
});

client.on('message', msg => {
    if(!msg.content.startsWith(Prefix) || msg.author.bot || msg.channel.type === 'dm') return;

    const args = msg.content.slice(Prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    if(msg.content.startsWith(Prefix)) {
        fs.access('./commands/' + cmd + '.js', (err) => {
            if (err) {
                return;
            } else {
                client.commands.get(cmd).run(client, msg, cmd);
            }
        });
    }
});

client.login(Token);