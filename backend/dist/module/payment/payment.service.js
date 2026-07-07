"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentStatusService = exports.getPaymentByIdService = exports.getAllPaymentsService = exports.createPaymentService = void 0;
const payment_repository_1 = require("./payment.repository");
const createPaymentService = (data) => {
    return (0, payment_repository_1.createPaymentInDB)(data);
};
exports.createPaymentService = createPaymentService;
const getAllPaymentsService = () => {
    return (0, payment_repository_1.getAllPaymentsFromDB)();
};
exports.getAllPaymentsService = getAllPaymentsService;
const getPaymentByIdService = (id) => {
    return (0, payment_repository_1.getPaymentByIdFromDB)(id);
};
exports.getPaymentByIdService = getPaymentByIdService;
const updatePaymentStatusService = (id, status) => {
    return (0, payment_repository_1.updatePaymentStatusInDB)(id, status);
};
exports.updatePaymentStatusService = updatePaymentStatusService;
