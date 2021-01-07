import mysql from "serverless-mysql";

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});

async function excuteQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}

export default async function handler(req, res) {
  const loft = [
    null,
    201,
    202,
    203,
    204,
    301,
    302,
    303,
    304,
    401,
    402,
    403,
    404,
    501,
    502,
    503,
    504,
    601,
  ];
  const parkings = [1, 2, 3, 4];
  res.setHeader("Content-Type", "application/json");
  switch (req.method) {
    case "POST":
      const {
        query: { parkingLot },
      } = req;
      if (
        !parkings.some((p) => p === +parkingLot[0]) ||
        !loft.some((p) => p === +parkingLot[1])
      ) {
        res.statusCode = 403;
        res.end(JSON.stringify({ error: "invalid loft and parkinglot" }));
        return;
      }
      const { error } = await excuteQuery({
        query: `UPDATE parkinglot SET loft = ? WHERE (parkinglot = ?)`,
        values: [+parkingLot[1], +parkingLot[0]],
      });
      if (error) {
        res.statusCode = 403;
        res.end(JSON.stringify({ error }));
      } else {
        const data = await excuteQuery({
          query: `select * from parkinglot`,
          values: [],
        });

        if (data.length) {
          res.statusCode = 200;
          res.end(JSON.stringify(data));
        } else {
          res.statusCode = 403;
          res.end(JSON.stringify({ error: data }));
        }
      }
      break;
    case "GET":
      const data = await excuteQuery({
        query: `select * from parkinglot`,
        values: [],
      });

      if (data.length) {
        res.statusCode = 200;
        res.end(JSON.stringify(data));
      } else {
        res.statusCode = 403;
        res.end(JSON.stringify({ error: data }));
      }
      break;

    default:
      res.statusCode = 403;
      res.end(
        JSON.stringify({ error: "Do not try to use this api like this" })
      );
      break;
  }
}
