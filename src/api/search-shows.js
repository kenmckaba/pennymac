export default async function searchShows(term) {
  const url = `https://api.tvmaze.com/search/shows?q=${term}`
  const apiResult = await fetch(url)
  const result = await apiResult.json()
  return result
}
