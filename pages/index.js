import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useEffect, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import CircularProgress from "@material-ui/core/CircularProgress";
import Image from "next/image";

const loftList = [
  "None",
  "201",
  "202",
  "203",
  "204",
  "301",
  "302",
  "303",
  "304",
  "401",
  "402",
  "403",
  "404",
  "501",
  "502",
  "503",
  "504",
  "601",
];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 0,
    width: "100%",
    margin: 0,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  car: {
    height: "75%",
    position: "relative",
  },
  container: {
    height: "100%",
  },
}));

function CustomSelect(props) {
  const { itemList, currentItem, setLoftToParkingLot, parking } = props;
  const classes = useStyles();
  const [item, setItem] = useState(501);

  const handleChange = (event) => {
    setLoftToParkingLot(parking, event.target.value);
  };

  useEffect(() => {
    setItem(currentItem);
  });

  return (
    <div className={classes.container}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{`Parking ${parking}`}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item}
          onChange={handleChange}
        >
          {itemList.map((loft, index) => {
            return (
              <MenuItem value={loft} key={index}>
                {loft}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {item !== "None" ? (
        <div className={classes.car}>
          <Image src="/car.png" alt="me" layout="fill" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const classes = useStyles();
  const setLoftToParkingLot = (parking, loft) => {
    setLoading(true);
    fetch(`/api/parkingLot/${parking}/${loft}`, { method: "POST" })
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) {
          setData(data);
        }
      })
      .then(() => setLoading(false));
  };
  useDeepCompareEffect(() => {
    setLoading(true);
    fetch(`/api/parkingLot/0/0`, { method: "GET" })
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) {
          setData(data);
        }
      })
      .then(() => setLoading(false));
  }, [data]);

  return (
    <div className="container">
      <Head>
        <title>Rialto Pi Parking Lot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Rialto Pi Parking Lot</h1>
        {loading ? (
          <div className="loader">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div className="loader">Up to date</div>
        )}
        <div className="grid-container">
          {data.map((item, index) => {
            const cardClass = `card card${index + 1}`;
            return (
              <div className={cardClass}>
                <CustomSelect
                  key={index}
                  itemList={loftList}
                  currentItem={item.loft}
                  parking={item.parkinglot}
                  setLoftToParkingLot={setLoftToParkingLot}
                ></CustomSelect>
              </div>
            );
          })}
        </div>
      </main>

      <style jsx>{`
        .car {
          height: 100%;
        }
        .grid-container {
          display: grid;
          grid-template-columns: 50% 50%;
          grid-template-rows: 50% 50%;
          width: 100%;
          height: 500px;
        }
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .loader {
          height: 30px;
        }

        main {
          padding: 3rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin-bottom: 25px;
          line-height: 1.15;
          font-size: 3rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 5px;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card1 {
          grid-column-start: 1;
          grid-column-end: 1;
          grid-row-start: 1;
          grid-row-end: 1;
        }
        .card2 {
          grid-column-start: 2;
          grid-column-end: 2;
          grid-row-start: 1;
          grid-row-end: 1;
        }
        .card3 {
          grid-column-start: 1;
          grid-column-end: 1;
          grid-row-start: 2;
          grid-row-end: 2;
        }
        .card4 {
          grid-column-start: 2;
          grid-column-end: 2;
          grid-row-start: 2;
          grid-row-end: 2;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
