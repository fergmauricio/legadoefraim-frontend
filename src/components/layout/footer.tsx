export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
      <p>Vivendo o Evangelho, Vestindo o Propósito</p>
      <p className="mt-2">
        &copy; {new Date().getFullYear()} Legado Efraim. Todos os direitos
        reservados.
      </p>
    </footer>
  );
}
