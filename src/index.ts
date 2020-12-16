// Interactions server

import Commands from './commands';
import {Manager} from "./utils/manager";

new Manager(Commands, {
    key: process.env.DISCORD_KEY,
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.DISCORD_CLIENT_ID,
});
