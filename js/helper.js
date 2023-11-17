


export const fetchData = async function () {
  try {
    // console.log('I am happy');
  const response = await fetch(`https://dev.to/api/articles?username=cybermaxi7&state=all`);
  const posts = await response.json()
  // console.log(posts);
  return posts
  } catch (error) {
    console.log(error);
  }

}
// fetchData()