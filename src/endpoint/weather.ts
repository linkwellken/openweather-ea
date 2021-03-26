import { Requester, Validator } from '@chainlink/external-adapter'
import { ExecuteWithConfig, Config } from '@chainlink/types'
require('dotenv').config()

export const NAME = 'weather' // This should be filled in with a lowercase name corresponding to the API endpoint

const customError = (data: any) => data.Response === 'Error'

const customParams = {
  city: ['q', 'city', 'town'],
  field: false,
}

export const execute: ExecuteWithConfig<Config> = async (request, config) => {
  const validator = new Validator(request, customParams)
  if (validator.error) throw validator.error

  const jobRunID = validator.validated.id
  const endpoint = validator.validated.data.endpoint || 'weather'
  const url = `/data/2.5/${endpoint}`
  const q = validator.validated.data.city.toUpperCase()
  const appid = process.env.API_KEY;

  const params = {
    q,
    appid,
  }

  const options = { ...config.api, params, url }

  const response = await Requester.request(options, customError)
  const result = Requester.validateResultNumber(response.data, ['main', 'temp'])

  return Requester.success(jobRunID, {
    data: config.verbose ? { ...response.data, result } : { result },
    result,
    status: 200,
  })
}
