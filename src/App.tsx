import type { Component } from "solid-js"
import Header from "./components/Navigation/Header"
import {TrackerProvider} from "./context/TrackerContext.tsx";
import {Route, Router} from "@solidjs/router";
import HomePage from "./pages/HomePage.tsx";
import TrackerPage from "./pages/TrackerPage.tsx";

const App: Component = () => {
  return (
    <>
      <TrackerProvider>
        <div class="w-screen">
          <header>
            <Header/>
          </header>
          <main>
            <div class="mx-auto px-4 py-6 sm:px-6 lg:px-8">
              <Router>
                <Route path="/" component={HomePage}/>
                <Route path='/track' component={TrackerPage}/>
              </Router>
            </div>
          </main>
        </div>
      </TrackerProvider>
    </>
  )
}

export default App
