"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const gatsby_1 = require("gatsby");
const react_i18next_1 = require("react-i18next");
const NavigatorBanner_module_less_1 = __importDefault(require("./NavigatorBanner.module.less"));
const NavigatorBanner = ({ post, type }) => {
    const { t } = react_i18next_1.useTranslation();
    if (!post) {
        return react_1.default.createElement("div", { className: classnames_1.default(NavigatorBanner_module_less_1.default.button, NavigatorBanner_module_less_1.default.hidden) });
    }
    const { slug, title } = post;
    if (!slug || !title) {
        return null;
    }
    return (react_1.default.createElement(gatsby_1.Link, { to: slug, className: classnames_1.default(NavigatorBanner_module_less_1.default.button, NavigatorBanner_module_less_1.default[type]) },
        react_1.default.createElement("div", { className: NavigatorBanner_module_less_1.default.label }, t(type === 'prev' ? '上一篇' : '下一篇')),
        react_1.default.createElement("div", { className: NavigatorBanner_module_less_1.default.title }, title)));
};
exports.default = NavigatorBanner;
