import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useEffect, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import CircularProgress from '@material-ui/core/CircularProgress';

const loftList = [
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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Loft</InputLabel>
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
    </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const setLoftToParkingLot = (parking, loft) => {
    setLoading(true)
    fetch(`/api/parkingLot/${parking}/${loft}`, { method: "POST" })
      .then((r) => r.json())
      .then(setData)
      .then(()=>setLoading(false));
  };
  useDeepCompareEffect(() => {
    setLoading(true)
    fetch(`/api/parkingLot/0/0`, { method: "GET" })
      .then((r) => r.json())
      .then(setData)
      .then(()=>setLoading(false));
  }, [data]);

  return (
    <div className="container">
      <Head>
        <title>Rialto Pi Parking Lot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Rialto Pi Parking Lot</h1>
        {
          loading ? <CircularProgress color="secondary" /> : <div>Up to date</div>
        }
        <div className="grid-container">
          {data.map((item) => {
            const index = item.parkinglot + 1;
            return (
              <div className="{index}">
                <CustomSelect
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
        .grid-container {
          display: grid;
          grid-template-columns: 50% 50%;
          grid-template-rows: 50% 50%;
          width: 100%;
          height: 500px;
        }
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
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
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
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

        .card1 {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          grid-column-start: 1;
          grid-column-end: 1;
          grid-row-start: 1;
          grid-row-end: 1;
        }
        .card2 {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          grid-column-start: 2;
          grid-column-end: 2;
          grid-row-start: 1;
          grid-row-end: 1;
        }
        .card3 {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          grid-column-start: 1;
          grid-column-end: 1;
          grid-row-start: 2;
          grid-row-end: 2;
        }
        .card4 {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
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

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
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
