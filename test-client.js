const axios = require('axios');

(async () => {
  try {
    const { data } = await axios.post('http://localhost:3000/auth/register', {
      username: 'raju28',
      password: 'raju',
      seller: true,
    });
    // console.log(data);

    const { token } = data;
    console.log(token);
    const { data: res2 } = await axios.get(
      'http://localhost:3000/product/mine',
      //   // {
      //   //   title: 'new phone',
      //   //   image: 'n/a',
      //   //   description: 'description',
      //   //   price: '10',
      //   // },
      {
        headers: { authorization: `Bearer ${token}` },
      },
    );

    console.log(res2.message);
  } catch (err) {
    console.log(err.message);
  }
})();
