import React from 'react';
interface ShowTabsProps {
    examples?: boolean;
    API?: boolean;
    design?: boolean;
}
declare const Tabs: React.FC<{
    active: 'examples' | 'API' | 'design';
    slug: string;
    showTabs: ShowTabsProps;
    examplesCount?: number;
}>;
export default Tabs;
