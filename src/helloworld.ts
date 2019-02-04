import {
    ServerConnection
  } from '@jupyterlab/services';

import {
	PageConfig
} from '@jupyterlab/coreutils'


function getAbsoluteURL(url:string):string {
    // baseURL always comes with a trailing slash
    let baseURL = PageConfig.getBaseUrl()
    if (url.indexOf('/') == 0) {
        return baseURL + url.substring(1);
    } else {
        return baseURL + url;
    }
}
 
function request(url: string, method: string, data: any): Promise<Response>{
    console.log(method + " " + url)
    console.log("DATA=" + data)

    let dataRequest = {
        method: method,
        body: JSON.stringify(data),
    };
    return ServerConnection.makeRequest(getAbsoluteURL(url), dataRequest, ServerConnection.makeSettings());
}


export class HelloWorld {
    constructor() {}

    async get(): Promise<void> {
        try {
            var val = await request("/hello", "GET", "");
            if (val.status !== 200) {
                console.error(val.status);
                throw new ServerConnection.ResponseError(val);
            }
            console.log(val.body);
            return null;
        } catch (err) {
            throw new ServerConnection.ResponseError(err);
        }
    }
    
    async post(): Promise<void> {
        try {
            var val = await request("/hello", "POST", "");
            if (val.status !== 200) {
                console.error(val.status);
                throw new ServerConnection.ResponseError(val);
            }
            console.log(val.body);
            return null;
        } catch (err) {
            throw new ServerConnection.ResponseError(err);
        }
    }
    
    async postReply(name: string): Promise<string> {
        try {
            var val = await request("/hello/personal", "POST", {"name": name});
            if (val.status !== 200) {
                console.error(val.status);
                throw new ServerConnection.ResponseError(val);
            }
            return val.text();
        } catch (err) {
            throw new ServerConnection.ResponseError(err);
        }
    }
}