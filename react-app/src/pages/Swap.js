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

function SwapApp ({ status, connect, account, ethereum }) {
  const [qty, setQty] = useState('0')
  const [toQty, setToQty] = useState('0')

  const [web3, setWeb3] = useState(null)
  const [tokens, setTokens] = useState(null)
  const [fromToken, setFromToken] = useState(null)
  const [toToken, setToToken] = useState(null)
  const [showDropDown, toggleDropDown] = useState(false)
  const [isApprovalNeeded, setIsApprovalNeeded] = useState(false)

  const [isFromTokenDropDown, setIsFromTokenDropDown] = useState(true)

  const [isLoading, setLoading] = useState(false)
  const [isSwapSuccess, setIsSwapSuccess] = useState(false)

  useEffect(() => {
    if (ethereum !== null && web3 === null) {
      setWeb3(new Web3(ethereum))

      return
    }

    if (web3 !== null || ethereum !== null) {
      setTokens(makeTokens(web3))
    }
  }, [ethereum, web3])

  async function swap () {
    setLoading(true)
    try {
      const swapContract = makeSwapContract(web3, swapAbi.abi, swapAbi.address)

      if (fromToken === null) {
        alert('Please select send token')
        return
      }

      if (toToken === null) {
        alert('Please select receive token')
        return
      }

      if(fromToken === toToken) {
        alert('Send token and Receive token cannot be same');
      }

      if (qty === '0') {
        alert('Enter valid quantity')
        return
      }

      var data;
      if(fromToken.address === FilDexConstants.nativeContractAddress) {
        data = await swapContract.swapNativeToken(
          account,
          toToken.address,
          qty
        )
      } else {
        data = await swapContract.swapNonNativeToken(
          account,
          fromToken.address,
          toToken.address,
          qty
        )
      }

      
      setIsSwapSuccess(true)
      console.log(data)
    } catch (e) {
      setIsSwapSuccess(false)
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  async function approve () {
    setLoading(true)
    try {
      if (fromToken === null) {
        alert('select from token')
        return
      }

      if (qty === '0') {
        alert('Enter some quantity')
        return
      }

      const data = await fromToken.approveContract(
        account,
        swapAbi.address
      )
      console.log(data)
    } catch (e) {
      console.log('Failed Approval ' + e)
    } finally {
      setLoading(false)
      getAllowance(fromToken)
    }
  }

  function getFromTokenFromIndex (index) {
    const keys = Object.keys(tokens)
    const token = tokens[keys[index]]
    setFromToken(token)
    return token
  }

  async function getAllowance (token) {
    const fromTokenAllowance = await token.getAllowance(
      account,
      swapAbi.address
    )
    console.log(fromTokenAllowance)
    if (fromTokenAllowance <= 0) {
      setIsApprovalNeeded(true)
      return
    } else {
      setIsApprovalNeeded(false)
    }
  }

  async function updateQuantities (fromQty) {
    const swapContract = makeSwapContract(web3, swapAbi.abi, swapAbi.address)
    if (fromToken !== null && toToken !== null && fromQty !== null && fromQty !== '') {
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
        {isSwapSuccess ? (
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
              }
            }}
            isFromTokenDropDown={isFromTokenDropDown}
          />
        ) : (
              <div className="flex justify-start flex-col m-8 bg-slight-black text-grey-font rounded-lg p-4 w-1/3">
                <div className="text-sm mb-6">You send</div>
                <div className="flex justify-start">
                  {tokens && (
                    <TokenSelectDropDown
                      token={fromToken ?? getFromTokenFromIndex(0)}
                      account={account}
                      toggleDropDown={(value) => {
                        setIsFromTokenDropDown(true);
                        toggleDropDown(value);
                      }}
                    />
                  )}
                  <div className="ml-2" />
                  <TokenQuantityInput onInput={updateQuantities} />
                </div>
                <div className="mb-8" />
                <hr className="border-hover-stroke border-2" />
                <div className="mb-4" />
                <div className="text-sm mb-6">You receive</div>
                <div className="flex justify-start">
                  {tokens && (
                    <TokenSelectDropDown
                      token={toToken}
                      account={account}
                      toggleDropDown={(value) => {
                        setIsFromTokenDropDown(false);
                        toggleDropDown(value);
                      }}
                    />
                  )}
                  <div className="ml-2" />
                  <TokenQtyValueView tokenQuantity={toQty} tokenPrice="0.00" />
                </div>
                <div className="mb-4" />
              </div>
            )}
      </div>
      <div className='flex justify-center'>
        {isSwapSuccess ? (
          <button
            className='rounded-full bg-white px-20 py-3 text-xl'
            onClick={() => {
              setIsSwapSuccess(false)
            }}
          >
            Return to swap
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
                ? isApprovalNeeded
                  ? approve
                  : swap
                : connect
            }
          >
            {status === FilDexConstants.connected
              ? isApprovalNeeded
                ? 'Approve'
                : 'Swap'
              : 'Connect'}
          </button>
        )}
      </div>
    </div>
  )
}

export default SwapApp;