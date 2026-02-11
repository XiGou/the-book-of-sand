import type { RefObject } from 'react'
import { useEffect, useRef } from 'react'

type SwipeTarget = HTMLElement | Window

export interface SwipeGestureOptions {
  targetRef?: RefObject<HTMLElement | null>
  minDistance?: number
  maxDuration?: number
  ignoreSelector?: string
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
}

interface TouchPoint {
  x: number
  y: number
  time: number
}

export function useSwipeGesture({
  targetRef,
  minDistance = 56,
  maxDuration = 500,
  ignoreSelector,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
}: SwipeGestureOptions) {
  const startPointRef = useRef<TouchPoint | null>(null)

  useEffect(() => {
    const target: SwipeTarget | null = targetRef?.current ?? (targetRef ? null : window)
    if (!target) return

    const handleTouchStart = (event: Event) => {
      const touchEvent = event as TouchEvent
      if (touchEvent.touches.length !== 1) {
        startPointRef.current = null
        return
      }

      if (
        ignoreSelector &&
        touchEvent.target instanceof Element &&
        touchEvent.target.closest(ignoreSelector)
      ) {
        startPointRef.current = null
        return
      }

      const touch = touchEvent.touches[0]
      startPointRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      }
    }

    const handleTouchEnd = (event: Event) => {
      const touchEvent = event as TouchEvent
      if (touchEvent.changedTouches.length !== 1) {
        startPointRef.current = null
        return
      }

      const startPoint = startPointRef.current
      startPointRef.current = null
      if (!startPoint) return

      const touch = touchEvent.changedTouches[0]
      const deltaX = touch.clientX - startPoint.x
      const deltaY = touch.clientY - startPoint.y
      const duration = Date.now() - startPoint.time

      if (duration > maxDuration) return

      const absX = Math.abs(deltaX)
      const absY = Math.abs(deltaY)
      if (absX < minDistance && absY < minDistance) return

      if (absX >= absY) {
        if (deltaX > 0) {
          onSwipeRight?.()
        } else {
          onSwipeLeft?.()
        }
      } else if (deltaY > 0) {
        onSwipeDown?.()
      } else {
        onSwipeUp?.()
      }
    }

    const handleTouchCancel = () => {
      startPointRef.current = null
    }

    target.addEventListener('touchstart', handleTouchStart, { passive: true })
    target.addEventListener('touchend', handleTouchEnd, { passive: true })
    target.addEventListener('touchcancel', handleTouchCancel, { passive: true })

    return () => {
      target.removeEventListener('touchstart', handleTouchStart)
      target.removeEventListener('touchend', handleTouchEnd)
      target.removeEventListener('touchcancel', handleTouchCancel)
    }
  }, [
    targetRef,
    minDistance,
    maxDuration,
    ignoreSelector,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
  ])
}
