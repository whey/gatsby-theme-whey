"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const gatsby_1 = require("gatsby");
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
const react_github_button_1 = __importDefault(require("react-github-button"));
const parse_github_url_1 = __importDefault(require("parse-github-url"));
const classnames_1 = __importDefault(require("classnames"));
const react_i18next_1 = require("react-i18next");
require("video-react/dist/video-react.css");
const video_react_1 = require("video-react");
const Banner_module_less_1 = __importDefault(require("./Banner.module.less"));
const Notification_1 = __importDefault(require("./Notification"));
const backLeftBottom = 'https://gw.alipayobjects.com/zos/basement_prod/441d5eaf-e623-47cd-b9b9-2a581d9ce1e3.svg';
const Banner = ({ coverImage, title, description, notifications, style = {}, className, video, showGithubStars = true, buttons = [], onCloseVideo, onPlayVideo, }) => {
    const { t } = react_i18next_1.useTranslation();
    const query = gatsby_1.graphql `
    query SiteBannerQuery {
      site {
        siteMetadata {
          githubUrl
        }
      }
    }
  `;
    const { site } = gatsby_1.useStaticQuery(query);
    const { githubUrl } = site.siteMetadata;
    const insNotifications = [
        {
            type: t('推荐'),
            title: t('欢迎进入 2020 可视化智能研发时代'),
            date: '2020.01.08',
            link: 'https://www.yuque.com/antv/blog/ygdubv',
        },
        {
            type: t('推荐'),
            title: t('AntV 11-22 品牌日：知源·致远'),
            date: '2019.11.22',
            link: 'https://www.yuque.com/antv/blog/2019-release',
        },
    ];
    const notificationsNode = (notifications || insNotifications)
        .slice(0, 2)
        .map((notification, i) => (react_1.default.createElement(Notification_1.default, Object.assign({ index: i, key: i }, notification))));
    const showVideo = () => {
        if (onPlayVideo) {
            onPlayVideo();
        }
        antd_1.Modal.info({
            title: 'This is a notification message',
            className: Banner_module_less_1.default.videoModal,
            onCancel: onCloseVideo,
            content: react_1.default.createElement(video_react_1.Player, { className: Banner_module_less_1.default.video, autoPlay: true, src: video }),
            width: '70%',
        });
    };
    const renderButtons = buttons.map((button, i) => {
        const ButtonLink = button.link.startsWith('http') || button.link.startsWith('#')
            ? 'a'
            : gatsby_1.Link;
        const buttonProps = {};
        if (button.link.startsWith('http')) {
            buttonProps.target = '_blank';
            buttonProps.rel = 'noopener noreferrer';
        }
        if (ButtonLink === 'a') {
            buttonProps.href = button.link;
        }
        else {
            buttonProps.to = button.link;
        }
        const { shape = 'round' } = button;
        return (react_1.default.createElement(ButtonLink, Object.assign({}, buttonProps, { className: classnames_1.default(Banner_module_less_1.default.buttonLink, Banner_module_less_1.default[button.type || ''], button.type === 'primary' ? 'primary-button' : 'common-button'), key: i, style: {
                borderRadius: shape === 'round' ? '1000px' : '4px',
                ...button.style,
            } }),
            react_1.default.createElement("span", { className: Banner_module_less_1.default.button }, button.text)));
    });
    if (video) {
        renderButtons.push(react_1.default.createElement("div", { key: "video", onClick: showVideo, className: Banner_module_less_1.default.videoButtonWrapper },
            react_1.default.createElement("div", { className: Banner_module_less_1.default.videoButton },
                react_1.default.createElement(icons_1.CaretRightOutlined, { className: Banner_module_less_1.default.videoButtonIcon }),
                react_1.default.createElement("p", { className: Banner_module_less_1.default.videoButtonText, style: {
                        fontSize: '14px',
                        lineHeight: '40px',
                    } }, t('知源・致远')))));
    }
    if (showGithubStars) {
        const githubObj = parse_github_url_1.default(githubUrl);
        if (githubObj && githubObj.owner && githubObj.name) {
            renderButtons.push(react_1.default.createElement("div", { key: "github", className: Banner_module_less_1.default.githubWrapper },
                react_1.default.createElement(react_github_button_1.default, { type: "stargazers", size: "large", namespace: githubObj.owner, repo: githubObj.name })));
        }
    }
    return (react_1.default.createElement("section", { className: classnames_1.default(Banner_module_less_1.default.wrapper, className), style: style },
        react_1.default.createElement("div", { className: Banner_module_less_1.default.content },
            react_1.default.createElement("div", { className: Banner_module_less_1.default.text },
                react_1.default.createElement("div", { className: classnames_1.default(Banner_module_less_1.default.title, 'banner-title') }, title),
                react_1.default.createElement("p", { className: classnames_1.default(Banner_module_less_1.default.description, 'banner-description') }, description),
                react_1.default.createElement("div", { className: classnames_1.default(Banner_module_less_1.default.buttons, 'banner-buttons') }, renderButtons)),
            react_1.default.createElement("div", { className: classnames_1.default(Banner_module_less_1.default.notifications, 'notifications') }, notificationsNode),
            react_1.default.createElement("div", { className: classnames_1.default(Banner_module_less_1.default.teaser, 'teaser') },
                react_1.default.createElement("div", { className: classnames_1.default(Banner_module_less_1.default.teaserimg, 'teaser-img') }, coverImage)),
            react_1.default.createElement("img", { className: Banner_module_less_1.default.backLeftBottom, src: backLeftBottom, alt: "back" }))));
};
exports.default = Banner;
