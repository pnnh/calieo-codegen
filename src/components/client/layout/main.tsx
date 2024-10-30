import {NavComponent} from "./nav";
import './main.scss'
import {RootLayout, BaseRouterParams, SeoMeta} from "@/components/client/layout/root";

export async function MainLayout({path, params, children, seoMeta}: {
    path: string, params: BaseRouterParams, children: any, seoMeta: SeoMeta
}) {
    return <RootLayout params={params} seoMeta={seoMeta}>
        <div className={'mainLayout'}>
            <NavComponent path={path} lang={seoMeta.lang}/>
            <div>
                {children}
            </div>
        </div>
    </RootLayout>
}
