"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bike_model_1 = __importDefault(require("../bike/bike.model"));
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.body.product;
        if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
            return res.status(404).json({
                success: false,
                message: 'Invalid product ID',
            });
        }
        const bike = yield bike_model_1.default.findById(productId);
        const quantity = bike === null || bike === void 0 ? void 0 : bike.quantity;
        if (req.body.quantity > quantity) {
            return res.status(404).json({
                success: false,
                message: 'insufficient stock',
            });
        }
        const payload = req.body;
        const result = yield order_service_1.orderService.createOrder(payload);
        res.status(200).json({
            status: true,
            message: 'Order created successfully',
            data: result,
        });
    }
    catch (error) {
        if (error.name === 'ValidationError' && error.errors) {
            const field = Object.keys(error.errors)[0];
            if (error.errors[field].name === 'CastError') {
                const invalidValue = error.errors[field].value;
                return res.json({
                    message: `Invalid input for ${field}: ${invalidValue}`,
                    success: false,
                });
            }
        }
        res.status(500).json({
            message: error._message,
            success: false,
            error: { name: error.name, errors: error.errors },
            stack: error instanceof Error ? error.stack : null,
        });
    }
});
exports.orderController = {
    createOrder,
};
