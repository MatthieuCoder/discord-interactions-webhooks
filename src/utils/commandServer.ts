// Server class
import express, {NextFunction, Request, Response} from 'express';
import {
    ApplicationCommandInteraction,
    InteractionType,
    InteractionWebhook
} from "../types";
import nacl from 'tweetnacl';
import morgan from 'morgan';

export class CommandServer {

    private initialized: boolean = false;
    private initializeCallback?: Function;

    constructor(private readonly port: number, private readonly key: string, private readonly onData: (data: ApplicationCommandInteraction) => Promise<any>) {}

    async coldStart () {
        const server = express();
        server.use(morgan('dev'));
        server.use(express.text({
            limit: 10 ** 8,
            type: '*/*',
        }));
        server.use('/', (req, res) => {
            res.status(200);
            res.json({
                ok: true,
            });
        });
        server.use('/webhook', this.serve.bind(this));

        const startPromise = new Promise<void>((acc) => {
            this.initialized = false;
            this.initializeCallback = () => {
                this.initialized = true;
                this.initializeCallback = undefined;
                acc();
            };
        });

        server.listen(this.port);

        await startPromise;
    }

    private async serve (req: Request, res: Response, next: NextFunction) {
        // Check the request!
        // TODO: Signature check.

        const signature = req.get('X-Signature-Ed25519');
        const timestamp = req.get('X-Signature-Timestamp');
        const body = req.body; // rawBody is expected to be a string, not raw bytes
        if (!signature || !timestamp || !body) {
            res.status(400);
            res.end();
            return;
        }

        const isVerified = nacl.sign.detached.verify(
            Buffer.from(timestamp + body),
            Buffer.from(signature, 'hex'),
            Buffer.from(this.key, 'hex')
        );

        if (isVerified) {
            const data: InteractionWebhook = JSON.parse(req.body);
            // Responds to the pings.
            if (data.type === InteractionType.Ping) {
                if (!this.initialized && this.initializeCallback) {
                    // call the initialization callback.
                    this.initializeCallback();
                }
                res.json({
                   type: InteractionType.Ping,
                });
                return;
            }

            if (data.type === InteractionType.ApplicationCommand) {
                // command called!
                res.json(await this.onData(data));
                return;
            }
            next();
        } else {
            res.status(401);
            res.end();
        }
    }
}
