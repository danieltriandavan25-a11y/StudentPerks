import { Link } from "react-router-dom";
import { Button, Card } from "../../components/ui";
import { HeroIllustration, Squiggle } from "../../components/illustrations";
import PublicLayout, { PortalLink } from "../../layouts/PublicLayout";

const STEPS = [
  ["Create a free account", "Sign up with your student details."],
  ["Browse nearby offers", "Filter discounts by category and distance."],
  ["Show your pass", "Present it at the counter and save."],
];

export default function Home() {
  return (
    <PublicLayout>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            Local discounts, made for students.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-slate-600">
            StudentPerks connects students with neighbourhood businesses that want to welcome them with a better price.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button as={Link} to="/register" size="lg">Create student account</Button>
            <PortalLink role="business" to="/register" variant="secondary" size="lg">List your business</PortalLink>
          </div>
        </div>
        <HeroIllustration className="mx-auto w-full max-w-md lg:max-w-none" />
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-semibold text-slate-900">How it works</h2>
          <Squiggle className="mt-1 w-28" />
          <ol className="mt-8 grid gap-6 sm:grid-cols-3">
            {STEPS.map(([title, text], i) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-slate-800 bg-brand-50 font-hand text-2xl text-slate-900" aria-hidden="true">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                  <p className="mt-1 text-slate-600">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-2">
        <Card padded>
          <h2 className="text-xl font-semibold text-slate-900">For students</h2>
          <p className="mt-2 text-slate-600">Stretch your budget on food, books, services and more, with offers checked by our team.</p>
          <PortalLink role="student" to="/register" variant="secondary" className="mt-5">Join as a student</PortalLink>
        </Card>
        <Card padded>
          <h2 className="text-xl font-semibold text-slate-900">For businesses</h2>
          <p className="mt-2 text-slate-600">Reach students nearby, publish offers in minutes and see which ones bring people through the door.</p>
          <PortalLink role="business" to="/register" variant="secondary" className="mt-5">Join as a business</PortalLink>
        </Card>
      </section>
    </PublicLayout>
  );
}
