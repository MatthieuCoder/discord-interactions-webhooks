export enum ApplicationCommandOptionType {
    SUB_COMMAND= 1,
    SUB_COMMAND_GROUP,
    STRING,
    INTEGER,
    BOOLEAN,
    USER,
    CHANNEL,
    ROLE
}

export interface ApplicationCommandOptionChoice {
    name: string;
    value: number | string;
}

export interface ApplicationCommandOption {
    type: ApplicationCommandOptionType;
    name: string;
    description: string;
    default?: boolean;
    required?: boolean;
    choices?: ApplicationCommandOptionChoice[];
    options?: ApplicationCommandOption[];
}

export interface ApplicationCommand {
    id: string;
    application_id: string;
    name: string;
    description: string;
    options: ApplicationCommandOption[];
}
