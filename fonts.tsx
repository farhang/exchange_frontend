import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Yekan Bakh Phinix Regular';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/YekanBakhPhinix/YekanBakhPhinix-Regular.woff2') format('woff2'), url('./fonts/YekanBakhPhinix/YekanBakhPhinix-Regular.woff') format('woff');
      }
      /* latin */
      @font-face {
        font-family: 'Yekan Bakh Phinix Bold';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/YekanBakhPhinix/YekanBakhPhinix-Bold.woff2') format('woff2'), url('./fonts/YekanBakhPhinix/YekanBakhPhinix-Bold.woff') format('woff');
      }
      `}
  />
)

export default Fonts
