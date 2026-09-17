const TextInput = ({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  onBlur, 
  onFocus, 
  error = "", 
  placeholder = "", 
  autoComplete = "off", 
  rightSlot = null, 
  hideLabel = false 
}) => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && label.trim() !== "" && (
        <label htmlFor={`input-${name}`} className={hideLabel ? "sr-only" : "text-xs font-semibold tracking-wide text-foreground/90"}>{label}</label>
      )}
      <div className="relative">
        <input
        id={`input-${name}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined} className={`w-full rounded-lg border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:bg-card focus:ring-2 ${error ? "border-red-500/70 ring-2 ring-red-400 focus:ring-red-400" : "border-border focus:ring-foreground/15"} ${rightSlot ? "pr-10" : ""}`} />
        {rightSlot && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>}
      </div>
      {error && <p id={`error-${name}`} role="alert" className="text-[11px] font-medium text-red-500">{error}</p>}
    </div>
  );
};

export default TextInput;