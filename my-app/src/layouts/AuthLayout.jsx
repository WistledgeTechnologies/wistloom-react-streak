import { Link, Outlet } from "react-router-dom"
import { Briefcase, Clock, MessagesSquare } from "lucide-react"

const checklist = [
  { icon: Briefcase, text: "2X More Qualified Job Matches" },
  { icon: Clock, text: "60% Time Savings in Job Searches" },
  { icon: MessagesSquare, text: "50% More Interview Invites" },
]

const AuthLayout = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-background font-auth lg:grid-cols-2">
      <div className="relative hidden flex-col overflow-hidden bg-card p-8 sm:p-12 lg:flex">
        <div className="pointer-events-none absolute -bottom-28 -left-28 h-[34rem] w-[34rem] rounded-full bg-emerald-300/70 blur-3xl dark:bg-emerald-600/50" />
        <div className="pointer-events-none absolute -bottom-10 left-40 h-80 w-80 rounded-full bg-teal-200/50 blur-3xl dark:bg-teal-700/40" />
        <div className="relative flex flex-col">
        <Link to="/" aria-label="Go to homepage" className="flex w-fit items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/40">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Briefcase size={16} strokeWidth={2.5} />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-foreground">Jobright</span>
        </Link>

        <h2 className="mt-14 whitespace-nowrap text-3xl font-light leading-[1.2] text-foreground sm:text-4xl">
          Always be the <span className="font-bold">first</span>
          <br />
          to apply the <span className="font-bold">best</span> jobs.
        </h2>

        <div className="mt-8 flex flex-col gap-1 text-[15px] text-foreground">
          <p><span className="font-bold">400,000+</span> Today&apos;s new jobs</p>
          <p><span className="font-bold">8,000,000+</span> Total jobs</p>
        </div>

        <hr className="my-8 border-foreground/10" />

        <ul className="flex flex-col gap-4">
          {checklist.map((item) => (
            <li key={item.text} className="flex items-center gap-3 text-[13px] font-medium text-foreground">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-foreground/20 text-foreground">
                <item.icon size={14} />
              </span>
              {item.text}
            </li>
          ))}
        </ul>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center px-4 py-10 sm:px-8">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
