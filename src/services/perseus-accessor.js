import axios from 'axios'

// Default URL (defined in (.env.development and .env.production)
const _url = process.env.REACT_APP_RESULTS_ENDPOINT

// Fetch data from Perseus
// - axios defaults to { type: 'json' } so don't specify this
// - add a timestamp to the supplied query to avoid caching issues
// - add a requestId to work with axios-cancel.
//   NOTE: that the requestID needs to be unique. Non-unique requestIds can be used,
//   but axios-cancel appears to remove requewstIds when complete, so concurrently
//   running requests are cancelled
//
const fetch = async (query) => axios.get(_url, { 
  params: { time: new Date().getHours(), ...query },
  requestId: query.type || JSON.stringify(query)
})

const update = async (data) => axios.put(`${_url}/person`, data)

// Class definition
class PerseusHTTPService {
  static async fetchDefaults() {
    let response = await axios.get('http://127.0.0.1/session')
    console.log(response.data)
  }
  // Fetch the result list for a specific comp/category/route combination
  // @params = comp (WetId), cat (GrpId) and route (route)
  static async fetchResults(query) {
    const uuid   = `${query.cat}.${query.route}`
    const params = { wet_id: query.comp, grp_id: query.cat, route: query.route }
    try {
      let response = await fetch(params)
      return { [uuid]: response.data.map((x) => ({ ...x, ...params })) }
    } catch (e) {
      return null
    }
  }

  static async updateResults(data) {
    try {
      let response = await update(data)
      return response
    } catch (e) {
      return null
    }
  }
}

export default PerseusHTTPService
