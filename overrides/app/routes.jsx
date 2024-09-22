/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import loadable from '@loadable/component'
import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'

// Components
import {Skeleton} from '@salesforce/retail-react-app/app/components/shared/ui'
import {configureRoutes} from '@salesforce/retail-react-app/app/utils/routes-utils'
import {routes as _routes} from '@salesforce/retail-react-app/app/routes'

/** adyen css */
import '@adyen/adyen-salesforce-pwa/dist/app/adyen.css'

const fallback = <Skeleton height="75vh" width="100%" />

// Create your pages here and add them to the routes array
// Use loadable to split code into smaller js chunks
const Home = loadable(() => import('./pages/home'), {fallback})
const MyNewRoute = loadable(() => import('./pages/my-new-route'))
/** adyen routes  */
const adyenHome = loadable(() => import('./pages/adyen-home'))
// Checkout page from Adyen
const Checkout = loadable(() => import('./pages/checkout'), {
    fallback: fallback
})

// CheckoutConfirmation page from Adyen
const CheckoutConfirmation = loadable(() => import('./pages/checkout/confirmation'), {
    fallback: fallback
})

// Checkout Redirect page from Adyen
const AdyenCheckoutRedirect = loadable(() => import('./pages/checkout/redirect'), {
    fallback: fallback
})

// Checkout Error page from Adyen
const AdyenCheckoutError = loadable(() => import('./pages/checkout/error'), {
    fallback: fallback
})

// Content Search Page
const ContentSearch = loadable(() => import('./pages/content-search'), {fallback})

const routes = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/adyen-home',
        component: adyenHome
    },
    {
        path: '/checkout',
        component: Checkout,
        exact: true
    },
    {
        path: '/checkout/redirect',
        component: AdyenCheckoutRedirect
    },
    {
        path: '/checkout/error',
        component: AdyenCheckoutError
    },
    {
        path: '/checkout/confirmation/:orderNo',
        component: CheckoutConfirmation
    },
    {
        path: '/content-search',
        component: ContentSearch
    },
    {
        path: '/my-new-route',
        component: MyNewRoute
    },
    ..._routes
]

export default () => {
    const config = getConfig()
    return configureRoutes(routes, config, {
        ignoredRoutes: ['/callback', '*']
    })
}
