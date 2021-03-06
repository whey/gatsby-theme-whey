import React from 'react';
import { WithTranslation } from 'react-i18next';
export interface PlayGroundProps {
    source: string;
    babeledSource: string;
    absolutePath?: string;
    relativePath?: string;
    screenshot?: string;
    recommended?: boolean;
    filename: string;
    title?: string;
    location?: Location;
    playground?: {
        container?: string;
        playgroundDidMount?: string;
        playgroundWillUnmount?: string;
        dependencies?: {
            [key: string]: string;
        };
        htmlCodeTemplate?: string;
    };
}
declare const _default: React.ComponentType<Pick<PlayGroundProps & WithTranslation, "title" | "source" | "location" | "playground" | "babeledSource" | "relativePath" | "absolutePath" | "screenshot" | "recommended" | "filename"> & import("react-i18next").WithTranslationProps>;
export default _default;
