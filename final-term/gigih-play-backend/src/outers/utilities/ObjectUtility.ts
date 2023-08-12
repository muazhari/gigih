export default class ObjectUtility {
  patch = (to: any, by: any): any => {
    Object.keys(by).forEach((key) => {
      const value: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(by, key)
      if (value !== undefined) {
        Object.defineProperty(to, key, value)
      }
    })

    return to
  }
}
