import type { CSSProperties } from "react";
import type { App } from "@/lib/data";

export default function Phone({ app, width, className = "", style }: { app: App; width?: number; className?: string; style?: CSSProperties }) {
  const peak = app.screen.bars.indexOf(Math.max(...app.screen.bars));
  const vars = { "--c": app.color, ...(width ? { "--w": `${width}px` } : {}), ...style } as CSSProperties;
  return (
    <div className={`phone ${className}`} style={vars} aria-hidden>
      <div className="screen">
        <div className="scr-head">
          <div>
            <div className="scr-title">{app.name}</div>
            <div className="scr-sub">{app.screen.sub}</div>
          </div>
          <div className="scr-avatar" />
        </div>
        <div className="scr-hero">
          <small>{app.screen.label}</small>
          <b>{app.screen.big}</b>
          <small>{app.screen.note}</small>
          <i className="scr-ring" />
        </div>
        <div className="scr-bars">
          {app.screen.bars.map((h, i) => (
            <i key={i} className={i === peak ? "on" : ""} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="scr-row"><span className="dot" /><span className="txt"><i /><i /></span></div>
        <div className="scr-row"><span className="dot" /><span className="txt"><i /><i /></span></div>
        <div className="scr-tab"><i /><i /><i /><i /></div>
      </div>
    </div>
  );
}
