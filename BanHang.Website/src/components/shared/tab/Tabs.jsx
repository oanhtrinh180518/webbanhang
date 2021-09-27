import React, {useState} from "react";

export default function Tabs(props) {
  const [state, setState] = useState(props.defaultId);
  return (
    <div className="tabs">
      <div className="tabs-header">
        {props.headers &&
          props.headers.map((value) => {
            return (
              <div
                className={`tabs-header-item ${
                  state === value.id ? "active" : ""
                }`}
                onClick={() => setState(value.id)}
              >
                {value.title}
              </div>
            );
          })}
      </div>
      <div className="tabs-content">
        {props.children.map((value) => {
          return (
            <div
              className={`tabs-content-item ${
                state === value.props.id ? "active" : ""
              }`}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
