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
const classnames_1 = __importDefault(require("classnames"));
const antd_1 = require("antd");
const react_i18next_1 = require("react-i18next");
const PlayGround_1 = __importDefault(require("./PlayGround"));
const PlayGrounds_module_less_1 = __importDefault(require("./PlayGrounds.module.less"));
const PlayGrounds = ({ examples = [], location, playground, }) => {
    const { i18n } = react_i18next_1.useTranslation();
    const [currentExample, updateCurrentExample] = react_1.useState();
    react_1.useEffect(() => {
        const defaultExample = examples.find(item => `#${item.filename.split('.')[0]}` === location.hash) || examples[0];
        updateCurrentExample(defaultExample);
    }, []);
    // 滚动到当前节点
    react_1.useEffect(() => {
        if (!currentExample || !currentExample?.filename) {
            return;
        }
        const id = `example-${currentExample?.filename?.split('.')[0]}`;
        const cardNode = document.getElementById(id);
        if (cardNode) {
            cardNode.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [currentExample]);
    const [hasHorizontalScrollbar, updateHasHorizontalScrollbar] = react_1.useState(false);
    const [scrollPostion, updateScrollPostion] = react_1.useState('left');
    const playgroundScrollDiv = react_1.useRef(null);
    const calcScrollPostion = (node) => {
        if (node.scrollLeft < 2) {
            updateScrollPostion('left');
        }
        else if (node.scrollLeft + node.clientWidth >= node.scrollWidth - 2) {
            updateScrollPostion('right');
        }
        else {
            updateScrollPostion('middle');
        }
    };
    const onScroll = (e) => {
        if (!e || !e.target) {
            return;
        }
        calcScrollPostion(e.target);
    };
    const onResize = react_1.useCallback(() => {
        if (playgroundScrollDiv && playgroundScrollDiv.current) {
            const div = playgroundScrollDiv.current;
            updateHasHorizontalScrollbar(div.scrollWidth > div.clientWidth);
            calcScrollPostion(div);
        }
    }, [playgroundScrollDiv]);
    react_1.useEffect(() => {
        onResize();
    }, [examples]);
    react_1.useEffect(() => {
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);
    return (react_1.default.createElement("div", { className: PlayGrounds_module_less_1.default.container },
        react_1.default.createElement("div", { className: classnames_1.default(PlayGrounds_module_less_1.default.shadowWrapper, {
                [PlayGrounds_module_less_1.default.leftInnerShadow]: (scrollPostion === 'right' || scrollPostion === 'middle') &&
                    hasHorizontalScrollbar,
                [PlayGrounds_module_less_1.default.rightInnerShadow]: (scrollPostion === 'left' || scrollPostion === 'middle') &&
                    hasHorizontalScrollbar,
            }) },
            react_1.default.createElement("div", { className: PlayGrounds_module_less_1.default.cards, ref: playgroundScrollDiv, onScroll: onScroll }, examples.map(example => {
                const title = typeof example.title === 'object'
                    ? example.title[i18n.language]
                    : example.title;
                return (react_1.default.createElement(antd_1.Tooltip, { title: title || '', key: example.relativePath },
                    react_1.default.createElement("a", { href: `#${example.filename.split('.')[0]}`, onClick: (e) => {
                            e.preventDefault();
                            window.history.pushState({}, '', `#${example.filename.split('.')[0]}`);
                            updateCurrentExample(example);
                        }, id: `example-${example.filename.split('.')[0]}`, className: classnames_1.default(PlayGrounds_module_less_1.default.card, {
                            [PlayGrounds_module_less_1.default.current]: currentExample &&
                                example.relativePath === currentExample.relativePath,
                        }) },
                        react_1.default.createElement("img", { src: example.screenshot ||
                                'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/screenshot-placeholder-b8e70.png', alt: title || example.relativePath }))));
            }))),
        playground && currentExample ? (react_1.default.createElement(PlayGround_1.default, { key: currentExample.relativePath, relativePath: currentExample.relativePath, source: currentExample.source, babeledSource: currentExample.babeledSource, filename: currentExample.filename, playground: playground, location: location, title: currentExample.title })) : (react_1.default.createElement(antd_1.Skeleton, { paragraph: { rows: 8 } }))));
};
exports.default = PlayGrounds;
