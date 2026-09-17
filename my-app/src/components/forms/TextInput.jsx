// Reusable input for teaching React forms.
// Standard way = controlled component: value comes from state, onChange updates state.
const TextInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error = "",
  placeholder = "",
  autoComplete = "off",
  rightSlot = null, // e.g. password show/hide button
}) => {
  const inputId = `input-${name}`;
  const errorId = `error-${name}`;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-foreground"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`w-full rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-blue-500 ${
            error ? "border-red-500" : "border-border"
          } ${rightSlot ? "pr-12" : ""}`}
        />
        {rightSlot && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightSlot}
          </div>
        )}
      </div>

      {error && (
        <p id={errorId} className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
