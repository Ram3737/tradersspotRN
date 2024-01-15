const mongoose = require("mongoose");

const courseContent = async (req, res) => {
  try {
    const basicsContent = [
      {
        name: "What is stock trading ?",
        link: `<iframe src="https://player.vimeo.com/video/887369863?badge=0&amp;autopause=0&amp;quality_selector=1&amp;player_id=0&amp;app_id=58479" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" title="stocktrading.mp4"></iframe>`,
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
        name: "What is a trendline, and how to draw a perfect trendline? ?",
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
        name: "What is volume profile, and how is it used ?",
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

    res.status(200).json({
      basicsContent,
      coreContent,
      indicatorsContent,
    });
  } catch (error) {
    console.error("courseContentError", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  courseContent,
};
