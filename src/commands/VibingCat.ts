
import {Command} from "../utils/manager";
import {ApplicationCommandInteraction, ApplicationCommandOptionType} from "../types";


const command: Command = {
    configuration: {
        name: 'vibing-cat',
        description: 'We are vibingggg~',
        options: [],
    },
    async execute(data: ApplicationCommandInteraction): Promise<any> {
        return {
            type: 4,
            data: {
                content: `https://tenor.com/view/cat-vibing-vibing-cat-cat-vibing-dancing-cat-gif-18482815https://tenor.com/view/cat-vibing-vibing-cat-cat-vibing-dancing-cat-gif-18482815`,
            }
        };
    }
};

export default command;
