import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'


// jokaisen testin jälkeen suoritetaan toimenpide
//joka nollaa selainta simuloivan jsdomin
afterEach(() => {
  cleanup()
})
