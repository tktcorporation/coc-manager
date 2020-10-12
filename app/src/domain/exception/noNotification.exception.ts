import { BaseException } from "./base.exception";
import { ErrorMessages } from "./message";

export class NoNotificationException extends BaseException {
    constructor(message?: string) {
        super(message ?? ErrorMessages.NO_NOTIFICATION);
    }
}
