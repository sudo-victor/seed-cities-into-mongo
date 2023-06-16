export class CitiesCsvToJson {
  data: string | string[] | Buffer = ""

  constructor(csv: string | Buffer) {
    this.data = csv
  }

  static toJSON(csv: Buffer | string) {
    return new CitiesCsvToJson(csv)
      .parseToString()
      .separateInRows()
      .removeEmptyRows()
      .removeCsvHeader()
      .transform()
  }

  getTransformedData() {
    return this.data
  }

  parseToString() {
    this.data = this.data.toString()
    return this
  }

  separateInRows() {
    this.data = (this.data as string).split("\n").map(c => c.trim())
    return this
  }

  removeCsvHeader() {
    (this.data as string[]).shift()
    return this
  }

  removeEmptyRows() {
    this.data = (this.data as string[]).filter(row => row !== "")
    return this
  }

  transform() {
    return (this.data as string[]).map(city => ({ name: city }))
  }
}
