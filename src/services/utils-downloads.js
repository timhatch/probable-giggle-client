export function saveResults(store) {
  const data = [...store.results.keys()].flatMap((x) => store.results.get(x))
  const json = JSON.stringify(data)
  const blob = new Blob([json], {type: "application/json"})
  download(blob)
}

function download(blob) {
    const url  = window.URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `results-${withTimeStamp()}.json`
    a.click()  
}

function withTimeStamp() {
  const now = new Date()
  return now.toJSON().slice(0, 19).split('-').join('-')
}
