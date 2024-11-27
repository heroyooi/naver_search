const express = require('express');
const axios = require('axios');
const helmet = require('helmet');
const app = express();

// helmet을 사용하여 CSP 설정
app.use(helmet());

// 기본 CSP를 덮어쓰는 설정 (필요한 리소스를 허용)
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "https://vercel.live"],
    connectSrc: ["'self'", "https://vercel.live"],
    imgSrc: ["'self'", "https://vercel.live"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    objectSrc: ["'none'"]
  }
}));

// 네이버 검색 API 요청 프록시
app.get('/api/search', async (req, res) => {
  const { query, display = 10, start = 1 } = req.query;

  try {
      const response = await axios.get('https://openapi.naver.com/v1/search/blog.json', {
          params: { query, display, start },
          headers: {
              'X-Naver-Client-Id': process.env.CLIENT_ID,
              'X-Naver-Client-Secret': process.env.CLIENT_SECRET,
          },
      });
      res.json(response.data);
  } catch (error) {
      res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { message: 'Server Error' });
  }
});

// 포트 설정 (Vercel은 자동으로 포트를 설정)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
