'use client'

import {handlers} from '@/mocks/handlers'
import {Suspense, use} from 'react'

const mockingEnabledPromise =
    // 브라우저일 때
    typeof window !== 'undefined'
        //default:worker ==> export default로 뺀 것은 defualt 안에 들어있다.
        ? import('@/mocks/browser').then(async ({default:worker}) => {
          if (process.env.NODE_ENV === 'production') {
            return;
          }
          await worker.start({
            //onUnhandledRequest: msw가 처리할 수 없는 요청이 들어왔을 때 어떻게 할래?
            onUnhandledRequest(request, print) {
              if (request.url.includes('_next')) {
                return
              }
              //경고만 띄우자.
              print.warning()
            },
          })
          worker.use(...handlers);
          //https://github.com/vercel/next.js/issues/69098
          // Module incorrectly persists between hot updates (HMR) in the browser
          // it it's fixed, should get rid of code below.
          (module as any).hot?.dispose(() => {
            worker.stop();
          });


          console.log(worker.listHandlers())
        })
        : Promise.resolve()

export function MSWProvider({children}: Readonly<{children: React.ReactNode}>) {
  // If MSW is enabled, we need to wait for the worker to start,
  // so we wrap the children in a Suspense boundary until it's ready.
  return (
      <Suspense fallback={null}>
        <MSWProviderWrapper>{children}</MSWProviderWrapper>
      </Suspense>
  )
}

function MSWProviderWrapper({children}: Readonly<{children: React.ReactNode}>) {
  // use: promise를 처리할 수 있는 hook
  use(mockingEnabledPromise)
  return children
}