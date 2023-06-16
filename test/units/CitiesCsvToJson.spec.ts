import { CitiesCsvToJson } from "../../src/utils/CitiesCsvToJson";

describe('CitiesCsvToJson', () => {
  describe('#parseToString', () => {
    it('should be able to parse a Buffer to a string', () => {
      const bufferMock = Buffer.from('hello world')
      const sut = new CitiesCsvToJson(bufferMock)
      jest.spyOn(sut, 'parseToString')

      const result = sut.parseToString().getTransformedData()

      expect(sut.parseToString).toBeCalled()
      expect(result).toEqual('hello world')
    })
  })

  describe("#separateInRows", () => {
    it('should be able to separate the csv string in  rows', () => {
      const csvDataMock = `
        city
        Araguari
        Uberlândia
        Uberaba
        Belo Horizonte
        Lavras
        Ouro Preto
        Amanhece
        São joão del rei
        Lavrinhas
        Patos de Minas

      `
      const sut = new CitiesCsvToJson(csvDataMock)

      const result = sut.separateInRows().getTransformedData()
      const expected = [
        '',          'city',
        'Araguari',  'Uberlândia',
        'Uberaba',   'Belo Horizonte',
        'Lavras',    'Ouro Preto',
        'Amanhece',  'São joão del rei',
        'Lavrinhas', 'Patos de Minas',
        '',          ''
      ]

      expect(result).toStrictEqual(expected)
    })
  })

  describe("#removeEmptyRows", () => {
    it('should be able to receive a array of strings and remove the emptys strings', () => {
      const mock = [
        '',          'city',
        'Araguari',  'Uberlândia',
        'Uberaba',   'Belo Horizonte',
        'Lavras',    'Ouro Preto',
        'Amanhece',  'São joão del rei',
        'Lavrinhas', 'Patos de Minas',
        '',          ''
      ]
      const sut = new CitiesCsvToJson('')
      sut.data = mock

      sut.removeEmptyRows()
      const expected = [
        'city',
        'Araguari',  'Uberlândia',
        'Uberaba',   'Belo Horizonte',
        'Lavras',    'Ouro Preto',
        'Amanhece',  'São joão del rei',
        'Lavrinhas', 'Patos de Minas',
      ]

      expect(sut.data).toStrictEqual(expected)
    })
  })

  describe("#removeCsvHeader", () => {
    it('should be able to receive a array of strings and remove first item', () => {
      const mock = [
        'city',
        'Araguari',  'Uberlândia',
        'Uberaba',   'Belo Horizonte',
        'Lavras',    'Ouro Preto',
        'Amanhece',  'São joão del rei',
        'Lavrinhas', 'Patos de Minas',
      ]
      const sut = new CitiesCsvToJson('')
      sut.data = mock

      sut.removeCsvHeader()
      const expected = [
        'Araguari',  'Uberlândia',
        'Uberaba',   'Belo Horizonte',
        'Lavras',    'Ouro Preto',
        'Amanhece',  'São joão del rei',
        'Lavrinhas', 'Patos de Minas',
      ]

      expect(sut.data).toStrictEqual(expected)
    })
  })

  describe("#transform", () => {
    it('should be able receive a array of cities name and transform in object to persist into database', () => {
      const mock =  [
        'Araguari',  'Uberlândia',
        'Uberaba',   'Belo Horizonte',
        'Lavras',    'Ouro Preto',
        'Amanhece',  'São joão del rei',
        'Lavrinhas', 'Patos de Minas',
      ]
      const sut = new CitiesCsvToJson('')
      sut.data = mock

      const result = sut.transform()

      const expected = [
        { name: 'Araguari' },
        { name: 'Uberlândia' },
        { name: 'Uberaba' },
        { name: 'Belo Horizonte' },
        { name: 'Lavras' },
        { name: 'Ouro Preto' },
        { name: 'Amanhece' },
        { name: 'São joão del rei' },
        { name: 'Lavrinhas' },
        { name: 'Patos de Minas' }
      ]

      expect(result).toStrictEqual(expected)
    })
  })

  describe("#toJSON", () => {
    it('should be able to receive a csv Buffer and transfom to JSON', () => {
      const mock =  Buffer.from(`
      city
      Araguari
      Uberlândia
      Uberaba
      Belo Horizonte
      Lavras
      Ouro Preto
      Amanhece
      São joão del rei
      Lavrinhas
      Patos de Minas
      `)
      
      const result = CitiesCsvToJson.toJSON(mock)

      const expected = [
        { name: 'Araguari' },
        { name: 'Uberlândia' },
        { name: 'Uberaba' },
        { name: 'Belo Horizonte' },
        { name: 'Lavras' },
        { name: 'Ouro Preto' },
        { name: 'Amanhece' },
        { name: 'São joão del rei' },
        { name: 'Lavrinhas' },
        { name: 'Patos de Minas' }
      ]

      expect(result).toStrictEqual(expected)
    })
  })
})