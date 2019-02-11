import { computed, decorate, observable, runInAction  } from 'mobx'

import { isObject } from './services/utilities'

// Set up a Store class
// @params
//  - httpservice (class)     The api class that the store will use to access results/calendar 
//                            data
//  - options
//    categories (integer[])  A two-element array containing female/male grp_id parameters
//    storageKey (string)     A reference key for locally-stored data
//    depth      (string)     deep|shallow observability for the results map
//
class Store {
  // Constructor
  constructor(httpservice, { discipline, storageKey } = {}) {
    // Development mode (can comment this out for production)
    // configure({ enforceActions: true})
    const disp = discipline || 'boulder'
    const comp = 4
    const cats = [5]
    const routes = [0]

    // Non-observable class properties
    this.http = httpservice
    this.name = storageKey || `${disp}_results`
    
    // let comp = await this.http.fetchDefaults().wet_id
    // Observable properties
    // Prefer using observable.map (which wraps a Map struct) for dynamic objects
    // Prefer using shallow Map and Array objects (as changes from eGroupware are 'all or nothing'
    // Load any request data in localStorage (use the spread operator or Object.assign
    const defs = { cats, comp, routes, ...(JSON.parse(localStorage.getItem(this.name))) }

    // Application data observables
    this.requests = observable.map(defs)        // Stored params for data requests
    this.results  = observable.map(new Map(), { deep: false })   // Retrieved results data
    // Application state observables
    this.loading  = observable.box(false)       // Used for loading state
    this.lastname = observable.box('')          // Filter value
  }

  /*
  *   Getters/setters 
  */
  // Prefer ES6 getters as selectors until the API stabilises
  // TODO: Make these computed properties as required
  get comp()            { return this.requests.get('comp') }
  get routes()          { return this.requests.get('routes') }
  get grpid()           { return this.requests.get('cats')[0] }
  
  get discipline()      { return this.http.discipline(this.grpid)  }
  get gender()          { return this.http.gender(this.grpid) }

  // _composeXHRParams :: () -> ([a])
  // Iterate over the categories and routes within the requests Map, producing an array of
  // requests object for each individual eGroupware query
  _composeXHRParams() {
    const comp   = this.requests.get('comp')
    const routes = this.requests.get('routes')
    const cats   = this.requests.get('cats')
    return [].concat(...cats.map((cat) => routes.map((route) => ({ comp, cat, route }))))
  }

  // Fetch results for each of the requests passed
  async _handleRequests(requests, promises = []) {
    runInAction('inflight', () => {
      requests.forEach((query) => promises.push(this.http.fetchResults(query)))
    })
    // FIXME: Check why isObject is used twice here??
    const results = (await Promise.all(promises)).filter(isObject)
    return results.filter(isObject)
  }

  // Fetch [n] sets of data from the server
  // NOTE: This method will only overwrite existing results for the same category/round.
  //       If existing results need to be deleted, that needs to be dealt with in whichever method
  //       calls this fetchResults
  async fetchResults() {
    // Get [n] sets of results, then upsert each set into this.results and reset the loading
    // indicator when we've finished
    runInAction(() => this.loading.set(true))
    const requests = this._composeXHRParams()
    const response = await this._handleRequests(requests)
    runInAction('results', () => {
      response.forEach((x) => Object.keys(x).forEach((k) => this.results.set(k, x[k])))
      this.loading.set(false)
    })
  }

  async updateResults(data) {
    let response = await this.http.updateResults(data)
    if (response.status === 200) {
      this.fetchResults()
    }
  }
  // cancelRequests :: () => ()
  // Cancel any in-flight fetch requests. Requires the http service to support
  // cancellable requests or to provide a null method
  cancelRequests() {
    this.http.cancelRequests()
  }

  // setRequestParams :: (Object) -> ()
  // Update the requests Observable Map.
  // Take as an argument an object consisting of any combination of properties, e.g.
  //  - comp  : (Integer)   the WetId/wet_id values for data requests
  //  - cat   : ([Integer]) an array of GrpId/grp_id values for data requests
  //  - routes: ([Integer]) an array of routes values for data requests
  //  - title : (string)    the title of the current competition for display
  // NOTE: We don't check that the supplied params match those expected
  // NOTE: Flushes any existing results
  setRequestParams(obj) {
    // FIXME: This test doesn't protect against a new call being made. For that we would need to
    // cancel any running axios requests
    if (!!this.loading.length) return
    runInAction('requests', () => {
      Object.keys(obj).forEach((x) => this.requests.set(x, obj[x]))
      localStorage.setItem(this.name, JSON.stringify(this.requests))
      this.results.clear()
    })
  }

  updateFilterValue(value) {
    runInAction('filter', () => {
      this.lastname.set(value)
    })
  }
}

decorate(Store, {
  ui_group:       computed,
  ui_page:        computed,
  ui_pages:       computed,
  ui_start_order: computed
})

export default Store
