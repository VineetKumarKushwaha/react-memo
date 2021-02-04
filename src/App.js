import React, { Profiler } from "react";
import "./styles.css";

const ListView = ({ count, current }) => {
  return (
    <h1>
      {current} out of {count}
    </h1>
  );
};

function App({ noOfItems: { value: noOfItems } }) {
  // const [forceUpdate, toggleUpdate] = React.useState(false);
  const ListViewMemoized = React.useMemo(() => {
    let childrens = [];
    for (let i = 0; i < noOfItems; i++) {
      childrens.push(<ListView count={noOfItems} current={i} key={i} />);
    }
    return childrens;
  }, [noOfItems]);

  return <div className="App">hi</div>;
}

export default () => {
  const [noOfItems, updateNoOfItems] = React.useState({ value: 100 * 100 });
  return (
    <div className="App">
      <input
        type="number"
        value={noOfItems.value}
        onChange={(e) => updateNoOfItems(e.target.value)}
      />
      <button onClick={() => updateNoOfItems({ value: noOfItems.value + 1 })}>
        Re Render
      </button>
      <button onClick={() => updateNoOfItems({ value: noOfItems.value })}>
        Re Render without change
      </button>
      <Profiler
        id="Panel"
        onRender={(
          id, // the "id" prop of the Profiler tree that has just committed
          phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
          actualDuration, // time spent rendering the committed update
          baseDuration, // estimated time to render the entire subtree without memoization
          startTime, // when React began rendering this update
          commitTime, // when React committed this update
          interactions
        ) => {
          console.log(actualDuration);
        }}
      >
        <App noOfItems={noOfItems} />
      </Profiler>
    </div>
  );
};
