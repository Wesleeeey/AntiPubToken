const config = require('./config.js')
const axios = require('axios')
const { green, red } = require('colors')

const DiscordBot = require('discord.js-v12-fix-ratelimit');
const bot = new DiscordBot.Client();
bot.login(config.tokenBot).then(() => console.log(`${bot.user.tag} (MASTER) connecté.`));

var arrTokens = [
    "token user 1",
    "token user 2",
    "token user 3"
]

for (const token of arrTokens) {
    pub(token)
}

function pub(token) {
    const Discord = require("discord.js")
    const c = new Discord.Client()
    const client = c
    c.login(token).then(async () => {
        const guild = client.guilds.get(config.guildID);
        var channels = guild.channels.filter(c => c.parentID === `${config.categoryID}` && c.type === "voice")
        let i = Math.floor(Math.random() * (1 - channels.size - 1) + channels.size - 1);
        client.channels.get(Array.from(channels)[i][0]).join().then(e => console.log(green(`${c.user.tag} => ${e.channel.name}`)))

        c.on("message", async message => {
            if (message.content.includes("discord.gg/") || message.content.includes("https://")) {
                if (message.channel.type === "dm") {
                    bot.channels.cache.get(config.channelLogs).send({
                        embed: {
                            title: `Tentative de Pub`,
                            description: `\\👤 Author: ${message.author}\n\\🔗Invite: \`${message.content}\`\n\n\`Je l'ai banni du serveur\``,
                            color: 0x2E3136
                        }
                    })
                    axios({
                        url: `https://discord.com/api/v9/guilds/${config.guildID}/bans/${message.author.id}`,
                        method: 'PUT',
                        headers: {
                            Authorization: `Bot ${bot.token}`
                        },
                        data: {
                            delete_message_days: '1',
                            reason: 'AntiPub'
                        }
                    }).catch(err => console.log(`Je n'ai pas pu ban ${message.author.tag}`))
                }
            }
        })
    })
}