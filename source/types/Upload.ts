import { Stream } from "nodemailer/lib/xoauth2";

export interface Upload {
    filename: string;
    mimetype: string;
    encodig: string;
    createReadStream: () => Stream;
}