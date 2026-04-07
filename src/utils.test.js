import { expect, test, describe } from 'vitest'
import { getDaysUntilDeadline, getPriorityColor } from './utils'

describe('Logic Tests for UniDone', () => {
  test('коректно розраховує дні до майбутнього дедлайну', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    expect(getDaysUntilDeadline(futureDate)).toBe(5);
  });

  test('повертає 0, якщо дедлайн сьогодні', () => {
    const today = new Date();
    expect(getDaysUntilDeadline(today)).toBe(0);
  });

  test('коректно визначає кольори пріоритетів', () => {
    expect(getPriorityColor('high')).toBe('red');
    expect(getPriorityColor('low')).toBe('green');
    expect(getPriorityColor('unknown')).toBe('gray');
  });
});