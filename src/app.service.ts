import { Injectable } from '@nestjs/common';
import { Http2ServerRequest, Http2ServerResponse } from 'http2';
import { auth } from './app.properties';



@Injectable()
export class AppService {

  doControls(req: Http2ServerRequest): boolean {
    if(auth.isFromDart) {
      if(!this.reqFromDart(req)) return false;
      return true
    }

    return true;
  }

  reqFromDart(req: Http2ServerRequest): boolean { 
    return req.headers['user-agent'].includes("dart:io")}



}
