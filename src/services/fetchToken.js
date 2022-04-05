const fetchTokens = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(url);
  const data = await response.json();
  const { token } = data;
  return response.ok ? Promise.resolve(token) : Promise.reject(data);
};

export default fetchTokens;
