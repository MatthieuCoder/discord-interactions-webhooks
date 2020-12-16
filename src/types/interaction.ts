import {ApplicationCommandOptionType} from "./commands";

/*
 * The type of an interaction.
 */
export enum InteractionType {
    Ping = 1,
    ApplicationCommand = 2
}

/*
 * The base interactions class.
 */
interface BaseInteraction {
    id: string;
    type: InteractionType;
    token: string;
    version: 1;
}

export interface ApplicationCommandInteraction extends BaseInteraction {
    type: typeof InteractionType.ApplicationCommand;
    user_id: string;
    guild_id: string;
    data: ApplicationCommandInteractionData;
}

export interface ApplicationPingInteraction extends BaseInteraction {
    type: typeof InteractionType.Ping;
}

export interface ApplicationCommandInteractionDataOption {
    name: string;
    value?: ApplicationCommandOptionType;
    options?: ApplicationCommandInteractionDataOption;
}

export type InteractionWebhook =
    ApplicationCommandInteraction |
    ApplicationPingInteraction;

export interface ApplicationCommandInteractionData {
    id: string;
    name: string;
    options?: ApplicationCommandInteractionDataOption[];
}
