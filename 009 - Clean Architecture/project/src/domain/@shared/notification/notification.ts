export type NotificationErrorProps = {
  context: string
  message: string
}

export default class Notification {
  private _errors: NotificationErrorProps[] = []

  addError(error: NotificationErrorProps): void {
    this._errors.push(error)
  }

  messages(context?: string): string {
    let message = '';

    this._errors.forEach(error => {
      if (context === undefined || error.context === context) {
        message += `${error.context}: ${error.message},`
      }
    })

    return message
  }

  hasErrors(): boolean {
    return this._errors.length > 0
  }

  errors(): NotificationErrorProps[] {
    return this._errors
  }
}
