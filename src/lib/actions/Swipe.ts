import { spring } from 'svelte/motion';

interface SwipeProps {}

export function swipe(node: HTMLElement, params: SwipeProps) {
	let x: number;
	let startingX: number;
	const elementWidth = node.clientWidth;
	const coordinates = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.2,
			damping: 0.4
		}
	);

	coordinates.subscribe(($coords) => {
		node.style.transform = `translate3d(${$coords.x}px, 0, 0)`;
	});

	node.addEventListener('mousedown', handleMouseDown);

	function handleMouseDown(event: MouseEvent) {
		x = event.clientX;
		startingX = event.clientX;
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	}

	function handleMouseMove(event: MouseEvent) {
		// Delta X is diff from clicked to where we are currently
		const dx = event.clientX - x;
		x = event.clientX;
		coordinates.update(($coords) => {
			return {
				x: $coords.x + dx,
				y: 0
			};
		});
	}

	function updateCoordinates(x: number) {
		coordinates.update(() => {
			return { x: x, y: 0 };
		});
	}

	function moveCardOver(endingX: number) {
		const leftSnapX = elementWidth * -0.95;
		const rightSnapX = 0;
		const movement = startingX - endingX;

		if (movement > 20) {
			x = leftSnapX;
			updateCoordinates(x);
		}

		if (movement < 20) {
			x = rightSnapX;
			updateCoordinates(x);
		}
	}

	function handleMouseUp(event: MouseEvent) {
		const endingX: number = event.clientX;
		moveCardOver(endingX);
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	}

	return {
		update() {},
		destroy() {
			node.removeEventListener('mousedown', handleMouseDown);
		}
	};
}
