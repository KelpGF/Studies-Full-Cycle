import Notification from "./notification";

describe("Notification Unit Test", () => {
  it("should create errors", () => {
    const notification = new Notification()

    const error1 = {
      context: 'customer',
      message: 'invalid id'
    }
    notification.addError(error1)

    expect(notification.messages("customer")).toBe('customer: invalid id,')

    const error2 = {
      context: 'customer',
      message: 'invalid name'
    }
    notification.addError(error2)

    expect(notification.messages("customer")).toBe('customer: invalid id,customer: invalid name,')

    const error3 = {
      context: 'order',
      message: 'invalid id'
    }
    notification.addError(error3)

    expect(notification.messages("customer")).toBe('customer: invalid id,customer: invalid name,')

    expect(notification.messages()).toBe('customer: invalid id,customer: invalid name,order: invalid id,')
  })

  it("should check if has errors", () => {
    const notification = new Notification()

    expect(notification.hasErrors()).toBeFalsy()

    const error1 = {
      context: 'customer',
      message: 'invalid id'
    }
    notification.addError(error1)

    expect(notification.hasErrors()).toBeTruthy()
  })

  it("should get all errors props", () => {
    const notification = new Notification()

    const error1 = {
      context: 'customer',
      message: 'invalid id'
    }
    notification.addError(error1)

    const error2 = {
      context: 'customer',
      message: 'invalid name'
    }
    notification.addError(error2)

    const error3 = {
      context: 'order',
      message: 'invalid id'
    }
    notification.addError(error3)

    expect(notification.errors()).toEqual([error1, error2, error3])
  })
});
