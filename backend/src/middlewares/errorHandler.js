export const errorHandler = (err, req, res, next) => {
    console.error(err);
    const message = err?.message || 'Internal Server Error';
    res.status(400).json({ success: false, message });
};