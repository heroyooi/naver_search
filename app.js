const express = require('express');
const https = require('https');
const fs = require('fs');
const axios = require('axios');

const app = express();

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
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { message: 'Server Error' });
    }
});

// 포트 설정 (Vercel은 자동으로 포트를 설정)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});