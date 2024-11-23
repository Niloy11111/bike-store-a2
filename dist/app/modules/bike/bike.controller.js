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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeController = void 0;
const bike_service_1 = require("./bike.service");
const createBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield bike_service_1.bikeService.createBike(payload);
        res.json({
            status: true,
            message: 'Bike created successfully',
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
        res.status(400).json({
            message: error._message,
            success: false,
            error: { name: error.name, errors: error.errors },
            stack: error instanceof Error ? error.stack : null,
        });
    }
});
const getBikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield bike_service_1.bikeService.getBikes(searchTerm);
        res.send({
            status: true,
            message: 'bike getting successfully',
            data: result,
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: 'something went wrong',
            error,
        });
    }
});
const getSingleBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield bike_service_1.bikeService.getSingleBike(productId);
        res.send({
            status: true,
            message: 'bike getting successfully',
            data: result,
        });
    }
    catch (error) {
        res.json({
            status: false,
            message: 'something went wrong',
            error,
        });
    }
});
const updateBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const body = req.body;
        const result = yield bike_service_1.bikeService.updateBike(productId, body);
        res.send({
            status: true,
            message: 'Bike updated successfully',
            data: result,
        });
    }
    catch (error) {
        if (error.name === 'CastError') {
            res.status(500).json({
                message: `Invalid input for ${error.path}: ${error.value}`,
                success: false,
            });
        }
        res.status(500).json({
            status: false,
            message: 'something went wrong',
            error,
        });
    }
});
const deleteBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        yield bike_service_1.bikeService.deleteBike(productId);
        res.send({
            status: true,
            message: 'bike deleted successfully',
            data: {},
        });
    }
    catch (error) {
        res.json({
            status: false,
            message: 'something went wrong',
            error,
        });
    }
});
exports.bikeController = {
    createBike,
    getBikes,
    getSingleBike,
    updateBike,
    deleteBike,
};
