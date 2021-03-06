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
/* eslint no-underscore-dangle: 0 */
const react_1 = __importStar(require("react"));
const react_codemirror2_1 = require("react-codemirror2");
const react_use_1 = require("react-use");
const classnames_1 = __importDefault(require("classnames"));
const antd_1 = require("antd");
const debounce_1 = __importDefault(require("lodash/debounce"));
const react_i18next_1 = require("react-i18next");
const standalone_1 = require("@babel/standalone");
const react_split_pane_1 = __importDefault(require("react-split-pane"));
const Toolbar_1 = __importDefault(require("./Toolbar"));
const PlayGround_module_less_1 = __importDefault(require("./PlayGround.module.less"));
const execute = debounce_1.default((code, node, exampleContainer) => {
    const script = document.createElement('script');
    script.innerHTML = `
      try {
        ${code}
      } catch(e) {
        if (window.__reportErrorInPlayGround) {
          window.__reportErrorInPlayGround(e);
        }
      }
    `;
    // eslint-disable-next-line no-param-reassign
    node.innerHTML = exampleContainer || '<div id="container" />';
    node.appendChild(script);
}, 300);
const PlayGround = ({ source, babeledSource, relativePath = '', playground = {}, location, title = '', }) => {
    const { t } = react_i18next_1.useTranslation();
    const playgroundNode = react_1.useRef(null);
    const cmInstance = react_1.useRef();
    const [error, setError] = react_1.useState();
    const [compiledCode, updateCompiledCode] = react_1.useState(babeledSource);
    const [currentSourceCode, updateCurrentSourceCode] = react_1.useState(source);
    if (typeof window !== 'undefined') {
        // @ts-ignore
        window.__reportErrorInPlayGround = (e) => {
            console.error(e); // eslint-disable-line no-console
            setError(e);
        };
    }
    const fullscreenNode = react_1.useRef(null);
    const [isFullScreen, updateIsFullScreen] = react_1.useState(false);
    const toggleFullscreen = () => {
        updateIsFullScreen(!isFullScreen);
        if (fullscreenNode.current) {
            if (!isFullScreen && !document.fullscreenElement) {
                fullscreenNode.current.requestFullscreen();
            }
            else if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };
    const executeCode = () => {
        if (!compiledCode || !playgroundNode || !playgroundNode.current) {
            return;
        }
        execute(compiledCode, playgroundNode.current, playground.container);
    };
    react_1.useEffect(() => {
        executeCode();
    }, [compiledCode, error]);
    react_1.useEffect(() => {
        if (playground.playgroundDidMount) {
            // eslint-disable-next-line no-new-func
            new Function(playground.playgroundDidMount)();
        }
        return () => {
            if (playground.playgroundWillUnmount) {
                // eslint-disable-next-line no-new-func
                new Function(playground.playgroundWillUnmount)();
            }
        };
    }, []);
    // 统一增加对 insert-css 的使用注释
    const replacedSource = source.replace(/^insertCss\(/gm, `// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
insertCss(`);
    const editor = (react_1.default.createElement(react_codemirror2_1.UnControlled, { value: replacedSource, options: {
            mode: 'jsx',
            theme: 'mdn-like',
            tabSize: 2,
            // @ts-ignore
            styleActiveLine: true,
            matchBrackets: true,
            autoCloseBrackets: true,
            lineNumbers: true,
            autofocus: false,
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
            matchTags: {
                bothTags: true,
            },
        }, cursor: {
            line: -1,
            ch: -1,
        }, onChange: (_, __, value) => {
            updateCurrentSourceCode(value);
            try {
                const { code } = standalone_1.transform(value, {
                    filename: relativePath,
                    presets: ['react', 'typescript', 'es2015', 'stage-3'],
                    plugins: ['transform-modules-umd'],
                });
                updateCompiledCode(code);
            }
            catch (e) {
                console.error(e); // eslint-disable-line no-console
                setError(e);
                return;
            }
            setError(null);
        }, editorDidMount: instance => {
            cmInstance.current = instance;
        } }));
    const fileExtension = relativePath.split('.')[relativePath.split('.').length - 1] || 'js';
    const isWide = react_use_1.useMedia('(min-width: 767.99px)', true);
    return (react_1.default.createElement("div", { className: PlayGround_module_less_1.default.playground, ref: fullscreenNode },
        react_1.default.createElement(react_split_pane_1.default, { split: isWide ? 'vertical' : 'horizontal', defaultSize: "62%", minSize: 100 },
            react_1.default.createElement("div", { className: classnames_1.default(PlayGround_module_less_1.default.preview, `playground-${relativePath.split('/').join('-')}`) }, error ? (react_1.default.createElement(antd_1.Result, { status: "error", title: t('演示代码报错，请检查'), subTitle: react_1.default.createElement("pre", null, error && error.message) })) : (react_1.default.createElement("div", { ref: playgroundNode, className: PlayGround_module_less_1.default.exampleContainerWrapper }))),
            react_1.default.createElement("div", { className: PlayGround_module_less_1.default.editor },
                react_1.default.createElement(Toolbar_1.default, { fileExtension: fileExtension, sourceCode: currentSourceCode, playground: playground, location: location, title: title, isFullScreen: isFullScreen, onToggleFullscreen: toggleFullscreen, onExecuteCode: executeCode }),
                react_1.default.createElement("div", { className: PlayGround_module_less_1.default.codemirror }, editor)))));
};
class ErrorHandlerPlayGround extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            error: undefined,
        };
    }
    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { error };
    }
    render() {
        const { t } = this.props;
        const { error } = this.state;
        if (error) {
            // 你可以自定义降级后的 UI 并渲染
            return (react_1.default.createElement(antd_1.Result, { status: "error", title: t('演示代码报错，请检查'), subTitle: react_1.default.createElement("pre", null, error && error.message) }));
        }
        return react_1.default.createElement(PlayGround, Object.assign({}, this.props));
    }
}
exports.default = react_i18next_1.withTranslation()(ErrorHandlerPlayGround);
