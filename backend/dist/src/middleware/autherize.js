"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            const user = req.user;
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized: Please login first.",
                });
            }
            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden: You don't have permission.",
                });
            }
            next();
        }
        catch (error) {
            console.error("AUTHORIZATION ERROR:", error);
            return res.status(500).json({
                success: false,
                message: "Authorization failed.",
            });
        }
    };
};
exports.authorize = authorize;
