import type { Action } from 'svelte/action';
import { spring } from 'svelte/motion';

interface SwipeProps {
	triggerReset?: boolean;
}

export const swipe: Action<HTMLElement, SwipeProps> = (node: HTMLElement, params: SwipeProps) => {
	let x: number;
	let startingX: number;
	let elementWidth = node.clientWidth;
	let triggerReset = params?.triggerReset || false;

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

	function setupEventListeners() {
		if (isMobileBreakpoint()) {
			node.addEventListener('mousedown', handleMouseDown);
			node.addEventListener('touchstart', handleTouchStart);
		} else {
			node.removeEventListener('mousedown', handleMouseDown);
			node.removeEventListener('touchstart', handleTouchStart);
		}

		elementWidth = node.clientWidth;
	}

	setupEventListeners();

	window.addEventListener('resize', () => {
		setupEventListeners();
	});

	function isMobileBreakpoint() {
		const mediaQuery = window.matchMedia('(max-width: 1024px)');
		if (mediaQuery.matches) {
			return true;
		}
	}

	function resetCard() {
		coordinates.update(() => {
			return { x: 0, y: 0 };
		});
		triggerReset = false;
	}

	function outOfView() {
		node.dispatchEvent(new CustomEvent('outOfView'));
	}

	function handleMouseDown(event: MouseEvent) {
		x = event.clientX;
		startingX = event.clientX;
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	}

	function handleTouchStart(event: TouchEvent) {
		x = event.touches[0].clientX;
		startingX = event.touches[0].clientX;
		window.addEventListener('touchmove', handleTouchMove);
		window.addEventListener('touchend', handleTouchEnd);
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

	function handleTouchMove(event: TouchEvent) {
		// Delta X is diff from clicked to where we are currently
		const dx = event.touches[0].clientX - x;
		x = event.touches[0].clientX;
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
			outOfView();
		} else {
			x = rightSnapX;
		}
		updateCoordinates(x);
	}

	function handleMouseUp(event: MouseEvent) {
		const endingX: number = event.clientX;
		moveCardOver(endingX);
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	}

	function handleTouchEnd(event: TouchEvent) {
		const endingX: number = event.changedTouches[0].clientX;
		moveCardOver(endingX);
		window.removeEventListener('touchmove', handleTouchMove);
		window.removeEventListener('touchend', handleTouchEnd);
	}

	return {
		update(newParams: SwipeProps) {
			if (newParams.triggerReset) {
				resetCard();
			}
		},
		destroy() {
			node.removeEventListener('mousedown', handleMouseDown);
			node.removeEventListener('touchstart', handleTouchStart);
		}
	};
};
