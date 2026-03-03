import type {
  ParsedValidation,
  ValidationOperator,
} from '@/types/questionnaire';

const PATTERN = /^(<=|<|=|>=|>)(\d+)$/;

export function parseValidation(raw: string): ParsedValidation | null {
  const match = raw.match(PATTERN);
  if (!match) return null;

  return {
    operator: match[1] as ValidationOperator,
    value: Number(match[2]),
  };
}

export function needsFollowUp(
  rating: number,
  validation: ParsedValidation,
): boolean {
  switch (validation.operator) {
    case '<=':
      return rating <= validation.value;
    case '<':
      return rating < validation.value;
    case '=':
      return rating === validation.value;
    case '>=':
      return rating >= validation.value;
    case '>':
      return rating > validation.value;
  }
}
