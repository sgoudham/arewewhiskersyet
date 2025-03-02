import { fetchRepos } from "../lib/api";
import { ReactNode } from "react";
import { CheckCircle, Confused, CrossCircle } from "../icons";
import { Card } from "./Card";
import { CustomProperty, FullRepoData } from "../lib/types";

const Column = ({ repos, property, title, gradient, icon, }: { repos: FullRepoData[], property: CustomProperty, title: string, gradient: string, icon: ReactNode }) => {
  let filteredRepos = repos.filter((repo) => repo.whiskers === property);
  return (
    <div className="flex flex-col space-y-2">
      <h2 className={`text-xl lg:text-2xl xl:text-3xl basis-auto text-transparent bg-clip-text bg-linear-to-r ${gradient}`}>
        {title} ({filteredRepos.length})
      </h2>
      <div className="flex flex-col text-md lg:text-lg xl:text-2xl">
        <div className="basis-1/3 flex-col text-center space-y-2 px-2">
          {filteredRepos.map((repo) => (
            <Card key={repo.name} repo={repo} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const Columns = async () => {
  const repos = (await fetchRepos()).sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="w-full flex flex-col text-center space-y-4 px-4 lg:flex-row-reverse lg:space-y-0 lg:items-start lg:px-0">
      <Column repos={repos} property={CustomProperty.TRUE} title="Yup" gradient="from-ctp-green-400 to-ctp-teal-600" icon={<CheckCircle className="justify-self-start text-ctp-green h-8" />} />
      <Column repos={repos} property={CustomProperty.FALSE} title="Nope" gradient="from-ctp-red-400 to-ctp-maroon-600" icon={<CrossCircle className="justify-self-start text-ctp-red h-8" />} />
      <Column repos={repos} property={CustomProperty.NOT_APPLICABLE} title="N/A" gradient="from-ctp-peach-400 to-ctp-yellow-600" icon={<Confused className="justify-self-start text-ctp-peach h-8" />} />
    </div>
  );
}