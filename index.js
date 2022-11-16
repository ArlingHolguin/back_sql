const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

//middelware para usar json
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
    res.send('Hola, soy una nueva ruta');
});

app.listen(port, () => {
    console.log('Mi port ' + port);
});

routerApi(app);


// app.get('/users', (req, res) => {
//   const { limit, offset } = req.query;
//   if (limit && offset) {
//     res.json({
//       limit,
//       offset
//     });
//   } else {
//     res.send('No hay parametros');
//   }
// });

// app.get('/categories/:categoryId/products/:productId', (req, res) => {
//   const { categoryId, productId } = req.params;
//   res.json({
//     categoryId,
//     productId,
//   });
// })
