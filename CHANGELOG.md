# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2024-10-18

### Added
- Initial release of GMO KLine MCP Server
- `get_klines` tool for fetching KLine (candlestick) data from GMO Coin FX API
- Support for multiple currency pairs (USD_JPY, EUR_JPY, GBP_JPY, AUD_JPY, NZD_JPY, CAD_JPY, CHF_JPY, EUR_USD, GBP_USD, AUD_USD)
- Support for BID and ASK price types
- Support for multiple intervals (1min, 5min, 10min, 15min, 30min, 1hour, 4hour, 8hour, 12hour, 1day, 1week, 1month)
- Parameter validation for date format based on interval
- Comprehensive documentation (README, SETUP, USAGE_EXAMPLES, TEST_RESULTS)
- MIT License

### Technical Details
- Model Context Protocol (MCP) v1.0 compliance
- Node.js implementation using @modelcontextprotocol/sdk
- Axios for HTTP requests to GMO Coin API
- No authentication required (public API)

[Unreleased]: https://github.com/Mako3333/gmo-kline-mcp/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Mako3333/gmo-kline-mcp/releases/tag/v1.0.0

