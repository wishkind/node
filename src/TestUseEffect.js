import { useState, useEffect, useCallback } from 'react';

export const useHooks = () => {
	const [state, setState] = useState({
		name: ''
	});

	useEffect(() => {
		async function fetchData() {
			console.log('useHooks...');
			const response = await fetch(
				'https://my-json-server.typicode.com/TserHub/Json/hooks'
			).then(res => res.json());

			setState(prevState => {
				return {
					...prevState,
					...response
				};
			});
		}

		fetchData();
	}, []);

	return state;
};

export const useWinSize = () => {
	const [size, setSize] = useState({
		width: document.documentElement.clientWidth,
		height: document.documentElement.clientHeight
	});

	const onResize = useCallback(() => {
		setSize({
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight
		});
	}, []);
	useEffect(() => {
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, [onResize]);

	return size;
};

