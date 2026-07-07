"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params,
    });
    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: result.error.format(),
        });
    }
    // store validated data safely
    req.validated = result.data;
    next();
};
exports.validate = validate;
