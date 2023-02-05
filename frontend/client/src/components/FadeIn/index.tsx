import { RefObject, useEffect } from 'react'

/**
 * @param refs Intersection Observer を適用した動作をさせたい要素の RefObject の配列
 * @param callback IntersectionObserver のインスタンス生成時に渡すコールバック関数
 * @param options IntersectionObserver のインスタンス生成時に渡すオプション
 */
export const useIntersectionObserver = (
  refs: RefObject<HTMLElement>[],
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): void => {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options)

    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  })
}