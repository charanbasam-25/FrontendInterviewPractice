import { useEffect, useState } from "react";
import "./App.css";
import InfiniteScroll from "./LLD/InfiniteScroll.js";
import ImageSlider from "./LLD/ImageSlider.js";
import Dashboard from "./LLD/dashboard.js";
import StopWatch from "./LLD/stopWatch.js";
import ReddictComments from "./LLD/RedditComments.js";
import AutoComplete from "./LLD/AutomComplete.js";
import ParentCompUseMemo from "./Tapas/Performance/memoCallBackReactmemo.js";
import DerivedState from "./Tapas/Performance/derivedState.js";
import InputValuesDebThro from "./Tapas/InputValueDebThro.js";
import LiveComments from "../src/LLD/LiveComments.tsx"
import CalenderView from "./LLD/CalenderView.tsx";

function App() {
  return (
    <>
      <div>
        {/* <h1>Namste System Design</h1> */}
        {/* <InfiniteScroll /> */}
        {/* <ImageSlider/> */}
        {/* <Dashboard/> */}
        {/* <StopWatch/> */}
        {/* <ReddictComments/> */}
        {/* <AutoComplete/> */}
        {/* <ParentCompUseMemo/> */}
        {/* <DerivedState /> */}
        {/* <InputValuesDebThro /> */}
        {/* <LiveComments/> */}
        <CalenderView/>
        
      </div>
    </>
  );
}

export default App;
