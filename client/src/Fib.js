import React from "react";
import axios from "axios";

export const Fib = () => {
  const [data, setData] = React.useState({
    seenIndexes: [],
    values: {},
    index: "",
  });

  React.useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const fetchValues = async () => {
    const { data } = await axios.get("/api/values/current");

    setData((current) => {
      return { ...current, values: data };
    });
  };

  const fetchIndexes = async () => {
    const { data } = await axios.get("/api/values/all");

    setData((current) => {
      return { ...current, values: data };
    });
  };

  const submitHandler = async (evt) => {
    evt.preventDefault();

    await axios.post("api/values", {
      index: data.index,
    });

    data.index = "";
  };

  const renderSeenIndexes = () => {
    if (data.seenIndexes.length) return 
    return data.seenIndexes.map(({ number }) => number).join(", ");
  };

  const renderValues = () => {
    const { values } = data; 

    if (0 === Object.keys(values).length) return

    return values.forEach((_, i) => {
      <div key={i}>
        For index {i} I calculated {values[i]}
      </div>;
    });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>Enter you index:</label>
        <input
          value={data.index}
          onChange={(e) =>
            setData((current) => {
              return { ...current, index: e.currentTarget.value };
            })
          }
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated Values</h3>
      {renderValues()}
    </div>
  );
};
