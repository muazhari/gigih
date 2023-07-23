export default class Product {
  _id: string | undefined
  title: string | undefined
  price: number | undefined
  linkUrl: string | undefined

  constructor (
    title: string | undefined,
    price: number | undefined,
    linkUrl: string | undefined,
    _id?: string | undefined
  ) {
    this._id = _id
    this.title = title
    this.price = price
    this.linkUrl = linkUrl
  }
}
