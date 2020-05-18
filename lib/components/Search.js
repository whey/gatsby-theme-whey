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
const react_i18next_1 = require("react-i18next");
const icons_1 = require("@ant-design/icons");
const Search_module_less_1 = __importDefault(require("./Search.module.less"));
function initDocSearch({ docsearch, lang, docsearchOptions, }) {
    const { apiKey = '194b1be7fb1254c787f4e036912af3eb', indexName = 'antv' } = docsearchOptions || {};
    docsearch({
        apiKey,
        indexName,
        inputSelector: `.${Search_module_less_1.default.input}`,
        algoliaOptions: { facetFilters: [`tags:${lang}`] },
        transformData(hits) {
            hits.forEach(hit => {
                /* eslint-disable no-param-reassign */
                hit.url = hit.url.replace('g2.docs.townsuite.com', window.location.host);
                hit.url = hit.url.replace('g6.docs.townsuite.com', window.location.host);
                hit.url = hit.url.replace('f2.docs.townsuite.com', window.location.host);
                hit.url = hit.url.replace('l7.docs.townsuite.com', window.location.host);
                hit.url = hit.url.replace('g2plot.docs.townsuite.com', window.location.host);
                hit.url = hit.url.replace('graphin.docs.townsuite.com', window.location.host);
                hit.url = hit.url.replace('https:', window.location.protocol);
                hit.url = hit.url.replace('#gatsby-focus-wrapper', '');
                /* eslint-enable no-param-reassign */
            });
            return hits;
        },
        debug: false,
    });
}
const Search = ({ docsearchOptions }) => {
    const { t, i18n } = react_i18next_1.useTranslation();
    react_1.useEffect(() => {
        if (typeof window !== 'undefined') {
            Promise.resolve().then(() => __importStar(require('docsearch.js'))).then(({ default: docsearch }) => {
                initDocSearch({
                    docsearch,
                    lang: i18n.language,
                    docsearchOptions,
                });
            });
        }
    }, []);
    return (react_1.default.createElement("label", { className: Search_module_less_1.default.search, htmlFor: "search" },
        react_1.default.createElement(icons_1.SearchOutlined, { className: Search_module_less_1.default.icon }),
        react_1.default.createElement("input", { className: Search_module_less_1.default.input, id: "search", placeholder: t('搜索…') })));
};
exports.default = Search;
