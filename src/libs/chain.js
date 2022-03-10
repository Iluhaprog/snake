export function createChain(stages = {}) {
	const stagesArray = getStagesArray(stages);
	const stage = initStage(stagesArray.length);

	return {
		getStage: stage.get,
		go: createPromise(stagesArray, stage.next),
	};
}

function createPromise(stages, nextStage) {
	return (context) => {
		const promise = new Promise((resolve) => {
			stages[0].run({ done: resolve, context });
		});
		for (let i = 1; i < stages.length; i += 1) {
			promise
				.then(() => new Promise((resolve) => {
					stages[i].run({ done: resolve, context });
				})).then(() => nextStage());
		}

		return promise;
	};
}

function getStagesArray(stages) {
	return Object.keys(stages).map((stageName) => ({
		name: stageName,
		run: stages[stageName],
	}));
}

function initStage(maxStage) {
	let stage = 1;

	return {
		get: () => stage,
		next: () => {
			if (stage < maxStage) stage += 1;
		},
	};
}
