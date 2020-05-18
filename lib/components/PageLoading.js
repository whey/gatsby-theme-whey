"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const icons_1 = require("@ant-design/icons");
const PageLoading_module_less_1 = __importDefault(require("./PageLoading.module.less"));
const PageLoading = () => (react_1.default.createElement("div", { className: PageLoading_module_less_1.default.container },
    react_1.default.createElement(icons_1.LoadingOutlined, { className: PageLoading_module_less_1.default.loading })));
exports.default = PageLoading;
