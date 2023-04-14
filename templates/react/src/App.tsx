import React from "react";
import { createRuntime } from "./runtime";

function App() {
	React.useEffect(() => {
		createRuntime();
	}, []);

	return (
		<canvas id="canvas" style={{ width: "100vw", height: "100vh" }}></canvas>
	);
}

export default App;
