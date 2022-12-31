const Discord = require('discord.js')
const client = new Discord.Client({
    fetchAllMembers: true,
     partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_PRESENCES', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'] ,
     intents: [
        32767
      ]
    })
const {readdirSync} = require("fs")
const db = require('quick.db')
const ms = require("ms")
const { MessageEmbed } = require('discord.js')
const {login } = require("./util/login.js");
login(client)
process.on("unhandledRejection", err => {
   if(err.message) return
  console.error("Uncaught Promise Error: ", err);
})
const loadCommands = (dir = "./commands/") => {
    readdirSync(dir).forEach(dirs => {
      const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
  
      for (const file of commands) {
        const getFileName = require(`${dir}/${dirs}/${file}`);
        client.commands.set(getFileName.name, getFileName);
     console.log(`> Comando cargado ${getFileName.name} [${dirs}]`)
  };
    });
  };
  const loadEvents = (dir = "./events/") => {
    readdirSync(dir).forEach(dirs => {
      const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
  
      for (const event of events) {
        const evt = require(`${dir}/${dirs}/${event}`);
        const evtName = event.split(".")[0];
        client.on(evtName, evt.bind(null, client));
        console.log(`> Evento cargado ${evtName}`)
      };
    });
  };

loadEvents();
loadCommands();