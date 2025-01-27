class BaseError {
  constructor(type = null) {
    this.error = {
      type,
      timestamp: Date.now(),
    };
  }
}

export class PayloadError extends BaseError {
  constructor(key = null, msg = null, service = null) {
    super("payload");
    this.error.code = 400;
    this.error.key = key;
    this.error.message = msg;
    this.error.service = service;
  }
}

export class InternalError extends BaseError {
  constructor(msg = null, service = null) {
    super("internal");
    this.error.code = 500;
    this.error.message = ["Internal server error"];
    this.error.service = service;

    if (msg) {
        this.processMessages(msg);
    }
  }

  processMessages(msg) {
    this.error.message = 
        this.error.message.concat(
            Array.isArray(msg)? msg : [msg]
        );
  }
}
