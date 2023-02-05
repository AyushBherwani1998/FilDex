import TokenSelectDropDown from '../components/TokenSelectDropDown'
import TokenQuantityInput from '../components/TokenQuantityInput'
import TokenQtyValueView from '../components/TokenQtyValueView'

import { useState, useEffect } from 'react'
import Web3 from 'web3'
import FilDexConstants from '../Constants'
import makeSwapContract from '../contracts/SwapContract'
import swapAbi from '../abi/SwapABI'
import makeTokens from '../data/make_tokens'
import TokenDropList from '../components/TokenDropList'
import SwapSuccess from '../components/SwapSuccess'

function LiquidityApp ({ status, connect, account, ethereum }) {
  const [qty, setQty] = useState('0')
  const [toQty, setToQty] = useState('0')

  const [web3, setWeb3] = useState(null)
  const [tokens, setTokens] = useState(null)
  const [fromToken, setFromToken] = useState(null)
  const [toToken, setToToken] = useState(null)
  const [showDropDown, toggleDropDown] = useState(false)
  const [isFromTokenApprovalNeeded, setIsFromTokenApprovalNeeded] =
    useState(false)
  const [isToTokenApprovalNeeded, setIsToTokenApprovalNeeded] = useState(false)

  const [isFromTokenDropDown, setIsFromTokenDropDown] = useState(true)

  const [isLoading, setLoading] = useState(false)
  const [isSupplySuccess, setIsSupplySuccess] = useState(false)

  useEffect(() => {
    if (ethereum !== null && web3 === null) {
      setWeb3(new Web3(ethereum))

      return
    }

    if (web3 !== null || ethereum !== null) {
      setTokens(makeTokens(web3))
    }
  }, [ethereum, web3])

  async function supply () {
    setLoading(true)
    try {
      const swapContract = makeSwapContract(web3, swapAbi.abi, swapAbi.address)

      if (toToken === null || fromToken === null) {
        console.log('Cannot Swap Empty Values')
        return
      }

      if (qty === '0') {
        console.log('Enter some quantity')
        return
      }

      var data
      if (fromToken.address === FilDexConstants.nativeContractAddress) {
        //supply native liquidity
        data = await swapContract.addNativeTokenLiquidity(
          account,
          toToken.address,
          qty,
          toQty
        )
      } else {
        //supply non native liquidity
        data = await swapContract.addNonNativeTokenLiquidity(
          account,
          fromToken.address,
          toToken.address,
          qty,
          toQty
        )
      }
      setIsSupplySuccess(true)
      console.log(data)
    } catch (e) {
      setIsSupplySuccess(false)
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  async function approve () {
    setLoading(true)
    try {
      if (fromToken === null) {
        console.log('From Token cannot be null')
        return
      }

      if (toToken === null) {
        console.log('To Token cannot be null')
        return
      }

      if (qty === '0') {
        console.log('Enter some quantity')
        return
      }

      var data
      if (isFromTokenApprovalNeeded) {
        data = await fromToken.approveContract(
          account,
          swapAbi.address
        )
      } else {
        data = await toToken.approveContract(
          account,
          swapAbi.address
        )
      }
      console.log(data)
    } catch (e) {
      console.log('Failed Approval ' + e)
    } finally {
      setLoading(false)
      getAllowance(fromToken)
      getAllowance(toToken)
    }
  }

  function getFromTokenFromIndex (index) {
    const keys = Object.keys(tokens)
    const token = tokens[keys[index]]
    setFromToken(token)
    return token
  }

  function approvaButtonText () {
    if (isFromTokenApprovalNeeded) {
      return `Approval ${fromToken.name}`
    } else {
      return `Approval ${toToken.name}`
    }
  }

  async function getAllowance (token) {
    const tokenAllowance = await token.getAllowance(account, swapAbi.address)
    if (token === fromToken) {
      setIsFromTokenApprovalNeeded(tokenAllowance <= 0)
    } else {
      setIsToTokenApprovalNeeded(tokenAllowance <= 0)
    }
    return
  }

  async function updateQuantities (fromQty) {
    const swapContract = makeSwapContract(web3, swapAbi.abi, swapAbi.address)
    if (fromToken !== null && toToken !== null && fromQty !== null) {
      var toQuantity
      console.log(fromQty)
      if (fromToken.address === FilDexConstants.nativeContractAddress) {
        toQuantity = await swapContract.getNativeQuote(toToken.address, fromQty)
      } else {
        toQuantity = await swapContract.getNonNativeQuote(
          fromToken.address,
          toToken.address,
          fromQty
        )
      }
      console.log(toQuantity)
      setQty(fromQty)
      setToQty(toQuantity)
    } else {
      setToQty('0')
    }
  }

  return (
    <div>
      <div className='flex flex-row justify-center'>
        {isSupplySuccess ? (
          <SwapSuccess
            toName={toToken.name}
            fromName={fromToken.name}
            fromQty={qty}
            toQty={toQty}
          />
        ) : showDropDown ? (
          <TokenDropList
            tokens={tokens}
            toggleDropDown={toggleDropDown}
            updateSelectedToken={(token, isFromToken) => {
              if (isFromToken) {
                setFromToken(token)
                getAllowance(token)
              } else {
                setToToken(token)
                getAllowance(token)
              }
            }}
            isFromTokenDropDown={isFromTokenDropDown}
          />
        ) : (
          <div className='flex justify-start flex-col m-8 bg-slight-black text-grey-font rounded-lg p-4 w-1/3'>
            <div className='text-sm mb-6'>Token 1</div>
            <div className='flex justify-start'>
              {tokens && (
                <TokenSelectDropDown
                  token={fromToken ?? getFromTokenFromIndex(0)}
                  account={account}
                  toggleDropDown={value => {
                    setIsFromTokenDropDown(true)
                    toggleDropDown(value)
                  }}
                />
              )}
              <div className='ml-2' />
              <TokenQuantityInput onInput={updateQuantities} />
            </div>
            <div className='mb-8' />
            <hr className='border-divider-dark border' />
            <div className='mb-4' />
            <div className='text-sm mb-6'>Token 2</div>
            <div className='flex justify-start'>
              {tokens && (
                <TokenSelectDropDown
                  token={toToken}
                  account={account}
                  toggleDropDown={value => {
                    setIsFromTokenDropDown(false)
                    toggleDropDown(value)
                  }}
                />
              )}
              <div className='ml-2' />
              <TokenQtyValueView tokenQuantity={toQty} tokenPrice='0.00' />
            </div>
            <div className='mb-4' />
          </div>
        )}
      </div>
      <div className='flex justify-center'>
        {isSupplySuccess ? (
          <button
            className='rounded-full bg-white px-20 py-3 text-xl'
            onClick={() => {
              setIsSupplySuccess(false)
            }}
          >
            Return to Supply
          </button>
        ) : isLoading ? (
          <button className='rounded-full bg-loading-fill px-20 py-3 text-xl text-black'>
            Submitting ...
          </button>
        ) : (
          <button
            className='rounded-full bg-white px-20 py-3 text-xl'
            onClick={
              status === FilDexConstants.connected
                ? isFromTokenApprovalNeeded || isToTokenApprovalNeeded
                  ? approve
                  : supply
                : connect
            }
          >
            {status === FilDexConstants.connected
              ? isFromTokenApprovalNeeded || isToTokenApprovalNeeded
                ? approvaButtonText()
                : 'Supply'
              : 'Connect'}
          </button>
        )}
      </div>
    </div>
  )
}

export default LiquidityApp
