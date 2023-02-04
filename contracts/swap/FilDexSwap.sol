// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";

contract FilDexSwap {
    using SafeMath  for uint;
    
    IFilDexSwapRouter private router;  
    address private wrappedToken; 

    constructor(address _router, address _wrappedToken) {
        router = IFilDexSwapRouter(_router);
        wrappedToken = _wrappedToken;
    }  

    function getAllowance(address tokenAddress) public view returns(uint allowance) {
        IERC20 token = IERC20(tokenAddress);
        allowance = token.allowance(msg.sender, address(this));
    }

    function getQuote(address tokenInAddress, address tokenOutAddress, uint tokenInAmount) public view returns(uint tokenOutAmount) {
        address[] memory path;
        path = new address[](2);
        path[0] = tokenInAddress;
        path[1] = tokenOutAddress;

        uint[] memory amount = router.getAmountsOut(tokenInAmount, path);
        tokenOutAmount = amount[1];
    }

    function getNativeQuote(address tokenOutAddress, uint tokenInAmount) external view returns(uint tokenOutAmount) {
        address[] memory path;
        path = new address[](2);
        path[0] = wrappedToken;
        path[1] = tokenOutAddress;

        uint[] memory amount = router.getAmountsOut(tokenInAmount, path);
        tokenOutAmount = amount[1];
    }

    function provideTokenAllowance(address sender, address tokenAddress, uint amount) private {
        IERC20 token = IERC20(tokenAddress);
        token.transferFrom(sender, address(this), amount);
        token.approve(address(router), amount);
    }   

    function swapNonNativeToken(address tokenInAddress, address tokenOutAddress, uint tokenInAmount) external returns(uint swapAmount) {
        uint contractAllowance = getAllowance(tokenInAddress);
        require(contractAllowance > 0, "Allowance error");

        provideTokenAllowance(msg.sender, tokenInAddress, tokenInAmount);
        
        address[] memory path;
        path = new address[](2);
        path[0] = tokenInAddress;
        path[1] = tokenOutAddress;

        uint tokenOutAmount = router.getAmountsOut(tokenInAmount, path)[1];
        uint deadline = block.timestamp + 5 minutes;

        uint[] memory amounts = router.swapExactTokensForTokens(
            tokenInAmount, 
            tokenOutAmount,
            path, 
            msg.sender, 
            deadline
        );

        swapAmount = amounts[1]; 
    }

    function swapNativeToken(address tokenOutAddress) external payable returns(uint swapAmount) {
        address[] memory path;
        path = new address[](2);
        path[0] = wrappedToken;
        path[1] = tokenOutAddress;

        uint tokenOutAmount = router.getAmountsOut(msg.value, path)[1];
        uint deadline = block.timestamp + 5 minutes;

        uint[] memory amounts = router.swapExactETHForTokens{value: msg.value}(
            tokenOutAmount, 
            path, 
            msg.sender, 
            deadline
        );

        swapAmount = amounts[1]; 
    }

    function addNonNativeTokenLiquidity(address token0Address, address token1Address, uint token0Amount, uint token1Amount, uint slippage) external returns(uint token0AmountAdded, uint token1AmountAdded, uint liquidity) {
        uint contractToken0Allowance = getAllowance(token0Address);
        require(contractToken0Allowance > 0, "Allowance error");
        uint contractToken1Allowance = getAllowance(token1Address);
        require(contractToken1Allowance > 0, "Allowance error");

        provideTokenAllowance(msg.sender, token0Address, token0Amount);
        provideTokenAllowance(msg.sender, token1Address, token1Amount);

        uint token0Slippage = token0Amount.mul(slippage).div(100); 
        uint token1Slippage = token1Amount.mul(slippage).div(100); 
        uint token0AmountMin = token0Amount.sub(token0Slippage);
        uint token1AmountMin = token1Amount.sub(token1Slippage);

        uint deadline = block.timestamp + 5 minutes;
    
        (token0AmountAdded, token1AmountAdded, liquidity) = router.addLiquidity(
            token0Address, 
            token1Address, 
            token0Amount, 
            token1Amount,
            token0AmountMin, 
            token1AmountMin, 
            msg.sender, 
            deadline
        );
    }

    function addNativeTokenLiquidity(address token1Address, uint token1Amount, uint slippage) external payable returns(uint nativeTokenAmountAdded, uint token1AmountAdded, uint liquidity) {
        uint contractAllowance = getAllowance(token1Address);
        require(contractAllowance > 0, "Allowance error");

        provideTokenAllowance(msg.sender, token1Address, token1Amount);

        uint nativeTokenAmount = msg.value; 

        uint nativeTokenSlippage = nativeTokenAmount.mul(slippage).div(100); 
        uint token1Slippage = token1Amount.mul(slippage).div(100); 

        uint nativeTokenMin = nativeTokenAmount.sub(nativeTokenSlippage);
        uint token1AmountMin = token1Amount.sub(token1Slippage);

        uint deadline = block.timestamp + 5 minutes;

        (nativeTokenAmountAdded, token1AmountAdded, liquidity) = router.addLiquidityETH{value: msg.value}(
            token1Address, 
            token1Amount,
            token1AmountMin, 
            nativeTokenMin, 
            msg.sender, 
            deadline
        );
    }

    fallback() external payable { }
    receive() external payable {}

}

interface IFilDexSwapRouter {
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);

    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        payable
        returns (uint[] memory amounts);

    function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB, uint liquidity);

    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
}