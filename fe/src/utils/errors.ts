export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export class PasswordWrong extends AuthError {
  constructor(message = "Mật khẩu không đúng !") {
    super(message);
    this.name = "PasswordWrong";
  }
}

export class EmailNotFound extends AuthError {
  constructor(message = "Email chưa được đăng ký !") {
    super(message);
    this.name = "EmailNotFound";
  }
}
