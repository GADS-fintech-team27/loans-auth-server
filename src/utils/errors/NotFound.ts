import BaseError from "./BaseError";
import { ErrorType } from "./errors";
import { StatusCode } from "./errors";

export default class NotFound extends BaseError {
  constructor(message) {
    super(ErrorType.NOT_FOUND, StatusCode.NOT_FOUND, message);
  }
}
