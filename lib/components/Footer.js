"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const rc_footer_1 = __importDefault(require("rc-footer"));
const react_i18next_1 = require("react-i18next");
const icons_1 = require("@ant-design/icons");
const hooks_1 = require("../hooks");
const Footer_module_less_1 = __importDefault(require("./Footer.module.less"));
require("rc-footer/assets/index.less");
exports.OLD_SITE_DOMAIN = 'https://antv-2018.alipay.com';
const Footer = ({ columns, bottom, theme = 'dark', language, rootDomain = '', }) => {
    const { t, i18n } = react_i18next_1.useTranslation();
    const lang = language || i18n.language;
    const [isChinaMirrorHost] = hooks_1.useChinaMirrorHost();
    const products = getProducts_1.getProducts({
        t,
        language: lang,
        rootDomain,
        isChinaMirrorHost,
    });
    const more = {
        icon: (react_1.default.createElement("img", { src: "https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg", alt: "more products" })),
        title: t('更多产品'),
        items: [
            {
                icon: (react_1.default.createElement("img", { src: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg", alt: "Ant Design" })),
                title: 'Ant Design',
                url: 'https://ant.design',
                description: t('企业级 UI 设计语言'),
                openExternal: true,
            },
            {
                icon: (react_1.default.createElement("img", { src: "https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg", alt: "yuque" })),
                title: t('语雀'),
                url: 'https://yuque.com',
                description: t('知识创作与分享工具'),
                openExternal: true,
            },
            {
                icon: (react_1.default.createElement("img", { src: "https://gw.alipayobjects.com/zos/antfincdn/sAEs8aHCnd/yunfengdie.png", alt: "yunfengdie" })),
                title: t('云凤蝶'),
                url: 'https://yunfengdie.com',
                description: t('中台建站平台'),
                openExternal: true,
            },
            {
                icon: (react_1.default.createElement("img", { src: "https://gw.alipayobjects.com/zos/antfincdn/v2%24rh7lqpu/82f338dd-b0a6-41bc-9a86-58aaa9df217b.png", alt: "Egg" })),
                title: 'Egg',
                url: 'https://eggjs.org',
                description: t('企业级 Node 开发框架'),
                openExternal: true,
            },
            {
                icon: (react_1.default.createElement("img", { src: "https://gw.alipayobjects.com/zos/rmsportal/DMDOlAUhmktLyEODCMBR.ico", alt: "kitchen" })),
                title: 'Kitchen',
                description: t('Sketch 工具集'),
                url: 'https://kitchen.alipay.com',
                openExternal: true,
            },
            {
                icon: (react_1.default.createElement("img", { src: "https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg", alt: "xtech" })),
                title: t('蚂蚁体验科技'),
                url: 'https://xtech.antfin.com/',
                openExternal: true,
            },
        ],
    };
    const defaultColumns = products
        .filter(product => product.category !== 'ecology')
        .map(product => ({
        title: (react_1.default.createElement("span", null,
            product.title,
            react_1.default.createElement("span", { className: Footer_module_less_1.default.description }, product.slogan))),
        items: product.links,
    }));
    return (react_1.default.createElement(rc_footer_1.default, { maxColumnsPerRow: 4, theme: theme, columns: columns || [...defaultColumns, more], className: Footer_module_less_1.default.footer, bottom: bottom || (react_1.default.createElement("div", { className: Footer_module_less_1.default.bottom },
            react_1.default.createElement("div", null,
                react_1.default.createElement("a", { href: "https://weibo.com/antv2017", target: "_blank", rel: "noopener noreferrer" },
                    react_1.default.createElement(icons_1.WeiboOutlined, null)),
                react_1.default.createElement("a", { href: "https://zhuanlan.zhihu.com/aiux-antv", target: "_blank", rel: "noopener noreferrer" },
                    react_1.default.createElement(icons_1.ZhihuOutlined, null)),
                react_1.default.createElement("a", { href: "https://github.com/antvis", target: "_blank", rel: "noopener noreferrer" },
                    react_1.default.createElement(icons_1.GithubOutlined, null)),
                react_1.default.createElement("a", { href: `${rootDomain}/${lang}/about` }, t('关于我们')),
                react_1.default.createElement("a", { href: exports.OLD_SITE_DOMAIN, target: "_blank", rel: "noopener noreferrer" }, t('返回旧版'))),
            react_1.default.createElement("div", null,
                "\u00A9 ",
                new Date().getFullYear(),
                " Made with \u2764 by",
                ' ',
                react_1.default.createElement("a", { href: "https://xtech.antfin.com/" }, "XTech")))) }));
};
exports.default = Footer;
