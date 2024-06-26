/**
 * Looks for a variable value that doesn't include a fallback and automatically adds one if found in
 * the current cache of names. This allows fallbacks to be automatically included in environments
 * without the names defined. This is most useful for Storybook or other sandboxes that may not have
 * CSS Variables defined. The fallbacks will allow the UI to look correct without additional setup.
 * Fallbacks come from the `fallbackFiles` transform configuration.
 */
export function getFallbackVariable(
  variableName: string,
  names: Record<string, string>
): string | undefined {
  const variable = variableName.includes('var(') ? variableName : names[variableName];
  if (variable && variable.includes('var(')) {
    return variable.replace(
      /(var\(([A-Za-z0-9\-_]+)\))/,
      (
        /** matched substring "var(--var-name)" */ _,
        /** the full match of the first group "var(--var-name)" */ varMatch,
        /** the variable name  - match of the second group "--var-name" */ cssVarName
      ) => {
        const value = names[cssVarName];
        if (value && value.startsWith('var')) {
          return getFallbackVariable(value, names);
        }
        return value || varMatch;
      }
    );
  }
  if (variable) {
    return variable;
  }

  return;
}
