exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-lets
    if(args.length === 0) return message.channel.send("Nutze `!join <role>` um eine Skill-Gruppe zu joinen.");
    const skillGroups = ["css", "html", "affinityphoto", "ruby", "sql", "c++", "c#", "swift", "phyton", "java", "php", "javascript", "blender", "cinema4d", "gimp", "photoshop"];
    let addedRanks = [], removedRanks = [];
    for(let rank in args) {
        if (skillGroups.indexOf(rank.toLowerCase()) === -1) continue;
        role = message.guild.roles.find(r => r.name.toLowerCase() === rank.toLowerCase());
        if (!role) return;
        if(message.member.roles.has(role.id)) {
            try {
                await message.member.removeRole(role, "Requested via !join.");
                removedRanks.push(role);
            } catch(ex) {
                // No perms
            }
        } else {
            try {
                await message.member.addRole(role, "Requested via !join.");
                addedRanks.push(role);
            } catch(ex) {
                // No perms
            }
        }
    }

    if(addedRanks.length > 0) {
        return message.channel.send("Du wurdest zu den Gruppe(n) **" + addedRanks.join(", ") + "** hinzugefügt.");
    }
    if(removedRanks.length > 0) {
        return message.channel.send("Du wurdest aus den Gruppe(n) **" + removedRanks.join(", ") + "** entfernt.");
    }
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "join",
    category: "Utility",
    description: "Bekomme nen Rang ohne nen Admin vollzuspamen. - voll schlau von mir",
    usage: "join <role>"
  };