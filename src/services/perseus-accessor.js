import axios from 'axios'

// Default URL (defined in (.env.development and .env.production)
const BASE_URL    = process.env.REACT_APP_API_ENDPOINT 

// Fetch data from Perseus
// - axios defaults to { type: 'json' } so don't specify this
// - add a timestamp to the supplied query to avoid caching issues
// - add a requestId to work with axios-cancel.
//   NOTE: that the requestID needs to be unique. Non-unique requestIds can be used,
//   but axios-cancel appears to remove requewstIds when complete, so concurrently
//   running requests are cancelled
//
const fetch = async (query) => axios.get(`${BASE_URL}/results`, { 
  params: { time: new Date().getHours(), ...query },
  requestId: query.type || JSON.stringify(query)
})

const update = async (data) => axios.put(`${BASE_URL}/results/person`, data)

// Class definition
class PerseusHTTPService {
  static async fetchDefaults() {
    let response = await axios.get(`${BASE_URL}/session`)
    console.log(response.data)
  }

  // Fetch the result list for a specific comp/category/route combination
  // @params = comp (WetId), cat (GrpId) and route (route)
  static async fetchResults(query) {
    const uuid   = `${query.cat}.${query.route}`
    const params = {wet_id: query.comp, grp_id: query.cat, route: query.route}
    try {
      let response = await fetch(params)
      return {[uuid]: response.data.map((x) => ({...x, ...params}))}
    } catch (e) {
      return null
    }
  }

  // Update results given some data payload (in JSON format)
  static async updateResults(data) {
    try {
      let response = await update(data)
      return response
    } catch (e) {
      return null
    }
  }

  // Lock or unlock a set of results defined by @params
  // @params = :wet_id, :grp_id, :route, :locked, [:per_id]
  static async updateLockState(params) {
    try {
      const response = await axios.put(`${BASE_URL}/results/lock`, params)
      return response
    } catch (e) {
      return {status: 500}
    }
  }

  // Perform a reset or delete @action on a set of results defined by @params
  // @action = reset | delete
  // @params = :wet_id, :grp_id, :route, [:per_id]
  static async delete(action, params) {
    try {
      const response = await axios.put(`${BASE_URL}/results/${action}`, params)
      return response
    } catch (e) {
      return {status: 500}
    }
  }
}

export default PerseusHTTPService
