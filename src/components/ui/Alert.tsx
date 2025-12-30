export default function Alert({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-rose-900/60 bg-rose-950/40 px-3 py-2 text-sm text-rose-200">
      {text}
    </div>
  );
}
