export function encodeQueryData(data) {
  const ret = []
  for (const d in data) { ret.push(`${encodeURIComponent(d)}=${encodeURIComponent(data[d])}`) }

  return ret.join('&')
}
export function createActionTypes(base, actions = []) {
  return actions.reduce((acc, type) => {
    acc[type] = `${base}_${type}`

    return acc
  }, {})
}

export function createAction(type, data = {}) {
  return { type, payload: data }
}

export function Remote(url, args) {
  const apiUrl = process.env.API_URL
  const apiKey = process.env.API_KEY
  const apiLanguage = process.env.LANGUAGE

  const queryData = { api_key: apiKey, language: apiLanguage }

  if (typeof args !== 'undefined') {
    Object.assign(queryData, args)
  }

  const serverUrl = `${apiUrl + url}?${encodeQueryData(queryData)}`

  return serverUrl
}

export function tryParseJSON(jsonString) {
  try {
    const o = JSON.parse(jsonString)

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object",
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (o && typeof o === 'object') {
      return o
    }
  } catch (e) {

  }

  return false
}
