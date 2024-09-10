import {$, cd} from 'zx'

await $`date`

async function buildApp() {
    await $`npm run build`
    await $`docker build -t calieo-uuid -f Dockerfile .`

    // 集成环境下重启容器
    await $`docker rm -f calieo-uuid`
    await $`docker run -d --restart=always \
            --name calieo-uuid \
            -p 8002:8002 \
            calieo-uuid`
}

await buildApp()
