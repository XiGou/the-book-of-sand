import { useState, useEffect, useRef, useCallback } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

import './BackgroundMusic.css'

// Pentatonic bell notes (Hz) – E minor pentatonic, two octaves
const BELL_NOTES = [164.81, 196.00, 220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25]

// Drone layers: [frequency Hz, gain, LFO rate Hz]
const DRONE_LAYERS: [number, number, number][] = [
  [82.41,  0.14, 0.037], // E2 – deep foundation
  [123.47, 0.09, 0.029], // B2 – perfect fifth
  [164.81, 0.05, 0.023], // E3 – upper octave whisper
]

function createReverbBuffer(ctx: AudioContext): AudioBuffer {
  const sampleRate = ctx.sampleRate
  const length = Math.floor(sampleRate * 4.5) // ~4.5 s tail
  const buf = ctx.createBuffer(2, length, sampleRate)
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch)
    for (let i = 0; i < length; i++) {
      // Decaying white noise impulse response
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 1.8)
    }
  }
  return buf
}

export function BackgroundMusic() {
  // Default to true – engine starts on first user interaction anywhere on the page
  const [playing, setPlaying] = useState(true)

  // Audio graph refs
  const ctxRef      = useRef<AudioContext | null>(null)
  const masterRef   = useRef<GainNode | null>(null)
  const wetRef      = useRef<GainNode | null>(null)
  const oscsRef     = useRef<(OscillatorNode | null)[]>([])
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const nextTimeRef = useRef<number>(0)

  // Mirrors `playing` so the first-interaction handler can read the latest value
  const playingRef  = useRef(true)
  // Set to true once the AudioContext has been created for the first time
  const startedRef  = useRef(false)

  // ------------------------------------------------------------------
  // Scheduler: plant a bell tone and re-schedule itself
  // ------------------------------------------------------------------
  const scheduleNextBell = useCallback(() => {
    const ctx = ctxRef.current
    const wet = wetRef.current
    if (!ctx || !wet) return

    while (nextTimeRef.current < ctx.currentTime + 0.25) {
      const t    = nextTimeRef.current
      const freq = BELL_NOTES[Math.floor(Math.random() * BELL_NOTES.length)]

      const osc = ctx.createOscillator()
      const env = ctx.createGain()

      osc.type          = 'sine'
      osc.frequency.value = freq

      // Soft attack, long exponential decay → bell-like
      env.gain.setValueAtTime(0, t)
      env.gain.linearRampToValueAtTime(0.18, t + 0.025)
      env.gain.exponentialRampToValueAtTime(0.0001, t + 6.0)

      osc.connect(env)
      env.connect(wet)

      osc.start(t)
      osc.stop(t + 6.5)

      // 4 – 14 s gap between bells
      nextTimeRef.current += 4 + Math.random() * 10
    }

    timerRef.current = setTimeout(scheduleNextBell, 80)
  }, [])

  // ------------------------------------------------------------------
  // Start engine
  // ------------------------------------------------------------------
  const startEngine = useCallback(() => {
    // AudioContext must be created after a user gesture
    const ctx = new AudioContext()
    ctxRef.current = ctx

    // Master bus
    const master = ctx.createGain()
    master.gain.setValueAtTime(0, ctx.currentTime)
    master.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 5) // slow fade-in
    master.connect(ctx.destination)
    masterRef.current = master

    // Reverb (convolver with synthesised IR)
    const reverb    = ctx.createConvolver()
    reverb.buffer   = createReverbBuffer(ctx)
    reverb.connect(master)

    // Dry / wet send gains
    const dry = ctx.createGain()
    dry.gain.value = 0.22
    dry.connect(master)

    const wet = ctx.createGain()
    wet.gain.value = 0.78
    wet.connect(reverb)
    wetRef.current = wet

    // Drone oscillators + LFOs
    const newOscs: OscillatorNode[] = []
    DRONE_LAYERS.forEach(([freq, gainVal, lfoRate]) => {
      const osc     = ctx.createOscillator()
      const gainNode = ctx.createGain()
      const lfo     = ctx.createOscillator()
      const lfoGain = ctx.createGain()

      osc.type           = 'sine'
      osc.frequency.value = freq
      gainNode.gain.value = gainVal

      // Very subtle pitch drift
      lfo.type           = 'sine'
      lfo.frequency.value = lfoRate
      lfoGain.gain.value  = freq * 0.0025

      lfo.connect(lfoGain)
      lfoGain.connect(osc.frequency)

      osc.connect(gainNode)
      gainNode.connect(dry)
      gainNode.connect(wet)

      osc.start()
      lfo.start()
      newOscs.push(osc, lfo)
    })
    oscsRef.current = newOscs

    // Kick off bell scheduler after a short silence
    nextTimeRef.current = ctx.currentTime + 5
    timerRef.current    = setTimeout(scheduleNextBell, 100)
  }, [scheduleNextBell])

  // ------------------------------------------------------------------
  // Stop engine
  // ------------------------------------------------------------------
  const stopEngine = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    // Capture everything locally, then clear refs immediately so a new
    // engine can start without interfering with the teardown timeout.
    const ctx    = ctxRef.current
    const master = masterRef.current
    const oscs   = oscsRef.current

    ctxRef.current    = null
    masterRef.current = null
    wetRef.current    = null
    oscsRef.current   = []

    if (ctx && master) {
      const now = ctx.currentTime
      master.gain.setValueAtTime(master.gain.value, now)
      master.gain.linearRampToValueAtTime(0, now + 1.5) // fade-out

      // Stop oscillators and close context after fade completes
      setTimeout(() => {
        oscs.forEach(osc => {
          try { osc?.stop() } catch { /* already stopped */ }
        })
        ctx.close()
      }, 2000)
    }
  }, [])

  // Keep playingRef in sync with state so the first-interaction handler sees the current value
  useEffect(() => {
    playingRef.current = playing
  }, [playing])

  // ------------------------------------------------------------------
  // Auto-start: kick off engine on the very first user interaction
  // ------------------------------------------------------------------
  useEffect(() => {
    const startOnInteraction = () => {
      if (!startedRef.current && playingRef.current) {
        startedRef.current = true
        startEngine()
      }
      // Always remove after first interaction, whether we started or not
      document.removeEventListener('click',      startOnInteraction, true)
      document.removeEventListener('keydown',    startOnInteraction, true)
      document.removeEventListener('touchstart', startOnInteraction, true)
    }

    // Capture phase so we fire before any element's own click handler
    document.addEventListener('click',      startOnInteraction, true)
    document.addEventListener('keydown',    startOnInteraction, true)
    document.addEventListener('touchstart', startOnInteraction, true)

    return () => {
      document.removeEventListener('click',      startOnInteraction, true)
      document.removeEventListener('keydown',    startOnInteraction, true)
      document.removeEventListener('touchstart', startOnInteraction, true)
    }
  }, [startEngine]) // stable: scheduleNextBell has no deps, so startEngine is also stable

  // ------------------------------------------------------------------
  // Toggle
  // ------------------------------------------------------------------
  const toggle = () => {
    setPlaying(prev => {
      const next = !prev
      playingRef.current = next
      if (startedRef.current) {
        // Engine has already been created at least once
        if (next) {
          startEngine()
        } else {
          stopEngine()
        }
      }
      // If engine not yet started (first interaction hasn't happened):
      // just updating playingRef is enough — the auto-start handler
      // checks playingRef.current before calling startEngine().
      return next
    })
  }

  // ------------------------------------------------------------------
  // Pause/resume on visibility change
  // ------------------------------------------------------------------
  useEffect(() => {
    const handleVisibility = () => {
      const ctx = ctxRef.current
      if (!ctx) return
      if (document.hidden) {
        ctx.suspend()
      } else {
        ctx.resume()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  // ------------------------------------------------------------------
  // Cleanup on unmount
  // ------------------------------------------------------------------
  useEffect(() => {
    return () => { stopEngine() }
  }, [stopEngine])

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  return (
    <button
      type="button"
      className={`music-toggle${playing ? ' music-toggle--on' : ''}`}
      onClick={toggle}
      aria-label={playing ? '关闭背景音乐' : '开启背景音乐'}
      title={playing ? '关闭音乐' : '开启音乐'}
    >
      {playing ? <Volume2 size={14} /> : <VolumeX size={14} />}
      <span>{playing ? '音乐' : '静音'}</span>
    </button>
  )
}
