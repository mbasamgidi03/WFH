export default function RingDecoration() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', bottom: -60, right: -60, width: 320, height: 320, pointerEvents: 'none', zIndex: 0 }}
    >
      <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="220" cy="220" r="140" stroke="#6115D0" strokeWidth="1.5" strokeOpacity="0.12" fill="none"/>
        <circle cx="220" cy="220" r="110" stroke="#6115D0" strokeWidth="1.5" strokeOpacity="0.1" fill="none"/>
        <circle cx="220" cy="220" r="80" stroke="#6115D0" strokeWidth="1.5" strokeOpacity="0.08" fill="none"/>
        <circle cx="220" cy="220" r="50" stroke="#6115D0" strokeWidth="1.5" strokeOpacity="0.06" fill="none"/>
        <circle cx="180" cy="260" r="120" stroke="#6115D0" strokeWidth="1" strokeOpacity="0.07" fill="none"/>
      </svg>
    </div>
  )
}
