// Typed errors surfaced by the persistence layer.
// Routes translate these into HTTP status codes.

class DomainError extends Error {
  constructor(code, message, details) {
    super(message)
    this.code = code
    this.details = details
    this.name = "DomainError"
  }
}

class NotFoundError extends DomainError {
  constructor(message, details) {
    super("not_found", message, details)
    this.status = 404
  }
}

class ForbiddenError extends DomainError {
  constructor(message, details) {
    super("forbidden", message, details)
    this.status = 403
  }
}

class BadRequestError extends DomainError {
  constructor(message, details) {
    super("bad_request", message, details)
    this.status = 400
  }
}

class ConflictError extends DomainError {
  constructor(message, details) {
    super("conflict", message, details)
    this.status = 409
  }
}

class UnsupportedMediaTypeError extends DomainError {
  constructor(message, details) {
    super("unsupported_media_type", message, details)
    this.status = 415
  }
}

class OutdatedError extends DomainError {
  constructor(message, details) {
    super("outdated", message, details)
    this.status = 409
  }
}

module.exports = {
  DomainError,
  NotFoundError,
  ForbiddenError,
  BadRequestError,
  ConflictError,
  OutdatedError,
  UnsupportedMediaTypeError,
}
