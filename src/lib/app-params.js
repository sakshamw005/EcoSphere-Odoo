const isNode = typeof window === 'undefined';
const windowObj = isNode ? { localStorage: new Map() } : window;
const storage = windowObj.localStorage;

const getAppParamValue = (paramName, { defaultValue = undefined, removeFromUrl = false } = {}) => {
	if (isNode) {
		return defaultValue;
	}
	const urlParams = new URLSearchParams(window.location.search);
	const searchParam = urlParams.get(paramName);
	if (removeFromUrl) {
		urlParams.delete(paramName);
		const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""}${window.location.hash}`;
		window.history.replaceState({}, document.title, newUrl);
	}
	if (searchParam) {
		return searchParam;
	}
	return defaultValue ?? null;
}

export const appParams = {
	appId: getAppParamValue('app_id', { defaultValue: import.meta.env.VITE_APP_ID }),
	token: getAppParamValue('access_token', { removeFromUrl: true }),
	fromUrl: getAppParamValue('from_url', { defaultValue: window.location.href }),
};
