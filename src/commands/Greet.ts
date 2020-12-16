import {Command} from "../utils/manager";
import {ApplicationCommandInteraction, ApplicationCommandOptionType} from "../types";


const command: Command = {
    configuration: {
        name: 'greet',
        description: 'Say hi to your friends!',
        options: [
            {
                name: 'user',
                type: ApplicationCommandOptionType.USER,
                description: 'The person you want to say hi to.'
            },
        ],
    },
    async execute(data: ApplicationCommandInteraction): Promise<any> {
        const [{
            value
        }] = data.data.options;

        return {
            type: 4,
            data: {
                content: `Hey <@${value}>! Hello`,
            }
        };
    }
};

export default command;
