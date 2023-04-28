/**
 * @param {string | URL} url
 * @param {RequestInit} init
 */
export const safeFetch = async (url, init) => {
  const response = await fetch(url, init)

  if (response.ok === false) {
    const errorMessage = `Post to Discord failed: ${response.status} (${response.statusText})`
    throw new Error(errorMessage)
  }

  return response
}
