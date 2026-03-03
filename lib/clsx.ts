export function clsx(
  ...classes: (string | false | undefined | null)[]
): string {
  return classes.filter(Boolean).join(' ');
}
