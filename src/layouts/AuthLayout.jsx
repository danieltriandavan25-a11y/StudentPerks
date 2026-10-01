import { HeroIllustration } from "../components/illustrations";
import { Brand } from "./PublicLayout";

export default function AuthLayout({ title, subtitle, footer, children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-4 py-8 sm:px-10">
        <Brand />
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10">
          <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
          <p className="mt-2 text-slate-600">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-6 text-sm text-slate-600">{footer}</p>
        </div>
      </div>
      <div className="hidden items-center justify-center border-l border-slate-200 bg-brand-50 p-10 lg:flex">
        <HeroIllustration className="w-full max-w-lg" />
      </div>
    </div>
  );
}
