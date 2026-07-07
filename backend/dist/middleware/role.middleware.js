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
                    message: "Unauthorized: No user found.",
                });
            }
            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden: You do not have permission to access this resource.",
                });
            }
            next();
        }
        catch (error) {
            console.error("Authorization Error:", error);
            return res.status(500).json({
                success: false,
                message: "Role authorization failed.",
            });
        }
    };
};
exports.authorize = authorize;
