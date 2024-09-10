import express, {Request, Response, NextFunction} from "express";
import http from "http";
import cors from 'cors'
import stripAnsi from "strip-ansi";

function handleErrors(
    handlerFunc: (request: Request, response: Response) => Promise<Response<any, Record<string, any>> | undefined | void>) {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handlerFunc(req, res);
        } catch (e) {
            next(e);
        }
    }
}


export async function accountInformation(request: Request, response: Response) {
    console.log("accountInformation")
    return response.json({code: 200})
}


function runMain() {

    const server = express();
    const workerPort = 8007

    // 解决跨域问题
    server.use(cors({
        credentials: true,
        origin: true,
    }));
    server.use(express.json());

    server.use(express.static('dist'))
    server.get("/account/information", handleErrors(accountInformation));
    server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        const message = stripAnsi(err.stack || err.message || 'Unknown error')
        res.status(500).send({
            asset: 'failed',
            message: message
        })
    })

    const httpServer = http.createServer(server);

    httpServer.listen(workerPort, async () => {
        console.log(
            `Worker server is running on http://localhost:${workerPort}`,
        );
    });
}

runMain();
