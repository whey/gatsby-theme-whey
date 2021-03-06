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
/* eslint jsx-a11y/anchor-is-valid: 0 */
const gatsby_1 = require("gatsby");
const react_1 = __importStar(require("react"));
const react_use_1 = require("react-use");
const classnames_1 = __importDefault(require("classnames"));
const react_i18next_1 = require("react-i18next");
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
const git_url_parse_1 = __importDefault(require("git-url-parse"));
const Search_1 = __importDefault(require("./Search"));
const NavMenuItems_1 = __importDefault(require("./NavMenuItems"));
const utils_1 = require("../utils");
const hooks_1 = require("../hooks");
const antv_svg_1 = __importDefault(require("../images/antv.svg"));
const translation_svg_1 = __importDefault(require("../images/translation.svg"));
const external_link_svg_1 = __importDefault(require("../images/external-link.svg"));
const Header_module_less_1 = __importDefault(require("./Header.module.less"));
const { Option } = antd_1.Select;
exports.redirectToChinaMirror = (githubUrl) => {
    const chinaMirrorHost = utils_1.getChinaMirrorHost();
    if (chinaMirrorHost !== window.location.host) {
        window.location.href = window.location.href.replace(window.location.host, chinaMirrorHost);
        return;
    }
    const { name } = git_url_parse_1.default(githubUrl);
    if (!name.includes('.') && !name.includes('-')) {
        window.location.href = window.location.href.replace(window.location.host, `antv-${name}.gitee.io`);
        return;
    }
    antd_1.message.info('镜像本地调试暂时无法跳转。');
};
const Header = ({ subTitle = '', subTitleHref, pathPrefix = '', path = '', navs = [], showSearch = true, showGithubCorner = true, showAntVProductsCard = true, showLanguageSwitcher = true, showChinaMirror = true, logo, onLanguageChange, siteUrl, githubUrl = 'https://github.com/antvis', defaultLanguage, Link = 'a', transparent, isHomePage, rootDomain = '', docsearchOptions, versions, }) => {
    const { t, i18n } = react_i18next_1.useTranslation();
    const lang = typeof defaultLanguage !== 'undefined'
        ? defaultLanguage
        : i18n.language || '';
    const SubTitleLink = (subTitleHref || '').startsWith('http') ? 'a' : Link;
    const [productMenuVisible, setProductMenuVisible] = react_1.useState(false);
    let productMenuHovering = false;
    const onProductMouseEnter = (e) => {
        productMenuHovering = true;
        e.persist();
        setTimeout(() => {
            if (e.target instanceof Element && e.target.matches(':hover')) {
                setProductMenuVisible(true);
            }
        }, 200);
    };
    const onProductMouseLeave = (e) => {
        e.persist();
        productMenuHovering = false;
        setTimeout(() => {
            if (productMenuHovering) {
                return;
            }
            setProductMenuVisible(false);
        }, 200);
    };
    const onToggleProductMenuVisible = () => {
        setProductMenuVisible(!productMenuVisible);
    };
    const [popupMenuVisible, setPopupMenuVisible] = react_1.useState(false);
    const onTogglePopupMenuVisible = () => {
        setPopupMenuVisible(!popupMenuVisible);
    };
    const { img, link } = {
        img: react_1.default.createElement(antv_svg_1.default, null),
        link: '',
        ...logo,
    };
    react_1.useEffect(() => {
        if (popupMenuVisible) {
            setPopupMenuVisible(false);
        }
    }, [path]);
    // 移动端下弹出菜单时，禁止页面滚动
    react_1.useEffect(() => {
        if (popupMenuVisible) {
            document.documentElement.style.overflow = 'hidden';
        }
        else {
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.documentElement.style.overflow = '';
        };
    }, [popupMenuVisible]);
    const isWide = react_use_1.useMedia('(min-width: 767.99px)', true);
    const menuIcon = !isWide ? (react_1.default.createElement(icons_1.MenuOutlined, { className: Header_module_less_1.default.menuIcon, onClick: onTogglePopupMenuVisible })) : null;
    const productItemProps = isWide
        ? {
            onMouseEnter: onProductMouseEnter,
            onMouseLeave: onProductMouseLeave,
        }
        : {
            onClick: onToggleProductMenuVisible,
        };
    const { name } = git_url_parse_1.default(githubUrl);
    const chinaMirrorUrl = name ? `https://antv-${name}.gitee.io` : '';
    const [logoLink] = hooks_1.useLogoLink({
        siteUrl,
        lang,
        link,
    });
    const [chinaMirrorHintVisible, updateChinaMirrorHintVisible] = react_1.useState(false);
    react_1.useEffect(() => {
        const timeout = setTimeout(() => {
            if (lang !== 'zh' ||
                window.location.host.includes('chartcube') ||
                window.location.host.includes('gitee.io') ||
                localStorage.getItem('china-mirror-no-more-hint') ||
                !isWide) {
                return;
            }
            updateChinaMirrorHintVisible(true);
        }, 5000);
        return () => {
            clearTimeout(timeout);
        };
    });
    const menu = (react_1.default.createElement("ul", { className: classnames_1.default(Header_module_less_1.default.menu, {
            [Header_module_less_1.default.popup]: !isWide,
            [Header_module_less_1.default.popupHidden]: !popupMenuVisible,
        }) },
        navs && navs.length ? react_1.default.createElement(NavMenuItems_1.default, { navs: navs, path: path }) : null,
        showChinaMirror ? (react_1.default.createElement(antd_1.Popover, { title: null, content: react_1.default.createElement("div", { style: { width: 300 } },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("span", { role: "img", "aria-labelledby": "\u4E2D\u56FD" }, "\uD83C\uDDE8\uD83C\uDDF3"),
                    ' ',
                    "AntV \u7CFB\u5217\u7F51\u7AD9\u90E8\u7F72\u5728 gh-pages \u4E0A\uFF0C\u82E5\u8BBF\u95EE\u901F\u5EA6\u4E0D\u4F73\uFF0C\u53EF\u4EE5\u524D\u5F80\u56FD\u5185\u955C\u50CF\u7AD9\u70B9\u3002"),
                react_1.default.createElement("div", { style: { marginTop: 16, textAlign: 'right' } },
                    react_1.default.createElement(antd_1.Button, { onClick: () => updateChinaMirrorHintVisible(false), size: "small", style: { marginRight: 8 } }, "\u6682\u65F6\u5173\u95ED"),
                    react_1.default.createElement(antd_1.Button, { type: "primary", size: "small", onClick: () => {
                            localStorage.setItem('china-mirror-no-more-hint', Date.now().toString());
                            updateChinaMirrorHintVisible(false);
                        } }, "\u4E0D\u518D\u63D0\u9192"))), visible: chinaMirrorHintVisible, placement: "bottomRight", align: {
                offset: [-12, -16],
            } },
            react_1.default.createElement("li", { style: { display: logoLink.includes('gitee') ? 'none' : '' } },
                react_1.default.createElement("a", { href: chinaMirrorUrl, onClick: e => {
                        e.preventDefault();
                        exports.redirectToChinaMirror(githubUrl);
                    } },
                    t('国内镜像'),
                    react_1.default.createElement("i", { className: Header_module_less_1.default.export },
                        react_1.default.createElement(external_link_svg_1.default, null)))))) : null,
        showAntVProductsCard ? (react_1.default.createElement("li", Object.assign({}, productItemProps),
            react_1.default.createElement("a", null,
                t('所有产品'),
                react_1.default.createElement("img", { src: "https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png", alt: "antv logo arrow", className: classnames_1.default(Header_module_less_1.default.arrow, {
                        [Header_module_less_1.default.open]: productMenuVisible,
                    }) })),
            react_1.default.createElement(Products_1.default, { className: Header_module_less_1.default.productsMenu, show: productMenuVisible, rootDomain: rootDomain, language: defaultLanguage }))) : null,
        versions ? (react_1.default.createElement("li", null,
            react_1.default.createElement(antd_1.Select, { defaultValue: Object.keys(versions)[0], className: Header_module_less_1.default.versions, bordered: false, size: "small", onChange: (value) => {
                    window.location.href = value;
                } }, Object.keys(versions).map((version) => {
                const url = versions[version];
                if (url.startsWith('http')) {
                    return (react_1.default.createElement(Option, { key: url, value: url }, version));
                }
                return null;
            })))) : null,
        showLanguageSwitcher && (react_1.default.createElement("li", null,
            react_1.default.createElement(antd_1.Dropdown, { placement: "bottomRight", overlay: react_1.default.createElement(antd_1.Menu, { defaultSelectedKeys: [lang], selectable: true, onSelect: ({ key }) => {
                        if (key === lang) {
                            return;
                        }
                        if (onLanguageChange) {
                            onLanguageChange(key);
                            return;
                        }
                        if (path.endsWith(`/${lang}`)) {
                            gatsby_1.navigate(`/${key}`);
                            return;
                        }
                        gatsby_1.navigate(path
                            .replace(pathPrefix, '')
                            .replace(`/${lang}/`, `/${key}/`));
                    } },
                    react_1.default.createElement(antd_1.Menu.Item, { key: "en" },
                        react_1.default.createElement(icons_1.CheckOutlined, { style: {
                                visibility: lang === 'en' ? 'visible' : 'hidden',
                                color: '#52c41a',
                            } }),
                        "English"),
                    react_1.default.createElement(antd_1.Menu.Item, { key: "zh" },
                        react_1.default.createElement(icons_1.CheckOutlined, { style: {
                                visibility: lang === 'zh' ? 'visible' : 'hidden',
                                color: '#52c41a',
                            } }),
                        "\u7B80\u4F53\u4E2D\u6587")), className: Header_module_less_1.default.translation },
                react_1.default.createElement(translation_svg_1.default, null)))),
        showGithubCorner && (react_1.default.createElement("li", { className: Header_module_less_1.default.githubCorner },
            react_1.default.createElement("a", { href: githubUrl, target: "_blank", rel: "noopener noreferrer" },
                react_1.default.createElement(icons_1.GithubOutlined, null))))));
    return (react_1.default.createElement("header", { className: classnames_1.default(Header_module_less_1.default.header, {
            [Header_module_less_1.default.transparent]: !!transparent && !productMenuVisible,
            [Header_module_less_1.default.isHomePage]: !!isHomePage,
            [Header_module_less_1.default.fixed]: popupMenuVisible,
        }) },
        react_1.default.createElement("div", { className: Header_module_less_1.default.container },
            react_1.default.createElement("div", { className: Header_module_less_1.default.left },
                react_1.default.createElement("h1", null,
                    react_1.default.createElement("a", { href: logoLink }, img)),
                subTitle && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("span", { className: Header_module_less_1.default.divider }),
                    react_1.default.createElement("h2", { className: Header_module_less_1.default.subProduceName }, react_1.default.createElement(SubTitleLink, {
                        [SubTitleLink === 'a' ? 'href' : 'to']: typeof subTitleHref === 'undefined'
                            ? `/${lang}`
                            : subTitleHref,
                    }, subTitle)))),
                showSearch && react_1.default.createElement(Search_1.default, { docsearchOptions: docsearchOptions })),
            react_1.default.createElement("nav", { className: Header_module_less_1.default.nav },
                menu,
                menuIcon))));
};
exports.default = Header;
