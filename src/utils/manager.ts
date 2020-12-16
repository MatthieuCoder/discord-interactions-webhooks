// Commands manager

import {ApplicationCommandInteraction, ApplicationCommandOption} from "../types";
import {CommandManager} from "./commandManagement";
import {CommandServer} from "./commandServer";

export type Command = {
    configuration: {
        name: string;
        description: string;
        options?: ApplicationCommandOption[];
    };
    execute: (data: ApplicationCommandInteraction) => Promise<any>;
};

export class Manager {
    private manager: CommandManager;
    private server: CommandServer;

    public constructor(private readonly commands: Command[], private config: {
        token: string;
        clientId: string;
        key: string;
    }) {
        this.manager = new CommandManager(this.config.token, this.config.clientId);
        this.server = new CommandServer(5000, this.config.key, this.handle.bind(this));

        for (const command of commands) {
            this.manager.createOrUpdateGlobalCommand(command.configuration).then(r => {
                console.log('command created!' + command.configuration.name);
            });
            this.manager.createOrUpdateGuildCommand(command.configuration, '708674819238920265').then(r => {
                console.log('command created!' + command.configuration.name);
            });
        }

        this.server.coldStart();
    }


    private async handle (data: ApplicationCommandInteraction) {
        const index = this.commands.find(x => data.data.name === x.configuration.name);
        if (!!index) {
            return await index.execute(data);
        }
    }
}
