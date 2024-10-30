import './root.scss'

import {GoogleAnalytics} from '@next/third-parties/google'
import {isProd} from "@/services/server/config";
import {dir} from 'i18next'
import {languages} from '@/services/common/i18n/settings'
import React from "react";
import {useServerTranslation} from "@/services/server/i18n";

export async function generateStaticParams() {
    return languages.map((lng) => ({lng}))
}

export interface BaseRouterParams {
    lang: string
}

export interface SeoMeta {
    title: string
    keywords: string
    description: string
    lang: string
}

export async function RootLayout({
                                     children, params: {lang}, seoMeta
                                 }: {
    children: React.ReactNode,
    params: BaseRouterParams,
    seoMeta: SeoMeta
}) {
    const {t: trans} = await useServerTranslation(lang)
    return (
        <html lang={lang} dir={dir(lang)}>
        <head>
            <base href="/"/>
            <meta charSet="utf-8"/>
            <meta name="viewport"
                  content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"/>
            <meta name="renderer" content="webkit"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
            <meta name="robots" content="index,follow"/>
            <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
            <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
            <title>{seoMeta.title}</title>
            <meta name="keywords" content={seoMeta.keywords}/>
            <meta name="description" content={seoMeta.description}/>
            {isProd() && <GoogleAnalytics gaId="G-7R4F003CML"/>}
        </head>
        <body>
        {children}
        </body>
        </html>
    )
}
