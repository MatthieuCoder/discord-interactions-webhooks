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
                description: 'The person you want to say hi to.',
                required: true,
            },
            {
                name: 'message',
                type: ApplicationCommandOptionType.STRING,
                description: 'The message',
                required: true,
            },
        ],
    },
    async execute(data: ApplicationCommandInteraction): Promise<any> {
        const [{
            value
        }, {
            value: message
        }] = data.data.options;

        return {
            type: 4,
            data: {
                content: `Hey <@${value}>! ${message.replace('@', '')}`,
            }
        };
    }
};

export default command;
