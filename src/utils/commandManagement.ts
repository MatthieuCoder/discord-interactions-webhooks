import {ApplicationCommand, ApplicationCommandOption} from "../types/commands";
import fetch from 'node-fetch';

const GLOBAL = 'https://discord.com/api/v8/applications';

/*
 * Manages the commands
 * All endpoints are implemented here.
 */
export class CommandManager {
    /*
     * Starts a manager with the given token & client_id.
     */
    constructor(
        private readonly token: string,
        private readonly clientId: string
    ) {
        console.debug('Command manager: Started.');
    };


    public async fetchCommands (): Promise<ApplicationCommand[]> {
        const result = await fetch(`${GLOBAL}/${this.clientId}/commands`, {
            method: 'get',
            headers: {
                'Authorization': `Bot ${this.token}`,
            },
        });
        const commands: ApplicationCommand[] = await result.json();
        console.debug('Command manager: Global command list fetched. %s commands available', commands.length);
        return commands;
    }

    public async fetchCommandForGuild (guild: string): Promise<ApplicationCommand[]> {
        const result = await fetch(`${GLOBAL}/${this.clientId}/guilds/${guild}/commands`, {
            method: 'get',
            headers: {
                'Authorization': `Bot ${this.token}`,
            },
        });
        const commands: ApplicationCommand[] = await result.json();
        console.debug('Command manager: Guild command list fetched. %s commands available', commands.length);
        return commands;
    }

    public async createOrUpdateGlobalCommand (command: {
        name: string;
        description: string;
        options?: ApplicationCommandOption[];
    }): Promise<ApplicationCommand> {
        const result = await fetch(`${GLOBAL}/${this.clientId}/commands`, {
            method: 'post',
            headers: {
                'Authorization': `Bot ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(command),
        });
        const commands: ApplicationCommand = await result.json();
        console.debug('Command manager: Global command created', commands.id);
        return commands;
    }

    public async createOrUpdateGuildCommand (command: {
        name: string;
        description: string;
        options?: ApplicationCommandOption[];
    }, guild: string): Promise<ApplicationCommand> {
        const result = await fetch(`${GLOBAL}/${this.clientId}/guilds/${guild}/commands`, {
            method: 'post',
            headers: {
                'Authorization': `Bot ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(command),
        });
        const commands: ApplicationCommand = await result.json();
        console.debug('Command manager: Guild command created', commands.id);
        return commands;
    }
}
