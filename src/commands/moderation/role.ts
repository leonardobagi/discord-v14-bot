import { ApplicationCommandOptionType } from "discord.js";

export default {
    name: "role",
    description: "Manages roles",

    options: [
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "add",
            description: "Adds a role to a user",
            options: [
                {
                    name: "role",
                    description: "The role to add",
                    type: ApplicationCommandOptionType.Role,
                    required: true,
                },
                {
                    name: "target",
                    description: "The target user, or leave empty for yourself",
                    type: ApplicationCommandOptionType.User,
                    required: false,
                },
            ],
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "remove",
            description: "Removes a role from a user",
            options: [
                {
                    name: "role",
                    description: "The role to remove",
                    type: ApplicationCommandOptionType.Role,
                    required: true,
                },
                {
                    name: "target",
                    description: "The target user, or leave empty for yourself",
                    type: ApplicationCommandOptionType.User,
                    required: false,
                },
            ],
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "create",
            description: "Creates a role",
            options: [
                {
                    name: "name",
                    description: "The role name",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "color",
                    description: "The role color hexadecimal code (including the #)",
                    type: ApplicationCommandOptionType.String,
                    required: false,
                },
                {
                    name: "hoist",
                    description: "Whether the role should be hoisted",
                    type: ApplicationCommandOptionType.Boolean,
                    required: false,
                },
                {
                    name: "mentionable",
                    description: "Whether the role can be mentioned",
                    type: ApplicationCommandOptionType.Boolean,
                    required: false,
                },
                {
                    name: "icon_or_emoji",
                    description: "An emoji (belonging to this server or emoji URL) or an image URL",
                    type: ApplicationCommandOptionType.String,
                    required: false,
                },
                {
                    name: "reason",
                    description: "The reason to create the role.",
                    type: ApplicationCommandOptionType.String,
                    required: false,
                },
                {
                    name: "position",
                    description: "The role position, where 0 is bottom",
                    type: ApplicationCommandOptionType.Number,
                    required: false,
                },
            ],
        },
        {
            name: "edit",
            description: "Edits a certain role",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "role",
                    description: "The role to edit",
                    type: ApplicationCommandOptionType.Role,
                    required: true,
                },
                {
                    name: "name",
                    description: "The role name",
                    type: ApplicationCommandOptionType.String,
                    required: false,
                },
                {
                    name: "color",
                    description: "The role color hexadecimal code (including the #)",
                    type: ApplicationCommandOptionType.String,
                    required: false,
                },
                {
                    name: "hoist",
                    description: "Whether the role should be hoisted",
                    type: ApplicationCommandOptionType.Boolean,
                    required: false,
                },
                {
                    name: "mentionable",
                    description: "Whether the role can be mentioned",
                    type: ApplicationCommandOptionType.Boolean,
                    required: false,
                },
                {
                    name: "icon_or_emoji",
                    description: "An emoji (belonging to this server or emoji URL) or an image URL",
                    type: ApplicationCommandOptionType.String,
                    required: false,
                },
                {
                    name: "reason",
                    description: "The reason to create the role.",
                    type: ApplicationCommandOptionType.String,
                    required: false,
                },
                {
                    name: "position",
                    description: "The role position, where 0 is bottom",
                    type: ApplicationCommandOptionType.Number,
                    required: false,
                },
            ],
        },
    ],

    callback: async ({ interaction }) => {
        if (!interaction.member.permissions.has("ManageRoles"))
            return interaction.reply("You don't have enough permissions to run such command");

        const sub = interaction.options.getSubcommand(true);

        if (sub === "create") {
            interaction.guild.roles
                .create({
                    name: interaction.options.getString("name", true),
                    color: interaction.options.getString("color") as `#${string}`,
                    hoist: interaction.options.getBoolean("hoist") || false,
                    icon: interaction.options.getString("icon_or_emoji"),
                    mentionable: interaction.options.getBoolean("mentionable") || false,
                    position: interaction.options.getNumber("position") || 0,
                    reason: interaction.options.getString("reason") || undefined,
                })
                .then(e => interaction.reply("Role " + e.name + " created"));
        } else {
            const role = interaction.options.getRole("role", true);
            const member = interaction.options.getMember("target") || interaction.member;

            switch (sub) {
                case "add":
                    if (member.roles.cache.has(role.id))
                        return interaction.reply(`${member.displayName} already have '${role.name}' role`);

                    await member.roles.add(role.id);
                    interaction.reply(`Role '${role.name}' added to \`${member.displayName}\``);
                    break;

                case "remove":
                    if (!member.roles.cache.has(role.id))
                        return interaction.reply(`\`${member.displayName}\` does not have '${role.name}' role`);

                    await member.roles.remove(role.id);
                    interaction.reply(`Role '${role.name}' removed from \`${member.displayName}\``);
                    break;

                case "edit":
                    interaction.guild.roles
                        .edit(role, {
                            name: interaction.options.getString("name") || role.name,
                            color: (interaction.options.getString("color") as `#${string}`) || role.color,
                            hoist: interaction.options.getBoolean("hoist") || role.hoist,
                            icon: interaction.options.getString("icon_or_emoji") || role.icon,
                            mentionable: interaction.options.getBoolean("mentionable") || role.mentionable,
                            position: interaction.options.getNumber("position") || role.position,
                            reason: interaction.options.getString("reason") || undefined,
                        })
                        .then(e => interaction.reply("Role '" + e.name + "' edited"));
                    break;

                default:
                    break;
            }
        }
    },
} as Command;
