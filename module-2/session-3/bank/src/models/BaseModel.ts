export default class BaseModel {
  patchFrom = (item: any): void => {
    Object.keys(item).forEach((key) => {
      const value: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(item, key)
      if (value !== undefined) { Object.defineProperty(this, key, value) }
    })
  }
}
