'use client'

import React from 'react'
import './codegen.scss'
import {useClientTranslation} from "@/services/client/i18n/client";
import {highlightCode} from "@/services/client/highlight";

export default function CodegenComponent({lang}: { lang: string }) {
    const [codeHtml, setCodeHtml] = React.useState("")
    const [modelName, setModelName] = React.useState("Article")
    const {t: trans} = useClientTranslation(lang)
    return <div className={"codegenComponent"}>
        <h1 className={"pageTitle"}>{trans("codegen.page.title")}</h1>
        <div className={'editorContainer'}>
            <input value={modelName} onChange={(event) => setModelName(event.target.value)}/>
        </div>
        <div className={'actionContainer'}>
            <button onClick={() => {
                const codeText = genCodeHtml(modelName)
                setCodeHtml(codeText)
            }}>生成
            </button>
        </div>
        <div className={'resultContainer'}>
            <code className={'language-typescript'}>
                <pre dangerouslySetInnerHTML={{__html: codeHtml}}></pre>
            </code>
        </div>
    </div>
}

function genCodeHtml(modelName: string) {
    const codeText = `export interface ${modelName} {
    id: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
}`
    return highlightCode(codeText, 'typescript')
}
