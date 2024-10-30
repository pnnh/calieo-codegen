import './nav.scss'

export function NavComponent({path, lang}: { path: string, lang: string }) {
    const activeClass = (item: string) => {
        return lang === item ? 'active' : ''
    }
    return (
        <nav className={'navComponent'}>
            <div className={'brand'}>
                <img src={'/images/logo.jpg'} alt={'logo'}/>
            </div>
            <div className={'languages'}>
                <a href={`/en`} className={activeClass('en')}>English</a>
                <a href={`/zh`} className={activeClass('zh')}>中文</a>
            </div>
        </nav>
    )
}
