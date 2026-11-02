import TLink from "@/components/TLink";

export default function NotFound() {
  return (
    <section className="not-found">
      <div>
        <span className="eyebrow">Error 404</span>
        <h1 className="h-display" style={{ margin: "24px 0 40px" }}>
          Lost in the <span className="serif accent">app store?</span>
        </h1>
        <TLink href="/" className="btn btn-primary"><span>Take me home</span></TLink>
      </div>
    </section>
  );
}
