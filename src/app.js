const express = require("express");
const app = express();

const flipsRouter = require('./flips/flips.router');
const countsRouter = require('./counts/counts.router');

app.use(express.json());

app.use('/counts', countsRouter);
app.use("/flips", flipsRouter);

// Not found handler
app.use((request, response, next) => {
  next({ status: 404, message: `Not found: ${request.originalUrl}` });
});

// Error handler
app.use((error, request, response, next) => {
  console.error(error);
  const { status = 500, message = "something went wrong!" } = error;
  response.status(status).json({ error: message });
  // response.send(error);
});

module.exports = app;


// app.get('/counts/:countId', (req, res, next) => {
//   const { countId } = req.params;
//   const foundCount = counts[countId];

//   if (foundCount === undefined) {
//     next({
//       status: 404,
//       message: `Count id not found: ${countId}`
//     });
//   } else {
//     res.json({ data: foundCount });
//   }
// });

// app.use('/counts', (req, res) => {
//   res.json({ data: counts });
// });

// app.use('/flips/:flipId', (req, res, next) => {
//   const { flipId } = req.params;
//   const foundFlip = flips.find((flip) => flip.id === Number(flipId));

//   if (foundFlip) {
//     res.json({ data: foundFlip });
//   } else {
//     next({
//       status: 404,
//       message: `Flip id not found: ${flipId}`,
//     })
//   }
// });

// app.get('/flips', (req, res) => {
//   res.json({ data: flips })
// });

// function bodyHasResultProperty(req, res, next) {
//   const { data: { result } = {} } = req.body;
//   if (result) {
//     return next();
//   }
//   next({
//     status: 400,
//     message: "A 'result' property is required.",
//   });
// }

// let lastFlipId = flips.reduce((maxId, flip) => Math.max(maxId, flip.id), 0);

// app.post(
//   '/flips',
//   bodyHasResultProperty,
//   (req, res) => {
//     const { data: { result } = {} } = req.body;
//     const newFlip = {
//       id: ++lastFlipId,
//       result: result,
//     };
//     flips.push(newFlip);
//     res.status(201).json({ data: newFlip });
//   } 
// );
// let lastFlipId = flips.reduce((maxId, flip) => Math.max(maxId, flip.id), 0);

// app.post('/flips', (req, res, next) => {
//   const { data: { result } = {} } = req.body;
//   if (result) {
//     const newFlip = {
//       id: ++lastFlipId,
//       result,
//     };
//     flips.push(newFlip);
//     counts[result] = counts[result] + 1;
//     res.status(201).json({ data: newFlip });
//   } else {
//     res.sendStatus(400);
//   }
// });

// app.use('/flips', (req, res) => {
//   res.json({ data: flips });
// });