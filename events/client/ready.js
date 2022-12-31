const Discord = require("discord.js");
const disbut = require("discord-buttons")
const db = require("quick.db")

require('http').createServer((req, res) => res.end(`
 Bot carga2.
`)).listen(3000)

module.exports = (client) => {
    console.log(`- Connecté à ${client.user.username}`)
    client.guilds.cache.map(async guild => {
        await guild.members.fetch().catch(e => { })
    })
}
