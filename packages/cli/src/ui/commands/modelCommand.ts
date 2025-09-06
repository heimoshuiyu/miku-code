/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { MessageType } from '../types.js';
import {
  type CommandContext,
  type SlashCommand,
  CommandKind,
} from './types.js';

export const modelCommand: SlashCommand = {
  name: 'model',
  description:
    'View or change the current AI model. Usage: /model [model-name]',
  kind: CommandKind.BUILT_IN,
  action: (context: CommandContext, args: string) => {
    const config = context.services.config;
    if (!config) {
      context.ui.addItem(
        {
          type: MessageType.ERROR,
          text: 'Configuration not available.',
        },
        Date.now(),
      );
      return;
    }

    // If no arguments provided, show current model
    if (!args.trim()) {
      const currentModel = config.getModel();
      const openaiModel = process.env['OPENAI_MODEL'];

      let statusText = `Current model: ${currentModel}`;
      if (openaiModel) {
        statusText += ` (OPENAI_MODEL: ${openaiModel})`;
      } else {
        statusText += ' (using default)';
      }

      context.ui.addItem(
        {
          type: MessageType.INFO,
          text: statusText,
        },
        Date.now(),
      );
      return;
    }

    // Set new model - directly use what the user typed
    const newModel = args.trim();

    // Set the new model
    try {
      config.setModel(newModel);
      context.ui.addItem(
        {
          type: MessageType.INFO,
          text: `Model changed to: ${newModel}`,
        },
        Date.now(),
      );
    } catch (error) {
      context.ui.addItem(
        {
          type: MessageType.ERROR,
          text: `Failed to change model: ${error instanceof Error ? error.message : String(error)}`,
        },
        Date.now(),
      );
    }
  },
};
