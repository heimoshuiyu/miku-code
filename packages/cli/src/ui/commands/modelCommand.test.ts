/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { modelCommand } from './modelCommand.js';
import { MessageType } from '../types.js';
import { Config } from '@qwen-code/qwen-code-core';
import { createMockCommandContext } from '../../test-utils/mockCommandContext.js';

// Mock Config class
const createMockConfig = (
  getModelValue: string,
  setModelFn?: (newModel: string) => void,
) =>
  ({
    getModel: vi.fn<() => string>().mockReturnValue(getModelValue),
    setModel: vi.fn<(newModel: string) => void>(setModelFn || vi.fn()),
  }) as unknown as Config;

describe('modelCommand', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset environment variables
    delete process.env['OPENAI_MODEL'];
  });

  it('should show current model when no arguments provided', () => {
    const mockConfig = createMockConfig('qwen3-coder-plus');
    const context = createMockCommandContext({
      services: { config: mockConfig },
    });

    if (!modelCommand.action) throw new Error('Command has no action');
    modelCommand.action(context, '');

    expect(context.ui.addItem).toHaveBeenCalledWith(
      {
        type: MessageType.INFO,
        text: 'Current model: qwen3-coder-plus (using default)',
      },
      expect.any(Number),
    );
  });

  it('should show current model with OPENAI_MODEL when set', () => {
    process.env['OPENAI_MODEL'] = 'custom-model';
    const mockConfig = createMockConfig('custom-model');
    const context = createMockCommandContext({
      services: { config: mockConfig },
    });

    if (!modelCommand.action) throw new Error('Command has no action');
    modelCommand.action(context, '');

    expect(context.ui.addItem).toHaveBeenCalledWith(
      {
        type: MessageType.INFO,
        text: 'Current model: custom-model (OPENAI_MODEL: custom-model)',
      },
      expect.any(Number),
    );
  });

  it('should change model when user provides a model name', () => {
    const mockConfig = createMockConfig('qwen3-coder-plus');
    const context = createMockCommandContext({
      services: { config: mockConfig },
    });

    if (!modelCommand.action) throw new Error('Command has no action');
    modelCommand.action(context, 'new-model');

    expect(mockConfig.setModel).toHaveBeenCalledWith('new-model');
    expect(context.ui.addItem).toHaveBeenCalledWith(
      {
        type: MessageType.INFO,
        text: 'Model changed to: new-model',
      },
      expect.any(Number),
    );
  });

  it('should show error when config is not available', () => {
    const context = createMockCommandContext({
      services: { config: null },
    });

    if (!modelCommand.action) throw new Error('Command has no action');
    modelCommand.action(context, '');

    expect(context.ui.addItem).toHaveBeenCalledWith(
      {
        type: MessageType.ERROR,
        text: 'Configuration not available.',
      },
      expect.any(Number),
    );
  });

  it('should handle setModel errors gracefully', () => {
    const mockConfig = createMockConfig('qwen3-coder-plus', () => {
      throw new Error('Model not found');
    });
    const context = createMockCommandContext({
      services: { config: mockConfig },
    });

    if (!modelCommand.action) throw new Error('Command has no action');
    modelCommand.action(context, 'invalid-model');

    expect(context.ui.addItem).toHaveBeenCalledWith(
      {
        type: MessageType.ERROR,
        text: 'Failed to change model: Model not found',
      },
      expect.any(Number),
    );
  });
});
