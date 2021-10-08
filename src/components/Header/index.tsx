import { ChainId } from 'mathswap-sdk'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'

import styled from 'styled-components'

import Wordmark from '../../assets/svg/wordmark_white.png'
// import WordmarkDark from '../../assets/svg/wordmark_white.png'
import { useActiveWeb3React } from '../../hooks'
// import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances } from '../../state/wallet/hooks'

// import { YellowCard } from '../Card'
import Settings from '../Settings'
import Menu from '../Menu'

import { RowBetween } from '../Row'
import Web3Status from '../Web3Status'
// import VersionSwitch from './VersionSwitch'

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  top: 0;
  position: absolute;
  z-index: 2;
  background: ${({ theme }) => theme.primary1};
  padding: 16px 12px 16px 24px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    position: relative;
    padding: 16px;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`


const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;

  :focus {
    border: 1px solid blue;
  }
`

const TestnetWrapper = styled.div`
  white-space: nowrap;
  pointer-events: auto;
`

const NetworkCard = styled.div`
  padding: 8px 12px;
  color: #fff;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    color: #000;
    padding-left:0;
  `}
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    position:fixed;
    left:0;
    right:0;
    bottom:0;
    background:#fff;
    padding: 16px;
    justify-content: space-between;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: null,
  // [ChainId.RINKEBY]: 'Rinkeby',
  // [ChainId.ROPSTEN]: 'Ropsten',
  // [ChainId.GÖRLI]: 'Görli',
  // [ChainId.KOVAN]: 'Kovan',
  [ChainId.TESTNET]: 'Galois',
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  // const [isDark] = useDarkModeManager()

  return (
    <HeaderFrame>
      <RowBetween>
        <HeaderElement>
          <a href="https://explorer.mathchain.org/" target="_blank" rel="noopener noreferrer">
            <img style={{height:'24px'}} src={Wordmark} alt="logo" />
          </a>
        </HeaderElement>
        <HeaderControls>
          <HeaderElement>
            <TestnetWrapper>
              {!isMobile && chainId && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>}
            </TestnetWrapper>
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {account && userEthBalance ? (
                <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  {userEthBalance?.toSignificant(6)} MATH
                </BalanceText>
              ) : null}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
          <HeaderElementWrap>
            {/* <VersionSwitch /> */}
            <Settings />
            <Menu />
          </HeaderElementWrap>
        </HeaderControls>
      </RowBetween>
    </HeaderFrame>
  )
}
