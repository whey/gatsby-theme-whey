"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const antd_1 = require("antd");
const classnames_1 = __importDefault(require("classnames"));
const Swatch_module_less_1 = __importDefault(require("./Swatch.module.less"));
const copyToClipboard = (str) => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};
const Colors = ({ colorStyle = {}, colors = [], names = [], name, }) => {
    if (colors.length === 0) {
        return null;
    }
    return (react_1.default.createElement("div", { className: Swatch_module_less_1.default.colors },
        react_1.default.createElement("div", { className: Swatch_module_less_1.default.container },
            react_1.default.createElement("span", { className: Swatch_module_less_1.default.name }, name),
            colors.map((color, i) => (react_1.default.createElement("div", { className: classnames_1.default(Swatch_module_less_1.default.color, {
                    [Swatch_module_less_1.default.first]: i === 0,
                    [Swatch_module_less_1.default.third]: i === 2,
                    [Swatch_module_less_1.default.seventh]: i === 6,
                    [Swatch_module_less_1.default.last]: i === colors.length - 1,
                }), style: {
                    ...colorStyle,
                    backgroundColor: color,
                    color,
                }, key: i, onClick: () => {
                    copyToClipboard(color);
                    antd_1.message.success(react_1.default.createElement("span", null,
                        "Copied",
                        react_1.default.createElement("span", { style: { backgroundColor: color }, className: Swatch_module_less_1.default.block }),
                        color));
                } },
                react_1.default.createElement("span", { className: Swatch_module_less_1.default.name, style: { display: colors.length > 10 ? 'none' : '' } }, names[i])))))));
};
const Swatch = ({ title, darkmode = true, colors = '', colornames = '', grid, }) => {
    const [dark, toggleDark] = react_1.useState(false);
    let colorsArray = [];
    const colorsSwatchArray = [];
    const colorNamesArray = colornames.split(',');
    const colorStyle = {};
    if (colors.includes('|')) {
        colors.split('|').forEach((item) => {
            colorsSwatchArray.push(item.split(','));
        });
    }
    else {
        colorsArray = colors.split(',');
        if (colorsArray.length < 5) {
            colorStyle.width = `calc(${100 / colorsArray.length}% - 150px)`;
            colorStyle.minWidth = 120;
            colorStyle.marginLeft = 12;
            colorStyle.marginRight = 12;
            colorStyle.fontSize = 16;
        }
        else if (colorsArray.length > 10) {
            colorStyle.width = 25;
            colorStyle.height = 25;
            colorStyle.marginLeft = 4;
            colorStyle.marginRight = 4;
        }
    }
    const isSudoKu = grid === 'sudoku';
    return (react_1.default.createElement("div", { className: classnames_1.default(Swatch_module_less_1.default.swatch, {
            [Swatch_module_less_1.default.dark]: !!dark,
            [Swatch_module_less_1.default.multiple]: colors.includes('|'),
            [Swatch_module_less_1.default.sudoku]: isSudoKu,
            [Swatch_module_less_1.default.less]: colors.split(',').length < 5,
        }) },
        (title || darkmode) && (react_1.default.createElement("div", { className: Swatch_module_less_1.default.heading },
            react_1.default.createElement("h4", null, title),
            darkmode && (react_1.default.createElement("div", null,
                react_1.default.createElement("span", { className: Swatch_module_less_1.default.darkmode }, "Dark Mode"),
                react_1.default.createElement(antd_1.Switch, { checked: dark, size: "small", onChange: checked => toggleDark(checked) }))))),
        react_1.default.createElement("div", { className: Swatch_module_less_1.default.panel },
            react_1.default.createElement("div", { className: Swatch_module_less_1.default.panelContainer },
                colorsSwatchArray.map((swatch, i) => (react_1.default.createElement(Colors, { key: i, name: colorNamesArray[i], colorStyle: {
                        ...colorStyle,
                        maxWidth: isSudoKu ? undefined : `${100 / swatch.length}%`,
                    }, colors: swatch }))),
                react_1.default.createElement(Colors, { names: colorNamesArray, colorStyle: colorStyle, colors: colorsArray })))));
};
exports.default = Swatch;
