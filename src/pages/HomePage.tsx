import type {Component} from "solid-js";
import NewTrackerForm from "../components/Forms/NewTrackerForm.tsx";
import CardGridSection from "../components/Sections/CardGridSection.tsx";

const HomePage: Component = () => {
  return (
    <>
      <NewTrackerForm/>
      <CardGridSection/>
    </>
  )
}

export default HomePage