import React from 'react'
import './page.scss'
import {MainLayout} from "@/components/client/layout/main";
import {BaseRouterParams, SeoMeta} from "@/components/client/layout/root";
import {headers} from "next/headers";
import {useServerTranslation} from "@/services/server/i18n";
import CodegenComponent from "@/components/client/codegen";

export default async function Home({params, searchParams}: {
    params: Promise<BaseRouterParams>,
    searchParams: Promise<Record<string, string>>
}) {
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || "";
    const baseParams = await params;
    const {t: trans} = await useServerTranslation(baseParams.lang)
    const seoMeta: SeoMeta = {
        title: trans('codegen.seo.title'),
        keywords: trans('codegen.seo.keywords'),
        description: trans('codegen.seo.description'),
        lang: baseParams.lang
    }
    return <MainLayout path={pathname} params={baseParams} seoMeta={seoMeta}>
        <div className={'codegenPage'}>
            <CodegenComponent lang={baseParams.lang}/>
        </div>
    </MainLayout>
}
