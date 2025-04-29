export class AppError extends Error {
    code: number;
    constructor(message: string, code: number) {
      super();
      this.message = message;
      this.code = code;
      this.name = "AppError";
    }
  }
  
  export class UserAlreadyExist extends Error {
    code: number;
    constructor(message: string, code: number) {
      super();
      this.message = message;
      this.code = code;
      this.name = "UserAlreadyExist";
    }
  }
  
  export class NotFound extends Error {
    code: number;
    constructor(message: string, code: number) {
      super();
      this.message = message;
      this.code = code;
      this.name = "NotFound";
    }
  }
  
  export class NoContent extends Error {
    code: number;
    constructor(message: string, code: number) {
      super();
      this.message = message;
      this.code = code;
      this.name = "NoContent";
    }
  }

  export class InvalidCredentials extends Error {
    code: number;
    constructor(message: string, code: number) {
      super();
      this.message = message;
      this.code = code;
      this.name = "InvalidCredentials";
    }
  }