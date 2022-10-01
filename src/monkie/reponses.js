const { commaListsOr, stripIndent } = require("common-tags");
const bot = require("../bot");
const { mainServerId } = require("../cfg");
const utils = require("../utils");
// List of all staff roles
let HelpRoles = [
  "Mod",
  "Temp Support",
  "Support",
  "Admin",
  "Head Admin",
  "Manager",
];
let PaidRoles = [
  "1009841770185629862",
  "1009841770185629861",
  "1009841770185629863",
];
const embedColors = {
  Error: 0xff0000,
  Success: 0x33ff00,
  Info: 0xff7b00,
  Msg: 0x1c8adb,
};
let HelpAdminRoles = ["Admin", "Head Admin", "Manager"];
// The verify channel put channel ID and then the channel link with in the brackets this will jump them to the channel.
let VerifyRole = "1009841770152071274";
let VerifyChannel = "1009841770848325755";
let VerifyChannelLink = `[<#${VerifyChannel}>](https://discord.com/channels/${mainServerId}/${VerifyChannel})`;
let ForumChannel = "1023005585953787914";
let ForumChannellLink = `[<#${ForumChannel}>](https://discord.com/channels/824397012685291520/${ForumChannel})`;

const NeedsToBeVerified = (userId) => {
  return {
    embed: {
      description: `**Hello <@${userId}>**,\nIt looks like you ran into an error.`, // "You must verify at [<#978741873906696192>](https://discord.com/channels/1009841770152071270/1009841770848325755) first to open a ticket.\nIf you cannot do that for some reason, please message <@431273657961283614> or <@697678869167341639> and ask them for help.",
      color: embedColors.Error,
      timestamp: new Date().toISOString(),
      fields: [
        {
          name: "Error:",
          value: "You must be a verified user to open a ticket.",
        },
        {
          name: "Fix Problem:",
          value: stripIndent`
          **Option 1:**
          Verify yourself at ${VerifyChannelLink}.
                
          **Option 2:**
          If for some reason **_option 1_** did not work please contact one of our staff members ask them for help.
          You can identify them by if they have one of the following roles:
        ${commaListsOr`${HelpRoles.map((role) => `**_${role}_**`)}`}.`,
        },
        {
          name: "\u200b",
          value: stripIndent`
          **Thanks,**
          **_KeyAuth Team_**`,
        },
      ],
      footer: {
        text: bot.user.username,
        icon_url: bot.user.avatarURL,
      },
    },
  };
};
const BannedFromTickets = (userId) => {
  return {
    embed: {
      description: `**Hello <@${userId}>**,\nIt looks like you ran into an error.`, // "You must verify at [<#978741873906696192>](https://discord.com/channels/1009841770152071270/1009841770848325755) first to open a ticket.\nIf you cannot do that for some reason, please message <@431273657961283614> or <@697678869167341639> and ask them for help.",
      color: embedColors.Error,
      timestamp: new Date().toISOString(),
      fields: [
        {
          name: "Error:",
          value: "You've been blocked from creating tickets",
        },
        {
          name: "Wrongfully Banned:",
          value: stripIndent`
          If you feel like you was wrongfully banned from tickets please contact one of our staff members to discuss this issue.
          You can identify them by if they have one of the following roles:
        ${commaListsOr`${HelpAdminRoles.map((role) => `**_${role}_**`)}`}.`,
        },
        {
          name: "\u200b",
          value: stripIndent`
          **Thanks,**
          **_KeyAuth Team_**`,
        },
      ],
      footer: {
        text: bot.user.username,
        icon_url: bot.user.avatarURL,
      },
    },
  };
};

const IgnoreAccidentalThreads = (userId) => {
  return {
    embed: {
      description: `**Hello <@${userId}>**,\nIt looks like you ran into an error.`, // "You must verify at [<#978741873906696192>](https://discord.com/channels/1009841770152071270/1009841770848325755) first to open a ticket.\nIf you cannot do that for some reason, please message <@431273657961283614> or <@697678869167341639> and ask them for help.",
      color: embedColors.Error,
      timestamp: new Date().toISOString(),
      fields: [
        {
          name: "Error:",
          value:
            "A ticket wasn't created because your message contains typical accidental phrases such as `ok` and `thanks`",
        },
        {
          name: "\u200b",
          value: stripIndent`
          **Thanks,**
          **_KeyAuth Team_**`,
        },
      ],
      footer: {
        text: bot.user.username,
        icon_url: bot.user.avatarURL,
      },
    },
  };
};
const AutoReplyToUser = (userId) => {
  return {
    embed: {
      description: `**Hello <@${userId}>**,\nThank you for your message!\n Please state the reason for opening a ticket right away (saying just \`Help\` is useless to use & will result in a ticket closure).\n\n**_Please be patient while support assists you._**`, // "You must verify at [<#978741873906696192>](https://discord.com/channels/1009841770152071270/1009841770848325755) first to open a ticket.\nIf you cannot do that for some reason, please message <@431273657961283614> or <@697678869167341639> and ask them for help.",
      color: embedColors.Msg,
      timestamp: new Date().toISOString(),
      fields: [
        {
          name: "Reminder:",
          value:
            "Tickets are only for account issues/purchase questions. Your ticket will be closed without an answer if you make a ticket for any other reason.",
        },
        {
          name: "Important Information:",
          value: `If your question is about KeyAuth examples, please do \`.close\` and create a forum post at ${ForumChannellLink}.`,
        },
        {
          name: "Help Link(s):",
          value:
            "If you lost access or forgot your email please visit this link [Here](https://keyauth.cc/newEmail/) to change the email on the account.",
        },
        {
          name: "\u200b",
          value: stripIndent`
          **Thanks,**
          **_KeyAuth Team_**`,
        },
      ],
      footer: {
        text: bot.user.username,
        icon_url: bot.user.avatarURL,
      },
    },
  };
};
const UserEditMsg = (oldContent, newContent) => {
  return {
    embed: {
      description: "**The user edited their message:**",
      fields: [
        {
          name: "From:",
          value: oldContent,
        },
        {
          name: "To:",
          value: newContent,
        },
      ],
      color: embedColors.Info,
    },
  };
};
const ClosedTicketLog = (body, logUrl) => {
  return {
    embed: {
      title: "Ticket Closed",
      color: embedColors.Info,
      description: utils.trimAll(`${body}\nLog: [Click Me](${logUrl})`),
    },
    footer: {
      text: bot.user.username,
      icon_url: bot.user.avatarURL,
    },
  };
};
const FreshTicketMessage = (infoHeader) => {
  return {
    embed: {
      title: "New Modmail Thread",
      color: embedColors.Msg,
      description: infoHeader,
      timestamp: new Date().toISOString(),
    },
  };
};
const FetchUserLogs = (msg) => {
  return {
    embed: {
      color: embedColors.Msg,
      description: msg,
    },
  };
};
module.exports = {
  FetchUserLogs,
  FreshTicketMessage,
  NeedsToBeVerified,
  BannedFromTickets,
  VerifyRole,
  IgnoreAccidentalThreads,
  AutoReplyToUser,
  UserEditMsg,
  ClosedTicketLog,
  embedColors,
  PaidRoles,
};
