export function Logo() {
  return (
    <a
      href="#home"
      aria-label="Moraes Analytics — back to top"
      className="flex flex-col leading-none transition-opacity duration-300 hover:opacity-80"
    >
      <span className="text-[15px] font-semibold tracking-[0.28em] text-body">
        MORAES
      </span>
      <span className="mt-1 text-[9px] font-medium tracking-[0.46em] text-accent">
        ANALYTICS
      </span>
    </a>
  );
}
