# DaiHard

## What?

Taking out a long or a short position on DAI i.e. you think DAI is either going to go up or down and you want to profit

## How?

Supply DAI borrow USDC at maximum leverage, then trade the USDC for DAI on curvefi or something equivalent. The position is held for you on the smart contract - you cant withdraw.

If you ant to unwind the position, you trade the DAI back to USDC and pay back the debt. It has to sit within the BZX platform in order for us to keep the leverage

If you want to go short:
 - DAI in
 - Swap the DAI for USDC on Curvefi or Kyber
 - Supply the USDC for a loan to borrow more DAI (also on BZX)
 - Swap the DAI to USDC
 - Now our loan is easier to pay off if the DAI<>USDC ratio goes down
