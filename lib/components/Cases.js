"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_i18next_1 = require("react-i18next");
const icons_1 = require("@ant-design/icons");
const gatsby_1 = require("gatsby");
const react_slick_1 = __importDefault(require("react-slick"));
const classnames_1 = __importDefault(require("classnames"));
require("slick-carousel/slick/slick.css");
require("slick-carousel/slick/slick-theme.css");
const Cases_module_less_1 = __importDefault(require("./Cases.module.less"));
const Cases = ({ cases = [], style = {}, className }) => {
    const { t } = react_i18next_1.useTranslation();
    let slider;
    const clickPrevious = () => {
        slider.slickPrev();
    };
    const clickNext = () => {
        slider.slickNext();
    };
    const getCases = () => {
        let buttons;
        if (cases.length > 1) {
            buttons = (react_1.default.createElement("div", { className: Cases_module_less_1.default.buttons },
                react_1.default.createElement("div", { className: Cases_module_less_1.default.controlButton, onClick: clickPrevious },
                    react_1.default.createElement(icons_1.ArrowLeftOutlined, { className: Cases_module_less_1.default.controlButtonIcon, style: { fontSize: '16px' } })),
                react_1.default.createElement("div", { className: Cases_module_less_1.default.controlButton, onClick: clickNext, style: { marginLeft: '-1px' } },
                    react_1.default.createElement(icons_1.ArrowRightOutlined, { className: Cases_module_less_1.default.controlButtonIcon, style: { fontSize: '16px' } }))));
        }
        const children = cases.map(app => {
            const linkDiv = (react_1.default.createElement("div", { className: Cases_module_less_1.default.detailWrapper, style: { display: app.link ? 'block' : 'none' } }, app.link && app.link.startsWith('http') ? (react_1.default.createElement("a", { className: Cases_module_less_1.default.detail, href: app.link, target: "_blank", rel: "noopener noreferrer" }, t('查看详情'))) : (react_1.default.createElement(gatsby_1.Link, { className: Cases_module_less_1.default.detail, to: app.link ? app.link : '' }, t('查看详情')))));
            return (react_1.default.createElement("div", { className: Cases_module_less_1.default.appWrapper, key: app.title },
                react_1.default.createElement("img", { className: Cases_module_less_1.default.appTeaser, src: app.image, alt: app.title }),
                react_1.default.createElement("div", { className: Cases_module_less_1.default.appLeft },
                    react_1.default.createElement("div", { className: Cases_module_less_1.default.appContent },
                        react_1.default.createElement("img", { className: Cases_module_less_1.default.appLogo, src: app.logo, alt: "logo", style: {
                                borderRadius: app.isAppLogo ? '15px' : '0px',
                                boxShadow: app.isAppLogo
                                    ? '0px 12px 24px #CED4D9'
                                    : '0px 0px 0px',
                            } }),
                        react_1.default.createElement("p", { className: Cases_module_less_1.default.appTitle }, app.title),
                        react_1.default.createElement("p", { className: Cases_module_less_1.default.appDescription }, app.description),
                        linkDiv),
                    buttons)));
        });
        return children;
    };
    const sliderSettings = {
        dots: cases.length > 1,
        infinite: true,
        slidesToShow: 1,
        adaptiveHeight: true,
        speed: 500,
        cssEase: 'linear',
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
    };
    return (react_1.default.createElement("div", { className: classnames_1.default(Cases_module_less_1.default.wrapper, className), style: style },
        react_1.default.createElement(react_slick_1.default, Object.assign({}, sliderSettings, { className: Cases_module_less_1.default.slider, ref: c => {
                slider = c;
            } }), getCases())));
};
exports.default = Cases;
