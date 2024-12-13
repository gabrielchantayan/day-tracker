const async_wrapper = (foo) => {
	return (req, res, next=() => {}) => {
		return Promise.resolve(foo(req, res, next)).catch(next);
	};
};
export default async_wrapper;
