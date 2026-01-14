import type {Component} from "solid-js";
import TrackerSubHeader from "../components/Navigation/TrackerSubHeader.tsx";
import SwipeTracker from "../components/Tracker/SwipeTracker.tsx";
import TrackerStatsFooter from "../components/Tracker/TrackerStatsFooter.tsx";

const TrackerPage: Component = () => {
  return (
    <>
      <TrackerSubHeader/>
      <SwipeTracker/>
      <TrackerStatsFooter/>
    </>
  )
}

export default TrackerPage