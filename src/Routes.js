import React from 'react'
import { Routes as WebRoutes, Route } from "react-router-dom";

import DetailHome from './pages/DetailHome'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const Routes = () => (
    <WebRoutes>
        <Route path="/" element={<Home />} />
        <Route path=":id" element={<DetailHome />} />
        {/* Using path="*"" means "match anything", so this route
                    acts like a catch-all for URLs that we don't have explicit
                    routes for. */}
        <Route path="*" element={<NotFound />} />
    </WebRoutes>
)

export default Routes