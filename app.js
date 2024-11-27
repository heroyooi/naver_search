const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// 네이버 API 키
const CLIENT_ID = "CWbFohhvPGwO93S_ajjK";
const CLIENT_SECRET = "eJyvtNW6pF";

// CORS 허용
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 네이버 검색 API 요청 프록시
app.get('/search', async (req, res) => {
  const { query, display = 10, start = 1 } = req.query;

  try {
    const response = await axios.get('https://openapi.naver.com/v1/search/blog.json', {
      params: { query, display, start },
      headers: {
        'X-Naver-Client-Id': CLIENT_ID,
        'X-Naver-Client-Secret': CLIENT_SECRET,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
