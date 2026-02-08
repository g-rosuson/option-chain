import React from 'react';

import styling from './Layout.module.scss';

const Layout = ({ children }: { children: React.ReactNode}) => {
    return (
        <div className={styling.container}>
            {children}
        </div>
    );
};

export default Layout;