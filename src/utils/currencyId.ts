import { Currency, ETHER, Token } from 'mathswap-sdk'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'MATH'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
