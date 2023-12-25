import Link from "next/link"
import { FullRepoData, fetchRepos } from "./api"
import { Roboto_Condensed } from "next/font/google";
import { CheckCircle, CrossCircle } from "./icons";
import { ReactNode } from "react";

const roboto = Roboto_Condensed({ fallback: ['system-ui'], weight: ["400"], subsets: ["latin"] })

const Card = ({ repo, icon }: { repo: FullRepoData, icon: ReactNode }) => {
  return (
    <div className="flex flex-row bg-base rounded-xl border-solid border-2 shadow-lg hover:scale-105 motion-safe:duration-300 space-x-2 p-3 dark:border-crust hover:border-blue">
      {icon}
      <Link
        className="underline"
        rel="noopener noreferrer"
        target="_blank"
        href={repo.html_url}>{repo.name}
      </Link>
    </div>
  );
}

const YupColumn = ({ repos }: { repos: FullRepoData[] }) => {
  const ported = repos.filter((repo) => repo.whiskers).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-col space-y-2 text-2xl lg:text-3xl xl:text-4xl">
      <h2 className="basis-auto text-transparent bg-clip-text bg-gradient-to-r from-green to-green-600">
        Yup
      </h2>
      <div className="flex flex-col text-lg lg:text-xl xl:text-2xl">
        <div className="basis-auto flex-col text-center space-y-2 px-2">
          {ported.map((repo) => (
            <Card key={repo.name} repo={repo} icon={<CheckCircle className="justify-self-start text-green h-7" />} />
          ))}
        </div>
      </div>
    </div>
  );
}

const NopeColumn = ({ repos }: { repos: FullRepoData[] }) => {
  const notPorted = repos.filter((repo) => !repo.whiskers).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-col space-y-2 text-2xl lg:text-3xl xl:text-4xl">
      <h2 className="basis-auto text-transparent bg-clip-text bg-gradient-to-r from-red to-maroon">
        Nope
      </h2>
      <div className="flex flex-col text-lg lg:text-xl xl:text-2xl">
        <div className="basis-auto flex-col text-center space-y-2 px-2">
          {notPorted.map((repo) => (
            <Card key={repo.name} repo={repo} icon={<CrossCircle className="justify-self-start text-red h-8" />} />
          ))}
        </div>
      </div>
    </div>
  );
}

const Columns = async () => {
  const publicRepos = await fetchRepos();

  return (
    <div className="w-full flex flex-col text-center space-y-4 px-4 lg:flex-row-reverse lg:space-y-0 lg:items-start lg:px-0">
      <YupColumn repos={publicRepos} />
      <NopeColumn repos={publicRepos} />
    </div>
  );
}

const Header = () => {
  return <h1 className="text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue to-lavender text-3xl lg:text-3xl xl:text-4xl">Are We Whiskers Yet?</h1>
}

const Body = async () => {
  return (
    <div className={`${roboto.className} text-center text-md lg:text-lg xl:text-xl`}>
      <p>
        This website is tracking the adoption of{" "}
        <Link
          className="underline decoration-solid decoration-blue decoration-2 text-blue"
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/catppuccin/toolbox/tree/main/whiskers">whiskers
        </Link>
        , a work-in-progress port creation tool for Catppuccin.
      </p>
    </div>
  )
}

export default async function Home() {
  return (
    <main className='self-center flex flex-col max-w-screen-sm lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl space-y-10'>
      <Header />
      <Body />
      <Columns />
    </main>
  )
}
