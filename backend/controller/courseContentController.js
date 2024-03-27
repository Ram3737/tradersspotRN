const mongoose = require("mongoose");

const courseContentTechnical = async (req, res) => {
  try {
    const basicsContent = [
      {
        name: "What is stock trading ?",
        link: `<iframe src="https://player.vimeo.com/video/887369863?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="stocktrading.mp4"></iframe`,
        duration: `15:29 mins`,
        pointOne: `Stock trading in India refers to the buying and selling of shares or stocks of publicly listed companies on stock exchanges such as the National Stock Exchange (NSE) and the Bombay Stock Exchange (BSE). It is a way for investors to participate in the financial markets, potentially earn returns, and become partial owners of the companies whose stocks they hold.`,
        pointTwo: `The two main stock exchanges in India are the National Stock Exchange (NSE) and the Bombay Stock Exchange (BSE). These exchanges provide a platform for buyers and sellers to trade stocks.`,
        pointThree: `Companies that wish to raise capital from the public can get their shares listed on stock exchanges. These listed companies then issue shares that investors can buy and sell on the open market.`,
      },
      {
        name: "Fundamental vs Technical analysis",
        link: `<iframe src="https://player.vimeo.com/video/901142928?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="fundamentalvstechnical.mp4 (1080p)"></iframe>`,
        duration: `18:45 mins`,
        pointOne: `Fundamental analysis and technical analysis are two primary methods used by traders and investors to analyze and make decisions in financial markets. They approach the market from different perspectives and use distinct sets of data and tools.`,
        pointTwo: `Fundamental analysis involves evaluating the intrinsic value of an asset by analyzing economic, financial, and other qualitative and quantitative factors. It considers factors such as company earnings, financial statements, economic indicators, management quality, industry trends, and overall market conditions.  Long-term investors who are interested in the underlying health and value of a company. It is often used for stocks, bonds, and other long-term investments.`,
        pointThree: `Technical analysis is based on the study of historical price and volume data to predict future price movements. It primarily relies on charts, technical indicators, and patterns, such as moving averages, support and resistance levels, and various oscillators.  Short to medium-term traders who are interested in understanding market trends and making trading decisions based on historical price movements.`,
      },
      {
        name: "Charts & Candlesticks ?",
        link: `<iframe src="https://player.vimeo.com/video/901161575?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="chartsandcandlesticks.mp4"></iframe>`,
        duration: `34:08 mins`,
        pointOne: `In trading, charts are graphical representations of price movements and other relevant market data for a particular financial instrument, such as stocks, commodities, currencies, or indices. Traders use charts to analyze historical price data and make informed decisions about potential future price movements.`,
        pointTwo: `Bar charts display individual price bars for each time period, including the open, high, low, and close prices. The top of the bar represents the highest price during the period, the bottom represents the lowest price, and a horizontal line on the left indicates the opening price.`,
        pointThree: `Candlesticks, or candlestick charts, are a type of chart used in financial markets to represent price movements of a security, such as stocks, currencies, commodities, or indices. They are particularly popular in technical analysis, a method used by traders and analysts to study historical price data and make predictions about future price movements. candlestick charts also show the open, high, low, and close prices for a specific time period. Candlesticks use different shapes and colors to represent bullish and bearish periods. The "body" of the candlestick represents the price range between the open and close, while the "wicks" (or "shadows") show the high and low prices.`,
      },
    ];

    const coreContent = [
      {
        name: "what are support & resistance ?",
        link: `<iframe src="https://player.vimeo.com/video/901872601?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="supportandresistance.mp4"></iframe>`,
        duration: `47:41 mins`,
        pointOne: `In trading, support and resistance are key concepts used to analyze price movements in financial markets, such as stocks, currencies, commodities, and others.`,
        pointTwo: `Support refers to a price level at which a financial instrument (like a stock or currency) tends to stop falling and may even bounce back. Traders often observe that certain price levels act as a floor for the asset's value. When the price approaches this level, buying interest typically increases, preventing the price from falling further. Support levels can be identified through various technical analysis tools, including chart patterns, moving averages, or trendlines.`,
        pointThree: `Resistance is the opposite of support. It is a price level at which a financial instrument tends to stop rising and might experience a pullback. Traders notice that certain price levels act as a ceiling for the asset's value. When the price approaches this level, selling interest tends to increase, preventing the price from rising further. Resistance levels can also be identified through technical analysis tools, including chart patterns, moving averages, or trendlines.`,
      },
      {
        name: "what are zones and how to identify it ?",
        link: `<iframe src="https://player.vimeo.com/video/901875068?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="zones.mp4"></iframe>`,
        duration: `20:45 mins`,
        pointOne: `Zones typically refers to specific price areas on a chart that are identified as having particular significance. These zones can include support and resistance levels, as well as other areas where price action has historically exhibited notable behavior. Traders often use these zones to make informed decisions about buying, selling, or managing their positions.`,
        pointTwo: `A range of prices where a financial instrument has historically had difficulty falling below. It represents an area where buying interest tends to increase, preventing the price from declining further.`,
        pointThree: `A range of prices where a financial instrument has historically struggled to rise above. It represents an area where selling interest tends to increase, preventing the price from advancing further.`,
      },
      {
        name: "What is a trendline and how to draw a perfect trendline? ?",
        link: `<iframe src="https://player.vimeo.com/video/901877040?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="trendlines.mp4"></iframe>`,
        duration: `36:35 mins`,
        pointOne: `Trendline is a straight line that connects two or more price points on a chart. These price points are typically lows in an uptrend or highs in a downtrend. Trendlines are used to visually represent the direction and strength of a trend.`,
        pointTwo: `Connects a series of higher lows. It indicates an upward or bullish trend, showing that the price is making higher lows over time`,
        pointThree: `Connects a series of lower highs. It indicates a downward or bearish trend, showing that the price is making lower highs over time.`,
      },
    ];

    const indicatorsContent = [
      {
        name: "what are lagging indicators ?",
        link: `<iframe src="https://player.vimeo.com/video/901902362?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="laggingindicator.mp4"></iframe>`,
        duration: `03:28 mins`,
        pointOne: `Lagging indicators are technical indicators that provide signals or information about the market after a trend or a reversal has already started. Unlike`,
        pointTwo: `Unlike leading indicators, which attempt to forecast future price movements, lagging indicators follow the price action and confirm the trend or reversal after it has begun.`,
        pointThree: `Lagging indicators are valuable for confirming trends, but they may not provide timely signals for entering or exiting trades. Traders often use a combination of lagging and leading indicators to make more informed decisions about market trends and potential reversals.`,
      },
      {
        name: "what are leading indicators ?",
        link: `<iframe src="https://player.vimeo.com/video/901900412?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="leadingindicator.mp4"></iframe>`,
        duration: `03:18 mins`,
        pointOne: `Leading indicators are technical indicators or signals that attempt to forecast future price movements before they actually occur.`,
        pointTwo: ` These indicators are used by traders to identify potential trend reversals, market turning points, or changes in momentum. Unlike lagging indicators, which confirm trends after they have started, leading indicators aim to provide early signals to traders.`,
        pointThree: `It's important to note that while leading indicators can offer valuable insights, no indicator or combination of indicators is foolproof. Traders often use a mix of leading and lagging indicators along with other analysis tools to make informed decisions. Additionally, leading indicators may sometimes produce false signals, so risk management is crucial when incorporating them into a trading strategy.`,
      },
      {
        name: "What is volume profile and how is it used ?",
        link: `<iframe src="https://player.vimeo.com/video/901940197?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="volumeprofile.mp4"></iframe>`,
        duration: `29:14 mins`,
        pointOne: `Volume profile is a charting analysis technique used to display the distribution of trading volume over a specified price range. It provides insights into how much trading activity has occurred at different price levels during a given period.`,
        pointTwo: `Traders use volume profile to understand where significant price levels and potential support or resistance zones exist based on the concentration of traded volume.`,
        pointThree: `Traders often customize the parameters of volume profile analysis based on their trading strategies and the time frames they are examining. Volume profile is a versatile tool that can be applied to various trading styles, including day trading, swing trading, and position trading.`,
      },

      {
        name: "What is golden fibonacci rule ?",
        link: `<iframe src="https://player.vimeo.com/video/901943945?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="fibonacci.mp4"></iframe>`,
        duration: `24:33 mins`,
        pointOne: `The Fibonacci indicator is a technical analysis tool based on the Fibonacci sequence and ratios. It is used to identify potential levels of support and resistance in financial markets.`,
        pointTwo: `The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones (e.g., 0, 1, 1, 2, 3, 5, 8, 13, 21, ...). The key Fibonacci ratios derived from this sequence are 23.6%, 38.2%, 50%, 61.8%, and 78.6%. Traders apply the Fibonacci indicator by selecting a significant high and low on a price chart and then drawing the Fibonacci retracement, extension, fan lines, or arcs accordingly. The idea is that these Fibonacci levels may act as key turning points or areas of interest for traders.`,
        pointThree: `It's important to note that while the Fibonacci indicator is popular among traders, its effectiveness is subjective, and it should be used in conjunction with other technical analysis tools and indicators as part of a comprehensive trading strategy.`,
      },

      {
        name: "Relative strength index(RSI) and cheatsheet",
        link: `<iframe src="https://player.vimeo.com/video/901945957?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="rsi.mp4"></iframe>`,
        duration: `26:19 mins`,
        pointOne: `Relative Strength Index (RSI) is a momentum oscillator that measures the speed and change of price movements. RSI is a widely used technical indicator that helps traders identify overbought or oversold conditions in a market. The RSI is typically applied to individual assets or financial instruments, such as stocks, currencies, or commodities.`,
        pointTwo: `The RSI is typically plotted on a scale from 0 to 100. Traditionally, levels above 70 are considered overbought, suggesting that an asset may be due for a price correction or reversal. Conversely, levels below 30 are considered oversold, indicating that an asset may be undervalued and due for a potential upward reversal. RSI divergence occurs when the price of an asset and the RSI indicator move in opposite directions. This can signal a potential change in the direction of the price trend.`,
        pointThree: `Traders use the RSI to generate buy or sell signals, identify potential trend reversals, and assess the overall strength of a trend. It is important to note that while the RSI can be a valuable tool, it is not foolproof, and traders often use it in conjunction with other technical indicators and analysis methods to make well-informed trading decisions.`,
      },

      {
        name: "Moving averages(9ma, 20ma, 50ma) and cheatsheet",
        link: `<iframe src="https://player.vimeo.com/video/901948415?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="movingaverages.mp4"></iframe>`,
        duration: `17:26 mins`,
        pointOne: `Moving averages are widely used technical indicators that smooth out price data over a specified period to identify trends and potential reversal points in financial markets. A moving average is calculated by taking the average price of an asset over a defined number of periods, updating as new data becomes available.`,
        pointTwo: `Moving average crossovers are often used to generate buy or sell signals. A bullish crossover occurs when a shorter-term moving average crosses above a longer-term moving average, suggesting a potential upward trend. Conversely, a bearish crossover occurs when a shorter-term moving average crosses below a longer-term moving average, indicating a potential downward trend.`,
        pointThree: `Moving averages are versatile tools that can be applied to various timeframes, from short-term intraday charts to long-term weekly or monthly charts. They are essential for trend analysis and are often used in combination with other technical indicators to make well-informed trading decisions.`,
      },
    ];

    const patternsContent = [
      {
        name: "What are patterns ?",
        link: `<iframe src="https://player.vimeo.com/video/902565374?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="whatarepatterns.mp4"></iframe>`,
        duration: `07:27 mins`,
        pointOne: `Patterns refer to recognizable formations or configurations on price charts that traders use to make predictions about future price movements.`,
        pointTwo: `These patterns are based on the idea that historical price movements tend to repeat themselves, and traders can gain insights into potential future price directions by identifying and understanding these patterns.`,
        pointThree: `Technical analysts often rely on chart patterns to make informed decisions about buying or selling assets.`,
      },
      {
        name: "Triangle patterns and cheatsheet",
        link: `<iframe src="https://player.vimeo.com/video/902567690?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="trianglepattern.mp4"></iframe>`,
        duration: `58:42 mins`,
        pointOne: `Triangle pattern is a technical analysis pattern that can be formed on price charts. Triangle patterns are typically continuation patterns, indicating that the existing trend is likely to continue after a period of consolidation or indecision. There are three main types of triangle patterns: ascending triangles, descending triangles, and symmetrical triangles.`,
        pointTwo: `Traders often use triangle patterns as potential signals for future price movements. The breakout direction (up or down) is crucial in determining the likely trend continuation. Typically, traders wait for the price to break above the upper trendline in an ascending triangle or below the lower trendline in a descending triangle to confirm the pattern.`,
        pointThree: `It's important to note that while triangle patterns can be useful, they should not be used in isolation, and other technical indicators and analysis tools should be considered for a comprehensive understanding of market conditions. Additionally, false breakouts can occur, so risk management strategies are essential for successful trading.`,
      },
      {
        name: "Channel patterns and cheatsheet",
        link: `<iframe src="https://player.vimeo.com/video/902575272?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="channelpattern"></iframe>`,
        duration: `30:24 mins`,
        pointOne: `Channel pattern refers to a technical analysis pattern that is formed by two parallel trendlines, one representing a line of support and the other a line of resistance. The price of an asset tends to oscillate between these two trendlines, creating a channel-like structure on the price chart. Channel patterns can provide traders with insights into potential future price movements and trends.`,
        pointTwo: `Channels can provide traders with potential entry and exit points based on the interaction of the price with the trendlines. Traders often look for buying opportunities near the lower trendline in an ascending channel and selling opportunities near the upper trendline in a descending channel.`,
        pointThree: `It's important to note that channels, like other technical patterns, should be used in conjunction with other technical analysis tools and indicators for a more comprehensive analysis. Additionally, traders should be cautious of false breakouts or breakdowns and consider implementing risk management strategies to mitigate potential losses.`,
      },
      {
        name: "Flag patterns and cheatsheet",
        link: `<iframe src="https://player.vimeo.com/video/902574785?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="flagpattern.mp4"></iframe>`,
        duration: `20:31 mins`,
        pointOne: `Flag pattern is a technical analysis pattern that is considered a continuation pattern. It is named "flag" due to its visual resemblance to a flag on a flagpole. The pattern consists of a sharp, strong price movement (referred to as the "flagpole") followed by a consolidation phase (the "flag") that is usually characterized by a rectangular-shaped price range.`,
        pointTwo: `Traders often look for specific entry and exit points based on the breakout direction of the flag pattern. A breakout above the upper boundary of the flag in a bullish flag or below the lower boundary in a bearish flag is considered a signal for a potential continuation of the trend.`,
        pointThree: `As with any technical analysis pattern, it's essential for traders to use flags in conjunction with other indicators and tools to confirm signals and manage risk effectively. False breakouts can occur, so risk management is crucial in trading flag patterns.`,
      },
      {
        name: "Wedge patterns and cheatsheet",
        link: `<iframe src="https://player.vimeo.com/video/902566922?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="wedgepattern.mp4"></iframe>`,
        duration: `33:05 mins`,
        pointOne: `Wedge pattern is a technical analysis pattern characterized by converging trendlines that form a wedge shape on a price chart. Wedge patterns are typically considered reversal patterns, meaning they may signal a potential change in the existing trend. There are two main types of wedge patterns: rising wedge and falling wedge.`,
        pointTwo: `Wedge patterns are often associated with decreasing volatility as the price approaches the apex (the point where the two trendlines converge). Traders use wedge patterns to anticipate potential breakout or breakdown points, indicating the start of a new trend.`,
        pointThree: `It's important to note that not all wedge patterns result in a reversal, and false breakouts or breakdowns can occur. Therefore, traders often use additional technical indicators and analysis tools to confirm signals and manage risks. As with any trading pattern, risk management strategies are crucial to mitigate potential losses.`,
      },
      {
        name: "Double top pattern and cheatsheet",
        link: `<iframe src="https://player.vimeo.com/video/902578598?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="doubletop.mp4"></iframe>`,
        duration: `29:11 mins`,
        pointOne: `Double top pattern is a technical analysis pattern that signals a potential trend reversal. It is considered a bearish reversal pattern and typically forms at the end of an uptrend. The double top pattern is characterized by two peaks (highs) at approximately the same price level, separated by a trough or a pullback between them. The pattern resembles the letter "M" on a price chart.`,
        pointTwo: `Traders often use the height of the pattern (distance from the peaks to the trough) to estimate the potential downside target once the pattern is confirmed.`,
        pointThree: `It's important to note that while the double top pattern is a widely recognized reversal pattern, traders should always exercise caution and use other technical indicators or analysis tools to confirm signals. False breakouts or breakdowns can occur, and risk management strategies are crucial in trading to minimize potential losses. Additionally, the double top pattern is just one of many patterns and signals that traders use to make informed decisions in the financial markets.`,
      },
      {
        name: "Double bottom pattern and cheatsheet",
        link: `<iframe src="https://player.vimeo.com/video/902577859?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="doublebottom.mp4"></iframe>`,
        duration: `18:08 mins`,
        pointOne: ` double bottom pattern is a technical analysis pattern that signals a potential trend reversal. It is considered a bullish reversal pattern and typically forms at the end of a downtrend. The double bottom pattern is characterized by two troughs or lows at approximately the same price level, separated by a peak or a rally between them. The pattern resembles the letter "W" on a price chart.`,
        pointTwo: `Traders often use the height of the pattern (distance from the troughs to the peak) to estimate the potential upside target once the pattern is confirmed.`,
        pointThree: `As with any technical analysis pattern, traders should exercise caution and use other technical indicators or analysis tools to confirm signals. False breakouts or breakdowns can occur, and risk management strategies are crucial in trading to minimize potential losses. The double bottom pattern is just one of many patterns and signals that traders use to make informed decisions in the financial markets.`,
      },
      {
        name: "Head & Shoulder pattern and cheatsheet",
        link: `<iframe src="https://player.vimeo.com/video/902576927?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="headandshoulder.mp4"></iframe>`,
        duration: `24:42 mins`,
        pointOne: `Head and Shoulders pattern is a significant and widely recognized technical analysis pattern that is often considered a reversal pattern. It typically forms after an uptrend and signals a potential trend reversal to the downside. The pattern is named for its appearance, which resembles a human head and shoulders.`,
        pointTwo: `It's important to note that the Head and Shoulders pattern is considered a reliable reversal pattern, but like any technical analysis tool, it is not foolproof. Traders often use other technical indicators and analysis tools to confirm signals and manage risks. Additionally, false breakouts or breakdowns can occur, emphasizing the importance of risk management in trading.`,
        pointThree: `There is also an inverse pattern called the Inverse Head and Shoulders, which is a bullish reversal pattern that forms after a downtrend and signals a potential upward reversal.`,
      },
      {
        name: "Inverse Head & Shoulder pattern and cheatsheet",
        link: `<iframe src="https://player.vimeo.com/video/902576167?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="inverseheadandshoulder.mp4"></iframe>`,
        duration: `21:17 mins`,
        pointOne: `Inverse Head and Shoulders pattern is a significant and widely recognized technical analysis pattern that is considered a reversal pattern. It typically forms after a downtrend and signals a potential trend reversal to the upside. The pattern is the opposite of the regular Head and Shoulders pattern and is named for its appearance, which resembles an inverted human head and shoulders.`,
        pointTwo: `Similar to the regular Head and Shoulders pattern, the Inverse Head and Shoulders pattern is considered a reliable reversal pattern. Traders often use other technical indicators and analysis tools to confirm signals and manage risks.`,
        pointThree: `False breakouts or breakdowns can occur, so it's essential for traders to exercise caution and use risk management strategies when incorporating this pattern into their trading decisions.`,
      },
      {
        name: "Major patterns for living",
        link: `<iframe src="https://player.vimeo.com/video/902565775?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="majorpatternsforliving.mp4"></iframe>`,
        duration: `19:32 mins`,
        pointOne: `Patterns refer to recognizable formations or configurations on price charts that traders use to make predictions about future price movements.`,
        pointTwo: `These patterns are based on the idea that historical price movements tend to repeat themselves, and traders can gain insights into potential future price directions by identifying and understanding these patterns.`,
        pointThree: `Technical analysts often rely on chart patterns to make informed decisions about buying or selling assets.`,
      },
    ];

    const strategiesContent = [
      {
        name: "Strategies for intraday",
        link: `<iframe src="https://player.vimeo.com/video/904366425?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="strategy_for_intraday.mp4"></iframe>`,
        duration: `1:29:37 mins`,
        pointOne: `Intraday trading refers to buying and selling financial instruments within the same trading day. Intraday traders aim to capitalize on short-term price movements and typically do not hold positions overnight. Various intraday strategies are employed by traders to navigate the fast-paced and volatile nature of intraday markets.`,
        pointTwo: `It's important to note that intraday trading carries inherent risks due to the short time frames involved and the potential for rapid market movements.`,
        pointThree: `Traders should use risk management strategies, set stop-loss orders, and stay informed about market conditions to improve their chances of success. Additionally, selecting the right strategy often depends on individual preferences, risk tolerance, and market conditions.`,
      },
      {
        name: "Strategies for swing",
        link: `<iframe src="https://player.vimeo.com/video/904369266?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="strategy_for_swing1.mp4"></iframe>`,
        duration: `1:15:27 mins`,
        pointOne: `Swing trading is a style of trading that aims to capture short to medium-term price movements within a larger trend. Unlike day trading, swing trading involves holding positions for more than one trading day but typically for a shorter duration compared to longer-term investments.`,
        pointTwo: `Swing trading requires a combination of technical analysis, risk management, and market awareness. Traders need to be patient, as swing trades typically last several days to a few weeks.`,
        pointThree: `Additionally, it's crucial to use proper risk management techniques, including setting stop-loss orders and position sizing, to protect against adverse market movements.`,
      },
    ];

    const riskManagementContent = [
      {
        name: "what is Position sizing ?",
        link: `<iframe src="https://player.vimeo.com/video/904371903?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="positionsizing.mp4"></iframe>`,
        duration: `09:39 mins`,
        pointOne: `Position sizing is a critical component of risk management in trading. It refers to determining the amount of capital or the number of units (shares, contracts, lots, etc.) to invest or trade in a particular position. Proper position sizing helps traders control risk, manage their capital effectively, and avoid significant losses.`,
        pointTwo: `Before determining position size, traders need to assess their risk tolerance. This involves defining the maximum amount or percentage of their trading capital they are willing to risk on a single trade. The placement of a stop-loss order is crucial in position sizing. The stop-loss represents the maximum acceptable loss on a trade. Traders typically place it based on technical levels, volatility, or other relevant factors.`,
        pointThree: `Trade risk is the difference between the entry price and the stop-loss level. Traders may express this risk as a percentage of their trading capital. For example, if a trader is willing to risk 1% on a trade and the trade risk is $100, the position size would be adjusted accordingly. Traders should adapt their position sizes to changes in market conditions, volatility, and their own risk tolerance. As these factors evolve, so should the approach to position sizing.`,
      },
      {
        name: "Risk/Reward",
        link: `<iframe src="https://player.vimeo.com/video/904374255?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="riskmanagement.mp4"></iframe>`,
        duration: `09:56 mins`,
        pointOne: `Risk-reward ratio is a key concept in trading that compares the potential profit of a trade to the potential loss. It is a ratio that helps traders assess the potential return on investment relative to the amount of risk undertaken. The risk-reward ratio is expressed as a numerical value, typically as a ratio of the potential reward to the potential risk.`,
        pointTwo: `The risk-reward ratio is closely tied to risk management. By establishing a risk-reward ratio before entering a trade, traders can determine the appropriate position size and ensure that potential losses are limited to an acceptable level.`,
        pointThree: `It's important to note that a high risk-reward ratio alone does not guarantee success. Traders should also consider other factors, such as the probability of success, market conditions, and the overall trading strategy. The risk-reward ratio is a tool to assist in making informed decisions, but it should be used in conjunction with a comprehensive trading plan.`,
      },
    ];

    const bonusContent = [
      {
        name: "Breakout vs Fakeout",
        link: `<iframe src="https://player.vimeo.com/video/904375380?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="breakoutvsfakeout.mp4"></iframe>`,
        duration: `10:04 mins`,
        pointOne: `Breakouts and fakeouts are common occurrences in trading, particularly in technical analysis. Understanding these concepts is crucial for traders who aim to identify potential entry and exit points in the market.`,
        pointTwo: `A breakout occurs when the price of a financial instrument moves above or below a significant level of support or resistance. This movement is often accompanied by increased volume, signaling a potential change in the prevailing trend or the continuation of an existing one. Traders often see breakouts as opportunities to enter trades in the direction of the breakout.`,
        pointThree: `A fakeout, also known as a false breakout, occurs when the price briefly moves beyond a support or resistance level but then quickly reverses, failing to sustain the breakout. Fakeouts can trap traders who entered positions based on the initial breakout signal.`,
      },
      {
        name: "Perfect & Confluence entry",
        link: `<iframe src="https://player.vimeo.com/video/904373179?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="perfectandconfluenceentry.mp4"></iframe>`,
        duration: `27:25 mins`,
        pointOne: `Perfect entry refers to an entry point into a trade that aligns with a trader's analysis and strategy, providing a high probability of success. Achieving a perfect entry often involves identifying a confluence of multiple factors that support the trade idea.`,
        pointTwo: `Confluence refers to the coming together or convergence of different technical or fundamental elements that strengthen the conviction in a particular trade.`,
        pointThree: `Achieving a perfect entry with confluence involves a holistic approach to trading, considering a combination of technical, fundamental, and risk management factors. Traders often develop their unique trading plans and methodologies based on their preferences and experiences. Regularly reviewing and refining your approach is essential for long-term success in the markets.`,
      },
      {
        name: "Trail your trade",
        link: `<iframe src="https://player.vimeo.com/video/904370632?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="trailyourtrade.mp4"></iframe>`,
        duration: `21:18 mins`,
        pointOne: `Trailing a trade refers to adjusting the stop-loss level as the market price moves in a favorable direction. The purpose of trailing a trade is to lock in profits and protect against potential reversals while allowing the trade to capture additional gains. This technique is often used by traders to maximize returns during trending markets.`,
        pointTwo: `When entering a trade, traders set an initial stop-loss level. This stop-loss order is placed to limit potential losses in case the market moves against the trade. As the market price moves in the desired direction and generates profits, traders may adjust the stop-loss level to "trail" behind the current market price. The new stop-loss level is set at a predetermined distance from the current market price.`,
        pointThree: `Trailing a trade is a proactive approach to risk management and profit maximization. However, traders should be mindful of market conditions and use trailing stops in conjunction with other aspects of their trading strategy. It's important to strike a balance between locking in profits and giving the trade enough room to develop in line with the overall market trend.`,
      },
    ];
    res.status(200).json({
      basicsContent,
      coreContent,
      indicatorsContent,
      patternsContent,
      strategiesContent,
      riskManagementContent,
      bonusContent,
    });
  } catch (error) {
    console.error("courseContentFundamental", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const courseContentTechnicalWeb = async (req, res) => {
  try {
    const basicsContent = [
      {
        name: "What is stock trading ?",
        link: `<iframe
        src="https://player.vimeo.com/video/565580804?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
        width="100%"
        height="100%"
        title="whatisstocktrading.mp4"
      ></iframe>`,
        duration: `15:29 mins`,
        pointOne: `Stock trading in India refers to the buying and selling of shares or stocks of publicly listed companies on stock exchanges such as the National Stock Exchange (NSE) and the Bombay Stock Exchange (BSE). It is a way for investors to participate in the financial markets, potentially earn returns, and become partial owners of the companies whose stocks they hold.`,
        pointTwo: `The two main stock exchanges in India are the National Stock Exchange (NSE) and the Bombay Stock Exchange (BSE). These exchanges provide a platform for buyers and sellers to trade stocks.`,
        pointThree: `Companies that wish to raise capital from the public can get their shares listed on stock exchanges. These listed companies then issue shares that investors can buy and sell on the open market.`,
      },
      {
        name: "Fundamental vs Technical analysis",
        link: `<iframe src="https://player.vimeo.com/video/566053576?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="fundamentalvstechnical.mp4"></iframe>`,
        duration: `18:45 mins`,
        pointOne: `Fundamental analysis and technical analysis are two primary methods used by traders and investors to analyze and make decisions in financial markets. They approach the market from different perspectives and use distinct sets of data and tools.`,
        pointTwo: `Fundamental analysis involves evaluating the intrinsic value of an asset by analyzing economic, financial, and other qualitative and quantitative factors. It considers factors such as company earnings, financial statements, economic indicators, management quality, industry trends, and overall market conditions.  Long-term investors who are interested in the underlying health and value of a company. It is often used for stocks, bonds, and other long-term investments.`,
        pointThree: `Technical analysis is based on the study of historical price and volume data to predict future price movements. It primarily relies on charts, technical indicators, and patterns, such as moving averages, support and resistance levels, and various oscillators.  Short to medium-term traders who are interested in understanding market trends and making trading decisions based on historical price movements.`,
      },
      {
        name: "Charts & Candlesticks ?",
        link: `<iframe src="https://player.vimeo.com/video/575809640?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="chartsandcandlesticks.mp4"></iframe>`,
        duration: `34:08 mins`,
        pointOne: `In trading, charts are graphical representations of price movements and other relevant market data for a particular financial instrument, such as stocks, commodities, currencies, or indices. Traders use charts to analyze historical price data and make informed decisions about potential future price movements.`,
        pointTwo: `Bar charts display individual price bars for each time period, including the open, high, low, and close prices. The top of the bar represents the highest price during the period, the bottom represents the lowest price, and a horizontal line on the left indicates the opening price.`,
        pointThree: `Candlesticks, or candlestick charts, are a type of chart used in financial markets to represent price movements of a security, such as stocks, currencies, commodities, or indices. They are particularly popular in technical analysis, a method used by traders and analysts to study historical price data and make predictions about future price movements. candlestick charts also show the open, high, low, and close prices for a specific time period. Candlesticks use different shapes and colors to represent bullish and bearish periods. The "body" of the candlestick represents the price range between the open and close, while the "wicks" (or "shadows") show the high and low prices.`,
      },
    ];

    const coreContent = [
      {
        name: "what are support & resistance ?",
        link: `<iframe src="https://player.vimeo.com/video/567787972?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="supportandresistance.mp4"></iframe>`,
        duration: `47:41 mins`,
        pointOne: `In trading, support and resistance are key concepts used to analyze price movements in financial markets, such as stocks, currencies, commodities, and others.`,
        pointTwo: `Support refers to a price level at which a financial instrument (like a stock or currency) tends to stop falling and may even bounce back. Traders often observe that certain price levels act as a floor for the asset's value. When the price approaches this level, buying interest typically increases, preventing the price from falling further. Support levels can be identified through various technical analysis tools, including chart patterns, moving averages, or trendlines.`,
        pointThree: `Resistance is the opposite of support. It is a price level at which a financial instrument tends to stop rising and might experience a pullback. Traders notice that certain price levels act as a ceiling for the asset's value. When the price approaches this level, selling interest tends to increase, preventing the price from rising further. Resistance levels can also be identified through technical analysis tools, including chart patterns, moving averages, or trendlines.`,
      },
      {
        name: "what are zones and how to identify it ?",
        link: `<iframe src="https://player.vimeo.com/video/567801274?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="zones.mp4"></iframe`,
        duration: `20:45 mins`,
        pointOne: `Zones typically refers to specific price areas on a chart that are identified as having particular significance. These zones can include support and resistance levels, as well as other areas where price action has historically exhibited notable behavior. Traders often use these zones to make informed decisions about buying, selling, or managing their positions.`,
        pointTwo: `A range of prices where a financial instrument has historically had difficulty falling below. It represents an area where buying interest tends to increase, preventing the price from declining further.`,
        pointThree: `A range of prices where a financial instrument has historically struggled to rise above. It represents an area where selling interest tends to increase, preventing the price from advancing further.`,
      },
      {
        name: "What is a trendline and how to draw a perfect trendline? ?",
        link: `<iframe src="https://player.vimeo.com/video/568854116?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="trendlines.mp4"></iframe>`,
        duration: `36:35 mins`,
        pointOne: `Trendline is a straight line that connects two or more price points on a chart. These price points are typically lows in an uptrend or highs in a downtrend. Trendlines are used to visually represent the direction and strength of a trend.`,
        pointTwo: `Connects a series of higher lows. It indicates an upward or bullish trend, showing that the price is making higher lows over time`,
        pointThree: `Connects a series of lower highs. It indicates a downward or bearish trend, showing that the price is making lower highs over time.`,
      },
    ];

    const indicatorsContent = [
      {
        name: "what are lagging indicators ?",
        link: `<iframe src="https://player.vimeo.com/video/567821840?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="laggingindicator.mp4"></iframe>`,
        duration: `03:28 mins`,
        pointOne: `Lagging indicators are technical indicators that provide signals or information about the market after a trend or a reversal has already started. Unlike`,
        pointTwo: `Unlike leading indicators, which attempt to forecast future price movements, lagging indicators follow the price action and confirm the trend or reversal after it has begun.`,
        pointThree: `Lagging indicators are valuable for confirming trends, but they may not provide timely signals for entering or exiting trades. Traders often use a combination of lagging and leading indicators to make more informed decisions about market trends and potential reversals.`,
      },
      {
        name: "what are leading indicators ?",
        link: `<iframe src="https://player.vimeo.com/video/570269395?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="leadingindicator.mp4"></iframe>`,
        duration: `03:18 mins`,
        pointOne: `Leading indicators are technical indicators or signals that attempt to forecast future price movements before they actually occur.`,
        pointTwo: ` These indicators are used by traders to identify potential trend reversals, market turning points, or changes in momentum. Unlike lagging indicators, which confirm trends after they have started, leading indicators aim to provide early signals to traders.`,
        pointThree: `It's important to note that while leading indicators can offer valuable insights, no indicator or combination of indicators is foolproof. Traders often use a mix of leading and lagging indicators along with other analysis tools to make informed decisions. Additionally, leading indicators may sometimes produce false signals, so risk management is crucial when incorporating them into a trading strategy.`,
      },
      {
        name: "What is volume profile and how is it used ?",
        link: `<iframe src="https://player.vimeo.com/video/568865718?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="volumeprofile.mp4"></iframe>`,
        duration: `29:14 mins`,
        pointOne: `Volume profile is a charting analysis technique used to display the distribution of trading volume over a specified price range. It provides insights into how much trading activity has occurred at different price levels during a given period.`,
        pointTwo: `Traders use volume profile to understand where significant price levels and potential support or resistance zones exist based on the concentration of traded volume.`,
        pointThree: `Traders often customize the parameters of volume profile analysis based on their trading strategies and the time frames they are examining. Volume profile is a versatile tool that can be applied to various trading styles, including day trading, swing trading, and position trading.`,
      },

      {
        name: "What is golden fibonacci rule ?",
        link: `<iframe src="https://player.vimeo.com/video/565568231?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="fibonacci.mp4"></iframe>`,
        duration: `24:33 mins`,
        pointOne: `The Fibonacci indicator is a technical analysis tool based on the Fibonacci sequence and ratios. It is used to identify potential levels of support and resistance in financial markets.`,
        pointTwo: `The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones (e.g., 0, 1, 1, 2, 3, 5, 8, 13, 21, ...). The key Fibonacci ratios derived from this sequence are 23.6%, 38.2%, 50%, 61.8%, and 78.6%. Traders apply the Fibonacci indicator by selecting a significant high and low on a price chart and then drawing the Fibonacci retracement, extension, fan lines, or arcs accordingly. The idea is that these Fibonacci levels may act as key turning points or areas of interest for traders.`,
        pointThree: `It's important to note that while the Fibonacci indicator is popular among traders, its effectiveness is subjective, and it should be used in conjunction with other technical analysis tools and indicators as part of a comprehensive trading strategy.`,
      },

      {
        name: "Relative strength index(RSI) and cheatsheet",
        link: `<iframe src="https://player.vimeo.com/video/569343872?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="rsi.mp4"></iframe>`,
        duration: `26:19 mins`,
        pointOne: `Relative Strength Index (RSI) is a momentum oscillator that measures the speed and change of price movements. RSI is a widely used technical indicator that helps traders identify overbought or oversold conditions in a market. The RSI is typically applied to individual assets or financial instruments, such as stocks, currencies, or commodities.`,
        pointTwo: `The RSI is typically plotted on a scale from 0 to 100. Traditionally, levels above 70 are considered overbought, suggesting that an asset may be due for a price correction or reversal. Conversely, levels below 30 are considered oversold, indicating that an asset may be undervalued and due for a potential upward reversal. RSI divergence occurs when the price of an asset and the RSI indicator move in opposite directions. This can signal a potential change in the direction of the price trend.`,
        pointThree: `Traders use the RSI to generate buy or sell signals, identify potential trend reversals, and assess the overall strength of a trend. It is important to note that while the RSI can be a valuable tool, it is not foolproof, and traders often use it in conjunction with other technical indicators and analysis methods to make well-informed trading decisions.`,
      },

      {
        name: "Moving averages(9ma, 20ma, 50ma) and cheatsheet",
        link: `<iframe src="https://player.vimeo.com/video/570259632?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="movingaverages.mp4"></iframe>`,
        duration: `17:26 mins`,
        pointOne: `Moving averages are widely used technical indicators that smooth out price data over a specified period to identify trends and potential reversal points in financial markets. A moving average is calculated by taking the average price of an asset over a defined number of periods, updating as new data becomes available.`,
        pointTwo: `Moving average crossovers are often used to generate buy or sell signals. A bullish crossover occurs when a shorter-term moving average crosses above a longer-term moving average, suggesting a potential upward trend. Conversely, a bearish crossover occurs when a shorter-term moving average crosses below a longer-term moving average, indicating a potential downward trend.`,
        pointThree: `Moving averages are versatile tools that can be applied to various timeframes, from short-term intraday charts to long-term weekly or monthly charts. They are essential for trend analysis and are often used in combination with other technical indicators to make well-informed trading decisions.`,
      },
    ];

    const patternsContent = [
      {
        name: "What are patterns ?",
        link: `<iframe src="https://player.vimeo.com/video/570620188?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="whatarepatterns.mp4"></iframe>`,
        duration: `07:27 mins`,
        pointOne: `Patterns refer to recognizable formations or configurations on price charts that traders use to make predictions about future price movements.`,
        pointTwo: `These patterns are based on the idea that historical price movements tend to repeat themselves, and traders can gain insights into potential future price directions by identifying and understanding these patterns.`,
        pointThree: `Technical analysts often rely on chart patterns to make informed decisions about buying or selling assets.`,
      },
      {
        name: "Triangle patterns and cheatsheet",
        link: `<iframe src="https://player.vimeo.com/video/572600695?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="trianglepattern.mp4"></iframe>`,
        duration: `58:42 mins`,
        pointOne: `Triangle pattern is a technical analysis pattern that can be formed on price charts. Triangle patterns are typically continuation patterns, indicating that the existing trend is likely to continue after a period of consolidation or indecision. There are three main types of triangle patterns: ascending triangles, descending triangles, and symmetrical triangles.`,
        pointTwo: `Traders often use triangle patterns as potential signals for future price movements. The breakout direction (up or down) is crucial in determining the likely trend continuation. Typically, traders wait for the price to break above the upper trendline in an ascending triangle or below the lower trendline in a descending triangle to confirm the pattern.`,
        pointThree: `It's important to note that while triangle patterns can be useful, they should not be used in isolation, and other technical indicators and analysis tools should be considered for a comprehensive understanding of market conditions. Additionally, false breakouts can occur, so risk management strategies are essential for successful trading.`,
      },
      {
        name: "Channel patterns and cheatsheet",
        link: `<iframe src="https://player.vimeo.com/video/572089542?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="channelpattern"></iframe>`,
        duration: `30:24 mins`,
        pointOne: `Channel pattern refers to a technical analysis pattern that is formed by two parallel trendlines, one representing a line of support and the other a line of resistance. The price of an asset tends to oscillate between these two trendlines, creating a channel-like structure on the price chart. Channel patterns can provide traders with insights into potential future price movements and trends.`,
        pointTwo: `Channels can provide traders with potential entry and exit points based on the interaction of the price with the trendlines. Traders often look for buying opportunities near the lower trendline in an ascending channel and selling opportunities near the upper trendline in a descending channel.`,
        pointThree: `It's important to note that channels, like other technical patterns, should be used in conjunction with other technical analysis tools and indicators for a more comprehensive analysis. Additionally, traders should be cautious of false breakouts or breakdowns and consider implementing risk management strategies to mitigate potential losses.`,
      },
      {
        name: "Flag patterns and cheatsheet",
        link: `<iframe src="https://player.vimeo.com/video/573012599?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="flagpattern.mp4"></iframe>`,
        duration: `20:31 mins`,
        pointOne: `Flag pattern is a technical analysis pattern that is considered a continuation pattern. It is named "flag" due to its visual resemblance to a flag on a flagpole. The pattern consists of a sharp, strong price movement (referred to as the "flagpole") followed by a consolidation phase (the "flag") that is usually characterized by a rectangular-shaped price range.`,
        pointTwo: `Traders often look for specific entry and exit points based on the breakout direction of the flag pattern. A breakout above the upper boundary of the flag in a bullish flag or below the lower boundary in a bearish flag is considered a signal for a potential continuation of the trend.`,
        pointThree: `As with any technical analysis pattern, it's essential for traders to use flags in conjunction with other indicators and tools to confirm signals and manage risk effectively. False breakouts can occur, so risk management is crucial in trading flag patterns.`,
      },
      {
        name: "Wedge patterns and cheatsheet",
        link: `<iframe src="https://player.vimeo.com/video/572993127?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="wedgepattern.mp4"></iframe>`,
        duration: `33:05 mins`,
        pointOne: `Wedge pattern is a technical analysis pattern characterized by converging trendlines that form a wedge shape on a price chart. Wedge patterns are typically considered reversal patterns, meaning they may signal a potential change in the existing trend. There are two main types of wedge patterns: rising wedge and falling wedge.`,
        pointTwo: `Wedge patterns are often associated with decreasing volatility as the price approaches the apex (the point where the two trendlines converge). Traders use wedge patterns to anticipate potential breakout or breakdown points, indicating the start of a new trend.`,
        pointThree: `It's important to note that not all wedge patterns result in a reversal, and false breakouts or breakdowns can occur. Therefore, traders often use additional technical indicators and analysis tools to confirm signals and manage risks. As with any trading pattern, risk management strategies are crucial to mitigate potential losses.`,
      },
      {
        name: "Double top pattern and cheatsheet",
        link: `<iframe src="https://player.vimeo.com/video/570623906?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="doubletop.mp4"></iframe>`,
        duration: `29:11 mins`,
        pointOne: `Double top pattern is a technical analysis pattern that signals a potential trend reversal. It is considered a bearish reversal pattern and typically forms at the end of an uptrend. The double top pattern is characterized by two peaks (highs) at approximately the same price level, separated by a trough or a pullback between them. The pattern resembles the letter "M" on a price chart.`,
        pointTwo: `Traders often use the height of the pattern (distance from the peaks to the trough) to estimate the potential downside target once the pattern is confirmed.`,
        pointThree: `It's important to note that while the double top pattern is a widely recognized reversal pattern, traders should always exercise caution and use other technical indicators or analysis tools to confirm signals. False breakouts or breakdowns can occur, and risk management strategies are crucial in trading to minimize potential losses. Additionally, the double top pattern is just one of many patterns and signals that traders use to make informed decisions in the financial markets.`,
      },
      {
        name: "Double bottom pattern and cheatsheet",
        link: `<iframe src="https://player.vimeo.com/video/570871363?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%"width="100%" height="100%" title="doublebottom.mp4"></iframe>`,
        duration: `18:08 mins`,
        pointOne: ` double bottom pattern is a technical analysis pattern that signals a potential trend reversal. It is considered a bullish reversal pattern and typically forms at the end of a downtrend. The double bottom pattern is characterized by two troughs or lows at approximately the same price level, separated by a peak or a rally between them. The pattern resembles the letter "W" on a price chart.`,
        pointTwo: `Traders often use the height of the pattern (distance from the troughs to the peak) to estimate the potential upside target once the pattern is confirmed.`,
        pointThree: `As with any technical analysis pattern, traders should exercise caution and use other technical indicators or analysis tools to confirm signals. False breakouts or breakdowns can occur, and risk management strategies are crucial in trading to minimize potential losses. The double bottom pattern is just one of many patterns and signals that traders use to make informed decisions in the financial markets.`,
      },
      {
        name: "Head & Shoulder pattern and cheatsheet",
        link: `<iframe src="https://player.vimeo.com/video/570877359?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="headandshoulder.mp4"></iframe>`,
        duration: `24:42 mins`,
        pointOne: `Head and Shoulders pattern is a significant and widely recognized technical analysis pattern that is often considered a reversal pattern. It typically forms after an uptrend and signals a potential trend reversal to the downside. The pattern is named for its appearance, which resembles a human head and shoulders.`,
        pointTwo: `It's important to note that the Head and Shoulders pattern is considered a reliable reversal pattern, but like any technical analysis tool, it is not foolproof. Traders often use other technical indicators and analysis tools to confirm signals and manage risks. Additionally, false breakouts or breakdowns can occur, emphasizing the importance of risk management in trading.`,
        pointThree: `There is also an inverse pattern called the Inverse Head and Shoulders, which is a bullish reversal pattern that forms after a downtrend and signals a potential upward reversal.`,
      },
      {
        name: "Inverse Head & Shoulder pattern and cheatsheet",
        link: `<iframe src="https://player.vimeo.com/video/571198150?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="inverseheadandshoulder.mp4"></iframe>`,
        duration: `21:17 mins`,
        pointOne: `Inverse Head and Shoulders pattern is a significant and widely recognized technical analysis pattern that is considered a reversal pattern. It typically forms after a downtrend and signals a potential trend reversal to the upside. The pattern is the opposite of the regular Head and Shoulders pattern and is named for its appearance, which resembles an inverted human head and shoulders.`,
        pointTwo: `Similar to the regular Head and Shoulders pattern, the Inverse Head and Shoulders pattern is considered a reliable reversal pattern. Traders often use other technical indicators and analysis tools to confirm signals and manage risks.`,
        pointThree: `False breakouts or breakdowns can occur, so it's essential for traders to exercise caution and use risk management strategies when incorporating this pattern into their trading decisions.`,
      },
      {
        name: "Major patterns for living",
        link: `<iframe src="https://player.vimeo.com/video/584169814?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="majorpatternsforliving.mp4"></iframe>`,
        duration: `19:32 mins`,
        pointOne: `Patterns refer to recognizable formations or configurations on price charts that traders use to make predictions about future price movements.`,
        pointTwo: `These patterns are based on the idea that historical price movements tend to repeat themselves, and traders can gain insights into potential future price directions by identifying and understanding these patterns.`,
        pointThree: `Technical analysts often rely on chart patterns to make informed decisions about buying or selling assets.`,
      },
    ];

    const strategiesContent = [
      {
        name: "Strategies for intraday",
        link: `<iframe src="https://player.vimeo.com/video/602369465?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="strategy for intraday.mp4"></iframe>`,
        duration: `1:29:37 mins`,
        pointOne: `Intraday trading refers to buying and selling financial instruments within the same trading day. Intraday traders aim to capitalize on short-term price movements and typically do not hold positions overnight. Various intraday strategies are employed by traders to navigate the fast-paced and volatile nature of intraday markets.`,
        pointTwo: `It's important to note that intraday trading carries inherent risks due to the short time frames involved and the potential for rapid market movements.`,
        pointThree: `Traders should use risk management strategies, set stop-loss orders, and stay informed about market conditions to improve their chances of success. Additionally, selecting the right strategy often depends on individual preferences, risk tolerance, and market conditions.`,
      },
      {
        name: "Strategies for swing",
        link: `<iframe src="https://player.vimeo.com/video/602418572?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="strategy for swing1.mp4"></iframe>`,
        duration: `1:15:27 mins`,
        pointOne: `Swing trading is a style of trading that aims to capture short to medium-term price movements within a larger trend. Unlike day trading, swing trading involves holding positions for more than one trading day but typically for a shorter duration compared to longer-term investments.`,
        pointTwo: `Swing trading requires a combination of technical analysis, risk management, and market awareness. Traders need to be patient, as swing trades typically last several days to a few weeks.`,
        pointThree: `Additionally, it's crucial to use proper risk management techniques, including setting stop-loss orders and position sizing, to protect against adverse market movements.`,
      },
    ];

    const riskManagementContent = [
      {
        name: "what is Position sizing ?",
        link: `<iframe src="https://player.vimeo.com/video/574399962?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="positionsizing.mp4"></iframe>`,
        duration: `09:39 mins`,
        pointOne: `Position sizing is a critical component of risk management in trading. It refers to determining the amount of capital or the number of units (shares, contracts, lots, etc.) to invest or trade in a particular position. Proper position sizing helps traders control risk, manage their capital effectively, and avoid significant losses.`,
        pointTwo: `Before determining position size, traders need to assess their risk tolerance. This involves defining the maximum amount or percentage of their trading capital they are willing to risk on a single trade. The placement of a stop-loss order is crucial in position sizing. The stop-loss represents the maximum acceptable loss on a trade. Traders typically place it based on technical levels, volatility, or other relevant factors.`,
        pointThree: `Trade risk is the difference between the entry price and the stop-loss level. Traders may express this risk as a percentage of their trading capital. For example, if a trader is willing to risk 1% on a trade and the trade risk is $100, the position size would be adjusted accordingly. Traders should adapt their position sizes to changes in market conditions, volatility, and their own risk tolerance. As these factors evolve, so should the approach to position sizing.`,
      },
      {
        name: "Risk/Reward",
        link: `<iframe src="https://player.vimeo.com/video/574889659?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="riskmanagement.mp4"></iframe>`,
        duration: `09:56 mins`,
        pointOne: `Risk-reward ratio is a key concept in trading that compares the potential profit of a trade to the potential loss. It is a ratio that helps traders assess the potential return on investment relative to the amount of risk undertaken. The risk-reward ratio is expressed as a numerical value, typically as a ratio of the potential reward to the potential risk.`,
        pointTwo: `The risk-reward ratio is closely tied to risk management. By establishing a risk-reward ratio before entering a trade, traders can determine the appropriate position size and ensure that potential losses are limited to an acceptable level.`,
        pointThree: `It's important to note that a high risk-reward ratio alone does not guarantee success. Traders should also consider other factors, such as the probability of success, market conditions, and the overall trading strategy. The risk-reward ratio is a tool to assist in making informed decisions, but it should be used in conjunction with a comprehensive trading plan.`,
      },
    ];

    const bonusContent = [
      {
        name: "Breakout vs Fakeout",
        link: `<iframe src="https://player.vimeo.com/video/573612449?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="breakoutvsfakeout.mp4"></iframe>`,
        duration: `10:04 mins`,
        pointOne: `Breakouts and fakeouts are common occurrences in trading, particularly in technical analysis. Understanding these concepts is crucial for traders who aim to identify potential entry and exit points in the market.`,
        pointTwo: `A breakout occurs when the price of a financial instrument moves above or below a significant level of support or resistance. This movement is often accompanied by increased volume, signaling a potential change in the prevailing trend or the continuation of an existing one. Traders often see breakouts as opportunities to enter trades in the direction of the breakout.`,
        pointThree: `A fakeout, also known as a false breakout, occurs when the price briefly moves beyond a support or resistance level but then quickly reverses, failing to sustain the breakout. Fakeouts can trap traders who entered positions based on the initial breakout signal.`,
      },
      {
        name: "Perfect & Confluence entry",
        link: `<iframe src="https://player.vimeo.com/video/573614762?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="perfectandconfluenceentry.mp4"></iframe>`,
        duration: `27:25 mins`,
        pointOne: `Perfect entry refers to an entry point into a trade that aligns with a trader's analysis and strategy, providing a high probability of success. Achieving a perfect entry often involves identifying a confluence of multiple factors that support the trade idea.`,
        pointTwo: `Confluence refers to the coming together or convergence of different technical or fundamental elements that strengthen the conviction in a particular trade.`,
        pointThree: `Achieving a perfect entry with confluence involves a holistic approach to trading, considering a combination of technical, fundamental, and risk management factors. Traders often develop their unique trading plans and methodologies based on their preferences and experiences. Regularly reviewing and refining your approach is essential for long-term success in the markets.`,
      },
      {
        name: "Trail your trade",
        link: `<iframe src="https://player.vimeo.com/video/574388522?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="trailyourtrade.mp4"></iframe>`,
        duration: `21:18 mins`,
        pointOne: `Trailing a trade refers to adjusting the stop-loss level as the market price moves in a favorable direction. The purpose of trailing a trade is to lock in profits and protect against potential reversals while allowing the trade to capture additional gains. This technique is often used by traders to maximize returns during trending markets.`,
        pointTwo: `When entering a trade, traders set an initial stop-loss level. This stop-loss order is placed to limit potential losses in case the market moves against the trade. As the market price moves in the desired direction and generates profits, traders may adjust the stop-loss level to "trail" behind the current market price. The new stop-loss level is set at a predetermined distance from the current market price.`,
        pointThree: `Trailing a trade is a proactive approach to risk management and profit maximization. However, traders should be mindful of market conditions and use trailing stops in conjunction with other aspects of their trading strategy. It's important to strike a balance between locking in profits and giving the trade enough room to develop in line with the overall market trend.`,
      },
    ];
    res.status(200).json({
      basicsContent,
      coreContent,
      indicatorsContent,
      patternsContent,
      strategiesContent,
      riskManagementContent,
      bonusContent,
    });
  } catch (error) {
    console.error("courseContentFundamental", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const courseContentFundamentalPaid = async (req, res) => {
  try {
    const startContent = [
      {
        name: "Importance of Fundamental and Technical Analysis",
        link: `<iframe src="https://player.vimeo.com/video/914804308?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="1) Importance of Fundamental and Technical Analysis"></iframe>`,
        duration: `09:19 mins`,
        pointOne: `In this video, we dissect the core principles of fundamental analysis, providing viewers with a comprehensive understanding of how to assess the intrinsic value of investments.`,
        pointTwo: `Dive into an array of effective strategies aimed at fostering wealth creation, offering valuable insights and techniques to optimize investment portfolios and achieve financial goals.`,
        pointThree: `Uncover the critical importance of Compound Annual Growth Rate (CAGR) in evaluating investment performance, illuminating its role in measuring the compounded annual return over a specified period.`,
      },
      {
        name: "Learn to generate wealth using basic fundamental analysis concepts",
        link: `<iframe src="https://player.vimeo.com/video/914796121?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="2) Learn to generate wealth using basic fundamental analysis concepts"></iframe>`,
        duration: `07:12 mins`,
        pointOne: `Delve into the contrasting methodologies of fundamental and technical analysis, elucidating how each approach provides distinct perspectives on investment evaluation and decision-making.`,
        pointTwo: `Explore the synergistic effects of integrating fundamental and technical analysis, showcasing how combining these methodologies can lead to more informed investment decisions and robust risk management strategies.`,
        pointThree: `Unlock the potential of informed decision-making by understanding how the combination of fundamental and technical analysis offers a holistic view of market conditions, empowering investors to navigate uncertainties and seize opportunities effectively.`,
      },
      {
        name: "Does Investment Work with Fundamental Analysis",
        link: `<iframe src="https://player.vimeo.com/video/919137464?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="3) Does Investment Work with Fundamental Analysis"></iframe>`,
        duration: `08:03 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "Categories of fundamental analysis",
        link: `<iframe src="https://player.vimeo.com/video/916733335?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="4) Categories of fundamental analysis"></iframe>`,
        duration: `08:22 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "What is qualitative analysis ?",
        link: `<iframe src="https://player.vimeo.com/video/916733901?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="5) What is qualitative analysis"></iframe>`,
        duration: `17:36 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "How do I evaluate stocks using qualitative analysis ?",
        link: `<iframe src="https://player.vimeo.com/video/919138286?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="6) How do I evaluate stocks using qualitative analysis"></iframe>`,
        duration: `05:35 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "How do I evaluate stocks using qualitative analysis ?",
        link: `<iframe src="https://player.vimeo.com/video/919138286?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="6) How do I evaluate stocks using qualitative analysis"></iframe>`,
        duration: `05:35 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
    ];

    const coreContent = [
      {
        name: "Major key ratio in fundamental analysis",
        link: `<iframe src="https://player.vimeo.com/video/916735756?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="7) Majar key ratio in fundamental analysis"></iframe>`,
        duration: `06:16 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "6 important key ratio",
        link: `<iframe src="https://player.vimeo.com/video/916741668?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="8) 6 important key ratio"></iframe>`,
        duration: `03:13 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "What is stock pe and why pe is important ?",
        link: `<iframe src="https://player.vimeo.com/video/919138877?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="9) What is stock pe and why pe is important ?"></iframe>`,
        duration: `05:15 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "How to calculate PE ratio ?",
        link: `<iframe src="https://player.vimeo.com/video/919139235?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="10) How to calculate PE ratio ?"></iframe>`,
        duration: `12:29 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "What is book value and why book value is important ?",
        link: `<iframe src="https://player.vimeo.com/video/919140943?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="11) What is book value and why book value is important ?"></iframe>`,
        duration: `09:30 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "How to calculate book value ?",
        link: `<iframe src="https://player.vimeo.com/video/922292913?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="12) How to calculate book value ?"></iframe>`,
        duration: `09:18 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "What is dividend ?",
        link: `<iframe src="https://player.vimeo.com/video/922293418?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="13) What is dividend ?"></iframe>`,
        duration: `08:17 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "How to calculate dividend yield ?",
        link: `<iframe src="https://player.vimeo.com/video/922293546?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="14) How to calculate dividend yield ?"></iframe>`,
        duration: `04:41 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "What is Return-on-Equity ?",
        link: `<iframe src="https://player.vimeo.com/video/922293716?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="15) What is  Return-on-Equity ?"></iframe>`,
        duration: `05:43 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "How Return on equity is calculated ?",
        link: `<iframe src="https://player.vimeo.com/video/922293920?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="16) How Return on equity is calculated ?"></iframe>`,
        duration: `05:09 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "What is Roce ?",
        link: `<iframe src="https://player.vimeo.com/video/922294553?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="17) What is Roce ?"></iframe>`,
        duration: `03:25 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "How to calculate Roce ?",
        link: `<iframe src="https://player.vimeo.com/video/922306474?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="18)How to calculate Roce ?"></iframe>`,
        duration: `05:13 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "What is Debt-to-Equity Ratio ?",
        link: `<iframe src="https://player.vimeo.com/video/925260337?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="19)What is Debt-to-Equity Ratio ?"></iframe>`,
        duration: `03:21 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "How to do Debt-To-Equity Ratio calculation ?",
        link: `<iframe src="https://player.vimeo.com/video/925260507?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="20)How to do Debt-To-Equity Ratio calculation ?"></iframe>`,
        duration: `05:14 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
    ];
    res.status(200).json({
      startContent,
      coreContent,
    });
  } catch (error) {
    console.error("courseContentFundamentalPaidError", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const courseContentFundamentalPaidWeb = async (req, res) => {
  try {
    const startContent = [
      {
        name: "Importance of Fundamental and Technical Analysis",
        link: `<iframe src="https://player.vimeo.com/video/914804308?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="1) Importance of Fundamental and Technical Analysis"></iframe>`,
        duration: `09:19 mins`,
        pointOne: `In this video, we dissect the core principles of fundamental analysis, providing viewers with a comprehensive understanding of how to assess the intrinsic value of investments.`,
        pointTwo: `Dive into an array of effective strategies aimed at fostering wealth creation, offering valuable insights and techniques to optimize investment portfolios and achieve financial goals.`,
        pointThree: `Uncover the critical importance of Compound Annual Growth Rate (CAGR) in evaluating investment performance, illuminating its role in measuring the compounded annual return over a specified period.`,
      },
      {
        name: "Learn to generate wealth using basic fundamental analysis concepts",
        link: `<iframe src="https://player.vimeo.com/video/914796121?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="2) Learn to generate wealth using basic fundamental analysis concepts"></iframe>`,
        duration: `07:12 mins`,
        pointOne: `Delve into the contrasting methodologies of fundamental and technical analysis, elucidating how each approach provides distinct perspectives on investment evaluation and decision-making.`,
        pointTwo: `Explore the synergistic effects of integrating fundamental and technical analysis, showcasing how combining these methodologies can lead to more informed investment decisions and robust risk management strategies.`,
        pointThree: `Unlock the potential of informed decision-making by understanding how the combination of fundamental and technical analysis offers a holistic view of market conditions, empowering investors to navigate uncertainties and seize opportunities effectively.`,
      },
      {
        name: "Does Investment Work with Fundamental Analysis",
        link: `<iframe src="https://player.vimeo.com/video/919137464?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="3) Does Investment Work with Fundamental Analysis"></iframe>`,
        duration: `08:03 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "Categories of fundamental analysis",
        link: `<iframe src="https://player.vimeo.com/video/916733335?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="4) Categories of fundamental analysis"></iframe>`,
        duration: `08:22 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "What is qualitative analysis ?",
        link: `<iframe src="https://player.vimeo.com/video/916733901?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="5) What is qualitative analysis"></iframe>`,
        duration: `17:36 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "How do I evaluate stocks using qualitative analysis ?",
        link: `<iframe src="https://player.vimeo.com/video/919138286?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="6) How do I evaluate stocks using qualitative analysis"></iframe>`,
        duration: `05:35 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
    ];

    const coreContent = [
      {
        name: "Major key ratio in fundamental analysis",
        link: `<iframe src="https://player.vimeo.com/video/916735756?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="7) Majar key ratio in fundamental analysis"></iframe>`,
        duration: `06:16 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "6 important key ratio",
        link: `<iframe src="https://player.vimeo.com/video/916741668?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="8) 6 important key ratio"></iframe>`,
        duration: `03:13 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "What is stock pe and why pe is important ?",
        link: `<iframe src="https://player.vimeo.com/video/919138877?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="9) What is stock pe and why pe is important ?"></iframe>`,
        duration: `05:15 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "How to calculate PE ratio ?",
        link: `<iframe src="https://player.vimeo.com/video/919139235?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="10) How to calculate PE ratio ?"></iframe>`,
        duration: `12:29 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "What is book value and why book value is important ?",
        link: `<iframe src="https://player.vimeo.com/video/919140943?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="11) What is book value and why book value is important ?"></iframe>`,
        duration: `09:30 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "How to calculate book value ?",
        link: `<iframe src="https://player.vimeo.com/video/922292913?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="12) How to calculate book value ?"></iframe>`,
        duration: `09:18 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "What is dividend ?",
        link: `<iframe src="https://player.vimeo.com/video/922293418?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="13) What is dividend ?"></iframe>`,
        duration: `08:17 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "How to calculate dividend yield ?",
        link: `<iframe src="https://player.vimeo.com/video/922293546?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="14) How to calculate dividend yield ?"></iframe>`,
        duration: `04:41 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "What is Return-on-Equity ?",
        link: `<iframe src="https://player.vimeo.com/video/922293716?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="15) What is  Return-on-Equity ?"></iframe>`,
        duration: `05:43 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "How Return on equity is calculated ?",
        link: `<iframe src="https://player.vimeo.com/video/922293920?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="16) How Return on equity is calculated ?"></iframe>`,
        duration: `05:09 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "What is Roce ?",
        link: `<iframe src="https://player.vimeo.com/video/922294553?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="17) What is Roce ?"></iframe>`,
        duration: `03:25 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "How to calculate Roce ?",
        link: `<iframe src="https://player.vimeo.com/video/922306474?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="18)How to calculate Roce ?"></iframe>`,
        duration: `05:13 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "What is Debt-to-Equity Ratio ?",
        link: `<iframe src="https://player.vimeo.com/video/925260337?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="19)What is Debt-to-Equity Ratio ?"></iframe>`,
        duration: `03:21 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "How to do Debt-To-Equity Ratio calculation ?",
        link: `<iframe src="https://player.vimeo.com/video/925260507?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="20)How to do Debt-To-Equity Ratio calculation ?"></iframe>`,
        duration: `05:14 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
    ];
    res.status(200).json({
      startContent,
      coreContent,
    });
  } catch (error) {
    console.error("courseContentFundamentalPaidError", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const courseContentFundamentalFree = async (req, res) => {
  try {
    const startContent = [
      {
        name: "Introduction to the Market - 1",
        link: `<iframe src="https://player.vimeo.com/video/914875968?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="1) Introduction to the Market - 1"></iframe>`,
        duration: `17:00 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "Introduction to the Market - 2",
        link: `<iframe src="https://player.vimeo.com/video/925260798?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="2) Introduction to the market - 2"></iframe>`,
        duration: `16:32 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "The untold story of  the Stock Market in India",
        link: `<iframe src="https://player.vimeo.com/video/925260951?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="3) The untold story of  the Stock Market in India"></iframe>`,
        duration: `01:38 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "How indian stock market works ?",
        link: `<iframe src="https://player.vimeo.com/video/926795186?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="4)How indian stock market works ?"></iframe>`,
        duration: `05:55 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "The inside market series",
        link: `<iframe src="https://player.vimeo.com/video/925261547?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="5) The inside market series"></iframe>`,
        duration: `01:19 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
    ];

    const coreContent = [
      {
        name: "Why do companies get listed on the stock market ?",
        link: ``,
        duration: `10:00 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "What is primary market & secondary market ?",
        link: `<iframe src="https://player.vimeo.com/video/926795967?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="7) what is  primary market &amp; secondary market ?"></iframe>`,
        duration: `04:11 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "What is NSE & BSE ?",
        link: `<iframe src="https://player.vimeo.com/video/926798205?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="8) What is NSE &amp; BSE ?"></iframe>`,
        duration: `04:53 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "Types of investors in stock market",
        link: ``,
        duration: `07:01 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "Don't be IGF",
        link: `<iframe src="https://player.vimeo.com/video/925261875?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="10) Don't be IGF"></iframe>`,
        duration: `07:01 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "How to analyze stocks like a pro ?",
        link: ``,
        duration: `10:35 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "Trading vs Investment",
        link: `<iframe src="https://player.vimeo.com/video/926744718?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="12) Trading vs Investment"></iframe>`,
        duration: `06:57 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "What is Demat and Trading Account ?",
        link: `<iframe src="https://player.vimeo.com/video/926741148?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="13)  What is Demat and Trading Account ?"></iframe>`,
        duration: `06:35 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "Mandatory tools for every stock market investor",
        link: `<iframe src="https://player.vimeo.com/video/926735291?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="14) Mandatory tools for every stock market investor"></iframe>`,
        duration: `05:39 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
    ];
    console.log("free", startContent);
    res.status(200).json({
      startContent,
      coreContent,
    });
  } catch (error) {
    console.error("courseContentFundamentalPaidError", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const courseContentFundamentalFreeWeb = async (req, res) => {
  try {
    const startContent = [
      {
        name: "Introduction to the Market - 1",
        link: `<iframe src="https://player.vimeo.com/video/914875968?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="1) Introduction to the Market - 1"></iframe>`,
        duration: `17:00 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "Introduction to the Market - 2",
        link: `<iframe src="https://player.vimeo.com/video/925260798?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="2) Introduction to the market - 2"></iframe>`,
        duration: `16:32 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "The untold story of  the Stock Market in India",
        link: `<iframe src="https://player.vimeo.com/video/925260951?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="3) The untold story of  the Stock Market in India"></iframe>`,
        duration: `01:38 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "How indian stock market works ?",
        link: `<iframe src="https://player.vimeo.com/video/926795186?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="4)How indian stock market works ?"></iframe>`,
        duration: `05:55 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "The inside market series",
        link: `<iframe src="https://player.vimeo.com/video/925261547?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="5) The inside market series"></iframe>`,
        duration: `01:19 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
    ];

    const coreContent = [
      {
        name: "Why do companies get listed on the stock market ?",
        link: ``,
        duration: `10:00 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "What is primary market & secondary market ?",
        link: `<iframe src="https://player.vimeo.com/video/926795967?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="7) what is  primary market &amp; secondary market ?"></iframe>`,
        duration: `04:11 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "What is NSE & BSE ?",
        link: `<iframe src="https://player.vimeo.com/video/926798205?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="8) What is NSE &amp; BSE ?"></iframe>`,
        duration: `04:53 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "Types of investors in stock market",
        link: ``,
        duration: `07:01 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "Don't be IGF",
        link: `<iframe src="https://player.vimeo.com/video/925261875?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="10) Don't be IGF"></iframe>`,
        duration: `07:01 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "How to analyze stocks like a pro ?",
        link: ``,
        duration: `10:35 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "Trading vs Investment",
        link: `<iframe src="https://player.vimeo.com/video/926744718?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="12) Trading vs Investment"></iframe>`,
        duration: `06:57 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "What is Demat and Trading Account ?",
        link: `<iframe src="https://player.vimeo.com/video/926741148?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="13)  What is Demat and Trading Account ?"></iframe>`,
        duration: `06:35 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
      {
        name: "Mandatory tools for every stock market investor",
        link: `<iframe src="https://player.vimeo.com/video/926735291?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" width="100%" height="100%" title="14) Mandatory tools for every stock market investor"></iframe>`,
        duration: `05:39 mins`,
        pointOne: ``,
        pointTwo: ``,
        pointThree: ``,
      },
    ];
    console.log("free", startContent);
    res.status(200).json({
      startContent,
      coreContent,
    });
  } catch (error) {
    console.error("courseContentFundamentalPaidError", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  courseContentTechnical,
  courseContentTechnicalWeb,
  courseContentFundamentalPaid,
  courseContentFundamentalPaidWeb,
  courseContentFundamentalFree,
  courseContentFundamentalFreeWeb,
};
