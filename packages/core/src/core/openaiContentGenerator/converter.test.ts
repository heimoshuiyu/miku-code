/**
 * @license
 * Copyright 2025 Qwen
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { OpenAIContentConverter } from './converter.js';
import { StreamingToolCallParser } from './streamingToolCallParser.js';
import { Config } from '../../config/config.js';

describe('OpenAIContentConverter', () => {
  let converter: OpenAIContentConverter;
  let mockConfig: Config;

  beforeEach(() => {
    // Create a mock Config object for testing
    mockConfig = {
      getEnableSystemMessage: () => false,
    } as unknown as Config;

    converter = new OpenAIContentConverter('test-model', mockConfig);
  });

  describe('resetStreamingToolCalls', () => {
    it('should clear streaming tool calls accumulator', () => {
      // Access private field for testing
      const parser = (
        converter as unknown as {
          streamingToolCallParser: StreamingToolCallParser;
        }
      ).streamingToolCallParser;

      // Add some test data to the parser
      parser.addChunk(0, '{"arg": "value"}', 'test-id', 'test-function');
      parser.addChunk(1, '{"arg2": "value2"}', 'test-id-2', 'test-function-2');

      // Verify data is present
      expect(parser.getBuffer(0)).toBe('{"arg": "value"}');
      expect(parser.getBuffer(1)).toBe('{"arg2": "value2"}');

      // Call reset method
      converter.resetStreamingToolCalls();

      // Verify data is cleared
      expect(parser.getBuffer(0)).toBe('');
      expect(parser.getBuffer(1)).toBe('');
    });

    it('should be safe to call multiple times', () => {
      // Call reset multiple times
      converter.resetStreamingToolCalls();
      converter.resetStreamingToolCalls();
      converter.resetStreamingToolCalls();

      // Should not throw any errors
      const parser = (
        converter as unknown as {
          streamingToolCallParser: StreamingToolCallParser;
        }
      ).streamingToolCallParser;
      expect(parser.getBuffer(0)).toBe('');
    });

    it('should be safe to call on empty accumulator', () => {
      // Call reset on empty accumulator
      converter.resetStreamingToolCalls();

      // Should not throw any errors
      const parser = (
        converter as unknown as {
          streamingToolCallParser: StreamingToolCallParser;
        }
      ).streamingToolCallParser;
      expect(parser.getBuffer(0)).toBe('');
    });
  });
});
