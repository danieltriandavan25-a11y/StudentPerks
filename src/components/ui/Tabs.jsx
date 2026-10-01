import { useId, useRef, useState } from "react";
import { cn } from "../../utils/cn";

/**
 * Accessible tabs (arrow keys, Home/End, roving tabindex).
 *
 * <Tabs
 *   label="Discount status"
 *   tabs={[
 *     { id: "active", label: "Active", count: 3, content: <p>…</p> },
 *     { id: "expired", label: "Expired", content: <p>…</p> },
 *   ]}
 * />
 *
 * Controlled: pass value + onValueChange. Uncontrolled: pass defaultValue (optional).
 * Omit `content` to use Tabs only as a switcher and render panels yourself.
 */
function Tabs({ tabs, value, defaultValue, onValueChange, label, className }) {
  const baseId = useId();
  const [internal, setInternal] = useState(defaultValue ?? tabs[0]?.id);
  const isControlled = value !== undefined;
  const active = isControlled ? value : internal;
  const refs = useRef([]);

  const select = (id) => {
    if (!isControlled) setInternal(id);
    onValueChange?.(id);
  };

  const handleKeyDown = (e, index) => {
    const enabled = tabs.map((t, i) => (t.disabled ? -1 : i)).filter((i) => i >= 0);
    const pos = enabled.indexOf(index);
    let next;
    if (e.key === "ArrowRight") next = enabled[(pos + 1) % enabled.length];
    else if (e.key === "ArrowLeft")
      next = enabled[(pos - 1 + enabled.length) % enabled.length];
    else if (e.key === "Home") next = enabled[0];
    else if (e.key === "End") next = enabled[enabled.length - 1];
    else return;
    e.preventDefault();
    select(tabs[next].id);
    refs.current[next]?.focus();
  };

  const activeTab = tabs.find((t) => t.id === active);

  return (
    <div className={className}>
      <div className="overflow-x-auto border-b border-slate-200">
        <div role="tablist" aria-label={label} className="-mb-px flex min-w-max gap-6">
          {tabs.map((tab, index) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                ref={(el) => (refs.current[index] = el)}
                type="button"
                role="tab"
                id={`${baseId}-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                disabled={tab.disabled}
                onClick={() => select(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={cn(
                  "inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  selected
                    ? "border-brand-600 text-brand-700"
                    : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900",
                )}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs",
                      selected ? "bg-brand-50 text-brand-700" : "bg-slate-100 text-slate-600",
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      {activeTab?.content !== undefined && (
        <div
          role="tabpanel"
          id={`${baseId}-panel-${activeTab.id}`}
          aria-labelledby={`${baseId}-tab-${activeTab.id}`}
          tabIndex={0}
          className="pt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
}

export default Tabs;
