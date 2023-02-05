import TokenSelectDropDown from '../components/TokenSelectDropDown'
import TokenQuantityInput from '../components/TokenQuantityInput'
import TokenQtyValueView from '../components/TokenQtyValueView'

import { useState, useEffect } from 'react'
import Web3 from 'web3'
import FilDexConstants from '../Constants'
import makeTokens from '../data/make_tokens'
import SwapSuccess from '../components/SwapSuccess'
import swapLogo from '../assets/swap.svg'

function WrapApp ({ status, connect, account, ethereum }) {
  const [qty, setQty] = useState('0')
  const [toQty, setToQty] = useState('0')

  const [web3, setWeb3] = useState(null)
  const [tokens, setTokens] = useState(null)
  const [fromToken, setFromToken] = useState(null)
  const [toToken, setToToken] = useState(null)

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
      if (toToken === null || fromToken === null) {
        console.log('Cannot Swap Empty Values')
        return
      }

      if (qty === '0') {
        console.log('Enter some quantity')
        return
      }
      const wrapperToken = getWrappedNativeToken(); 
      const weiQty = web3.utils.toWei(qty, 'ether');
        var tx;
        if (fromToken.address === FilDexConstants.nativeContractAddress) {
          tx = await wrapperToken.contract.methods.deposit().send({
            value: weiQty,
            from: account
          })
        } else {
          tx = await wrapperToken.contract.methods.withdraw(weiQty).send({
            from: account
          })
        }
      setIsSwapSuccess(true)
      console.log(tx)
    } catch (e) {
      setIsSwapSuccess(false)
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  function getWrappedNativeToken(setToken) {
    const keys = Object.keys(tokens)
    const token = tokens[keys[keys.length-2]]
    if(setToken) {
      setFromToken(token)
    }
    return token; 
  }

  function getNativeToken(setToken) {
    const keys = Object.keys(tokens)
    const token = tokens[keys[keys.length-1]]
    if(setToken) {
      setToToken(token)
    }
    return token; 
  }

  function onSwapLogoClick() {
    const swapToken = fromToken;
    setFromToken(toToken);
    setToToken(swapToken);
  }

  function updateQuantities(fromQty) {
    setQty(fromQty)
    setToQty(fromQty)
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
        ) : (
          <div className='flex justify-start flex-col m-8 bg-slight-black text-grey-font rounded-lg p-4 w-1/3'>
            <div className='text-sm mb-6'>You send</div>
            <div className='flex justify-start'>
              {tokens && (
                <TokenSelectDropDown
                  token={fromToken ?? getWrappedNativeToken(true)}
                  account={account}
                  isDropDownEnabled = {false}
                />
              )}
              <div className='ml-2' />
              <TokenQuantityInput onInput={updateQuantities} />
            </div>
            <div className='mb-8' />
            <div className='flex justify-center '> <img src={swapLogo} alt="v" onClick={onSwapLogoClick}/> </div>
            <div className='mb-4' />
            <div className='text-sm mb-6'>You receive</div>
            <div className='flex justify-start'>
              {tokens && (
                <TokenSelectDropDown
                  token={toToken ?? getNativeToken(true)}
                  account={account}
                  isDropDownEnabled = {false}
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
              status === FilDexConstants.connected ? swap : connect
            }
          >
            {status === FilDexConstants.connected ? 'Swap' : 'Connect'}
          </button>
        )}
      </div>
    </div>
  )
}

export default WrapApp;