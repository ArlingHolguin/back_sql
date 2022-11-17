const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handles.js');

const app = express();
const port = 3000;

//middelware para usar json
app.use(express.json());

//middleware para usar cors
const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('no permitido'));
        }
    }
}



app.get('/', (req, res) => {
    res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
    res.send('Hola, soy una nueva ruta');
});

app.listen(port, () => {
    console.log('App corriendo en el puerto: ' + port);
});

routerApi(app);

app.use(cors(options));

//middleware para manejar errores
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);



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
