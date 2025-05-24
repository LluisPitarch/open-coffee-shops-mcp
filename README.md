# Open Coffee Shops MCP Server

A Model Context Protocol (MCP) server that finds independent coffee shops in any city using OpenStreetMap data. This server filters out franchise chains to help you discover local, independent coffee establishments.

## Features

- 🔍 Search for coffee shops in any city worldwide
- ☕ Filters out major franchise brands (Starbucks, Costa, etc.)
- 🏪 Returns only independent coffee shops
- 📍 Includes location data, opening hours, and contact information
- 🗺️ Uses OpenStreetMap's Overpass API for real-time data

## Installation

1. Clone this repository:

```bash
git clone https://github.com/LluisPitarch/open-coffee-shops-mcp.git
cd open-coffee-mcp
```

2. Install dependencies:

```bash
npm install
```

3. Run locally the project:

```bash
npm run dev
```

## Usage

### Standalone Testing

You can test the MCP server directly:

```bash
npm start
```

### MCP Client Integration

#### GitHub Copilot

To use this MCP server with GitHub Copilot, add the following configuration to your MCP settings:

```json
{
  "mcpServers": {
    "open-coffee-shops-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "tsx", "/path/to/your/open-coffee-mcp/src/index.ts"]
    }
  }
}
```

**Note:** Replace `/path/to/your/open-coffee-mcp/src/index.ts` with the actual absolute path to your `index.ts` file.

#### Claude Desktop

For Claude Desktop, add the configuration to your `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "open-coffee-shops-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "tsx", "/path/to/your/open-coffee-mcp/src/index.ts"]
    }
  }
}
```

## Available Tools

### `get_open_coffee_shops_of_the_city`

Searches for independent coffee shops in a specified city.

**Parameters:**

- `city` (string): The name of the city to search for coffee shops in

**Returns:**

- JSON array of coffee shop objects with details including:
  - Name and location
  - Opening hours
  - Address information
  - Contact details (if available)

**Example Usage:**

```
Find coffee shops in Dublin
```

## Configuration Files

The MCP configuration varies by client. For detailed setup instructions, refer to the official documentation:

- **GitHub Copilot MCP**: [GitHub Copilot MCP Documentation](https://docs.github.com/en/copilot/using-github-copilot/using-extensions/using-model-context-protocol-extensions)
- **Claude Desktop MCP**: [Claude MCP Documentation](https://modelcontextprotocol.io/quickstart/user)
- **General MCP Specification**: [MCP Official Docs](https://modelcontextprotocol.io/)

## Development

### Project Structure

```
open-coffee-mcp/
├── src/
│   └── index.ts          # Main MCP server implementation
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

### Building

```bash
npm run build
```

### Running in Development

```bash
npm run dev
```

## Dependencies

- `@modelcontextprotocol/sdk` - MCP SDK for server implementation
- `zod` - Schema validation
- `tsx` - TypeScript execution
- `typescript` - TypeScript compiler

## License

MIT License
