/**
 * App Router remounts this on every navigation, which replays the
 * `sh-page` keyframe — a soft cross-page fade with no JS and no
 * layout thrash. Reduced motion disables it in globals.css.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="sh-page">{children}</div>;
}
