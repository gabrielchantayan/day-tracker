import { log } from "./logger"

export const test = (data: any) => {
    log(JSON.stringify(data), 0, 'TEST');
}