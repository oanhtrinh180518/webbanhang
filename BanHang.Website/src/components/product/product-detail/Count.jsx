import React from "react";

const Count = ({ count, maxCount, setCount }) => {
  // const [count, setCount] = useState(props.count);
  const onChange = (value) => {
    // if (value > 1) setCount(value);
    // //count=count+1;
    // else if (value > maxCount) setCount(maxCount);
    // else setCount(1);
    if(value<1) setCount(1);
    else if(value>maxCount) setCount(maxCount)
    else setCount(value)
  };
  return (
    <div className="d-flex d-inline ">
      <button className="font-weight-bold" onClick={() => onChange(count - 1)}>
        -
      </button>
      <input
        type="number"
        value={count}
        onChange={(e) => onChange(e.target.value)}
        min={1}
        // defaultValue={1}
        className="count text-center border-bottom w-50"
      />
      <button className="font-weight-bold" onClick={() => onChange(count + 1)}>
        +
      </button>
    </div>
  );
};

export default Count;
