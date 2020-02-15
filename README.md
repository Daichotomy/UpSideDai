# DaiHard
DaiHard is a highly leveraged contract for difference (CFD) built on Dai, Uniswap and Maker. This mechanism enables traders and speculators to bet on and hedge against price fluctuations of Dai by buying leveraged long or short positions in Dai. The CFD construction enables highly leverage (20x) while remaining capital efficient and not requiring high margin requirements (100% collateralalization). Positions are priced against the market observable Dai/Usd price by using a combination of the Maker oracle and Uniswap. 

DaiHard's CFD uses two tokens within the platform: UpDai and DownDai which represent long and short positions against the price of Dai. A market maker deposits 2 Dai into the platform to create 1 upDai and 1 downDai. When Dai is trading at par with the dollar (1Dai = 1Usd) then
```
 1 upDai = 1 downDai = 1 Dai = 1 Usd
```

As the price of Dai fluctuates around 1 Usd value flows between the upDai and downDai tokens. The sum of the upDai and downDai token is always equal, netting price action between the tokens This means that irrespective of the price of Dai a pair of upDai and downDai tokens yields 2 Dai in underlying. For example if the price of Dai is trading at 1.02 Usd then the long token is worth 1.4 Dai and the downDai is worth 0.6 Dai.

The price that Dai can fluctuate around the peg is bounded by the leverage used by the CFD. DaiHard's 20x leverage places a bound on the price of Dai between 1.05 and 0.95 Usd per Dai. This bound is reasonable as Dai has not broken this bound in over a year. However if Dai was to hit one of the bounds, say it's trading at 1.05, then the long token is worth 2 Dai and the short Dai is worth 0 Dai. If a wider bound is wanted then either less leverage should be used or more collateralization is required.

## Team
🇮🇪Alex - Smart contracts and integrations

🇨🇴Diego Mazo - Product and front end design

🇿🇦Chris Maree - Financial engineering and front end

🇹🇳Haythem Sellami - Smart contracts and front end

## Financial engineering
A contract for difference is a contract between two parties stipulating that the buyer will pay to the seller the difference between the current value of an asset and its value at contract time. DaiHard's implementation pays out the difference relative to the price of Dai. A CFD is a synthetic contract, representing synthetic price exposure to an underlying fictitious asset. As such it requires a maturity at which tokens can be redeemed for underlying. This ensures that the price of the token in the secondary market has a low tracking error to the underlying price feed.

### On-chain price of Dai in USD

### Calculating the settlement price of the CDF

### Transaction flow between platforms

## Technical description

### Smart contracts

### running code locally