# Nango MCP Client Example

This repository demonstrates how to connect any Large Language Model (LLM) provider to the Nango Model Context Protocol (MCP) server using [Vercel's AI SDK](https://ai-sdk.dev/docs/introduction). It provides a simple interactive CLI interface for sending messages to the LLM with tool-calling capabilities via the MCP protocol.

## Overview

The project creates a conversation interface that:

- Connects to the Nango MCP server
- Enables LLM tool-calling capabilities via the MCP protocol
- Uses OpenAI models through Vercel's AI SDK
- Provides a streaming interface for real-time responses

## Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- OpenAI API key

## Setup Instructions

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/nango-mcp-client-example.git
   cd nango-mcp-client-example
   ```

2. Copy the environment variables example file:

   ```sh
   cp .env.example .env
   ```

3. Configure your `.env` file with the following:

   ```
   OPENAI_API_KEY=your_openai_api_key
   NANGO_SECRET_KEY_DEV=your_nango_secret_key
   CONNECTION_ID=your_connection_id
   INTEGRATION_ID=your_integration_id
   ```

4. Install dependencies:

   ```sh
   npm install
   ```

5. Start the application:
   ```sh
   npm start
   ```

## Usage

Once running, you can interact with the CLI:

- Type messages to send to the LLM
- Watch real-time responses with tool-calling capabilities
- Type `exit` to end the session
