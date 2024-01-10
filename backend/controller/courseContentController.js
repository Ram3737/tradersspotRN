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
        name: "What is core ?",
        link: `<iframe src="https://player.vimeo.com/video/887369863?badge=0&amp;autopause=0&amp;quality_selector=1&amp;player_id=0&amp;app_id=58479" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" title="stocktrading.mp4"></iframe>`,
        duration: `15:29 mins`,
        pointOne: `Stock trading in India refers to the buying and selling of shares or stocks of publicly listed companies on stock exchanges such as the National Stock Exchange (NSE) and the Bombay Stock Exchange (BSE). It is a way for investors to participate in the financial markets, potentially earn returns, and become partial owners of the companies whose stocks they hold.`,
        pointTwo: `The two main stock exchanges in India are the National Stock Exchange (NSE) and the Bombay Stock Exchange (BSE). These exchanges provide a platform for buyers and sellers to trade stocks.`,
        pointThree: `Companies that wish to raise capital from the public can get their shares listed on stock exchanges. These listed companies then issue shares that investors can buy and sell on the open market.`,
      },
    ];

    res.status(200).json({
      basicsContent,
      coreContent,
    });
  } catch (error) {
    console.error("courseContentError", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  courseContent,
};
