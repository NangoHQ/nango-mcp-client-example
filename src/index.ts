import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { experimental_createMCPClient as createMCPClient, streamText, Message, generateText } from 'ai';
import chalk from 'chalk';
import dotenv from 'dotenv';
import * as readline from 'readline/promises';
import { randomUUID } from 'crypto';
import { openai } from '@ai-sdk/openai';
dotenv.config();

async function main() {
  try {
    const mcpClient = await createMCPClient({
      transport: new StreamableHTTPClientTransport(new URL('https://api.nango.dev/mcp'), {
        requestInit: {
          headers: {
            'Authorization': `Bearer ${process.env.NANGO_SECRET_KEY_DEV}`,
            'connection-id': process.env.CONNECTION_ID || '',
            'provider-config-key': process.env.INTEGRATION_ID || '',
          },
        },
      })
    });

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const messages: Message[] = [];

    try {
      while (true) {
        const input = await rl.question('> ');

        if (input.trim().toLowerCase() === 'exit') {
          console.log('Exiting chat...');
          break;
        }

        messages.push({
          role: 'user',
          content: input,
          id: randomUUID(),
        });

        console.log(chalk.blue('\n[System] AI is responding...'));
        let fullResponse = '';

        const { fullStream } = await streamText({
          model: openai('gpt-4o-mini'),
          tools: await mcpClient.tools(), // You can add multiple clients: [...(await mcpClient1.tools()), ...(await mcpClient2.tools())]
          maxSteps: 5,
          messages,
        });

        for await (const chunk of fullStream) {
          switch (chunk.type) {
            case 'text-delta':
              process.stdout.write(chunk.textDelta);
              fullResponse += chunk.textDelta;
              break;
            case 'tool-call':
              console.log(chalk.blue(`\n[System] Calling tool: ${chunk.toolName}`));
              break;
            case 'tool-result':
              console.log(chalk.blue(`\n[System] Tool result:`, JSON.stringify(chunk.result, null, 2)));
              break;
          }
        }

        console.log('\n');

        messages.push({
          role: 'assistant',
          content: fullResponse,
          id: randomUUID(),
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      await mcpClient.close();
      rl.close();
    }
  } catch (error) {
    console.error(error);
  }
}

main();
