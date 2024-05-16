import React, { useState } from "react";

function App() {
	const [plateauUpperRight, setPlateauUpperRight] = useState("");
	const [rovers, setRovers] = useState("");
	const [instructions, setInstructions] = useState("");
	const [result, setResult] = useState<string[]>([]);

	const handleRunRovers = async () => {
		var result = moveRovers(plateauUpperRight, rovers, instructions);
		setResult(result);
	};

	const moveRovers = (
		plateauUpperRight: string,
		rovers: string,
		instructions: string
	): string[] => {
		const [upperX, upperY] = plateauUpperRight.split(" ").map(Number);
		const orientations = ["N", "E", "S", "W"];
		const finalPositions: string[] = [];

		var [x, y, orientation] = rovers.split(" ");
		let posX = parseInt(x);
		let posY = parseInt(y);

		for (let instruction of instructions) {
			if (instruction === "L") {
				orientation =
					orientations[(orientations.indexOf(orientation) - 1 + 4) % 4];
			} else if (instruction === "R") {
				orientation = orientations[(orientations.indexOf(orientation) + 1) % 4];
			} else if (instruction === "M") {
				switch (orientation) {
					case "N":
						if (posY < upperY) posY++;
						break;
					case "E":
						if (posX < upperX) posX++;
						break;
					case "S":
						if (posY > 0) posY--;
						break;
					case "W":
						if (posX > 0) posX--;
						break;
				}
			}
		}

		finalPositions.push(`${posX} ${posY} ${orientation}`);
		return finalPositions;
	};

	return (
		<>
			<h1>Mars Rovers</h1>
			<div>
				<label htmlFor="plateauUpperRight">
					Plateau Upper-Right Coordinates:
				</label>
				<input
					type="text"
					id="plateauUpperRight"
					value={plateauUpperRight}
					onChange={(e) => setPlateauUpperRight(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="rovers">Rovers:</label>
				<textarea
					id="rovers"
					value={rovers}
					onChange={(e) => setRovers(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="instructions">Instructions:</label>
				<textarea
					id="instructions"
					value={instructions}
					onChange={(e) => setInstructions(e.target.value)}
				/>
			</div>
			<button onClick={handleRunRovers}>Run Rovers</button>
			<h2>Result:</h2>
			<ul>
				{result.map((position, index) => (
					<li key={index}>{position}</li>
				))}
			</ul>
		</>
	);
}

export default App;
