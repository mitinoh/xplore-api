import { HttpStatus, Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import * as firebase from 'firebase-admin'
import { UserDocument, UserSchema } from 'src/api/user/entities/user.entity';
import * as serviceAccount from './firebaseServiceAccount.json'
import { Model } from "mongoose";
import mongoose from 'mongoose';
import { UserService } from 'src/api/user/user.service';

const firebase_params = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privatekeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authuri: serviceAccount.auth_uri,
    tokenUri: serviceAccount. token_uri,
    authProviderx509certurl: serviceAccount.auth_provider_x509_cert_url,
    clientcs09Certurl: serviceAccount.client_x509_cert_url
};
@Injectable()
export class AuthService implements NestMiddleware {

    private defaultApp: any;

    constructor(@Inject('winston') private readonly logger: Logger) {
        this.defaultApp = firebase.initializeApp({
            credential: firebase.credential.cert(firebase_params),
        })
    }

    use(req: any, res: any, next: (error?: any) => void) {
        const token = req.headers.authorization;
        if (token != null && token != '') {
            this.defaultApp.auth().verifyIdToken(token)
                .then(async (decodeToken: any) => {
                    const user = {
                        email: decodeToken.email
                    }
                    req['user'] = user;
                    next();
                }).catch((error: any) => {
                    this.logger.error(error)
                });
        } 
        res.status(HttpStatus.BAD_REQUEST)
        .send("saving " + JSON.stringify("errorer asdadsas"));
    }

    getUserToken(req: any) {
        const token = req.headers.authorization;
       
       return this.defaultApp.auth().verifyIdToken(token)
                .then(async (decodeToken: any) => {
                    return decodeToken.uid
                    
                }).catch((error: any) => {
                    this.logger.error(error)
                    return "";
                });
    }
    
    private accessDenied(url: string, res: Response) {
        console.log("access denied")
        /*
        res.status(403).json({
            statusCode: 403,
            timestamp: new Date().toISOString(),
            path: url,
            message: "access denied"
        })
        */
    }

}
