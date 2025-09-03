/**
 * @license
 * Copyright 2025 Qwen
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CommandKind,
  SlashCommand,
  SlashCommandActionReturn,
} from './types.js';

export const systemCommand: SlashCommand = {
  name: 'system',
  description: 'Control whether system messages are inserted in conversations',
  kind: CommandKind.BUILT_IN,
  subCommands: [
    {
      name: 'on',
      description: 'Enable system messages',
      kind: CommandKind.BUILT_IN,
      action: (context): SlashCommandActionReturn => {
        const config = context.services.config;
        if (config) {
          config.setEnableSystemMessage(true);
          return {
            type: 'message',
            messageType: 'info',
            content: 'System messages have been enabled.',
          };
        }
        return {
          type: 'message',
          messageType: 'error',
          content: 'Failed to enable system messages: config not available.',
        };
      },
    },
    {
      name: 'off',
      description: 'Disable system messages',
      kind: CommandKind.BUILT_IN,
      action: (context): SlashCommandActionReturn => {
        const config = context.services.config;
        if (config) {
          config.setEnableSystemMessage(false);
          return {
            type: 'message',
            messageType: 'info',
            content: 'System messages have been disabled.',
          };
        }
        return {
          type: 'message',
          messageType: 'error',
          content: 'Failed to disable system messages: config not available.',
        };
      },
    },
    {
      name: 'status',
      description: 'Show current system message status',
      kind: CommandKind.BUILT_IN,
      action: (context): SlashCommandActionReturn => {
        const config = context.services.config;
        if (config) {
          const isEnabled = config.getEnableSystemMessage();
          return {
            type: 'message',
            messageType: 'info',
            content: `System messages are currently ${isEnabled ? 'enabled' : 'disabled'}.`,
          };
        }
        return {
          type: 'message',
          messageType: 'error',
          content: 'Failed to get system message status: config not available.',
        };
      },
    },
  ],
};
