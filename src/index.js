
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = React.lazy(() => import('./App/Index'));
ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
  ,
  document.getElementById("root")
);
