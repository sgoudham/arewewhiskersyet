import { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink } from "../icons";
import { FullRepoData } from "../lib/types";

export const Card = ({ repo, icon }: { repo: FullRepoData, icon: ReactNode }) => {
  return (
    <div className="flex flex-row bg-ctp-base dark:bg-ctp-mantle dark:border-ctp-mantle rounded-xl border-solid border-2 shadow-lg items-center hover:scale-105 motion-safe:duration-300 space-x-2 p-3 hover:border-ctp-text">
      {icon}
      <div className="flex">
        <Link
          className="hover:underline"
          rel="noopener noreferrer"
          target="_blank"
          href={repo.html_url}>{repo.name}
        </Link>
        <ExternalLink />
      </div>
    </div>
  );
}