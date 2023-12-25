import { throttling } from "@octokit/plugin-throttling";
import { Octokit } from "@octokit/rest";
import { cache } from "react";
const fs = require("node:fs");

const org = "catppuccin";

if (!process.env.WHISKERS_GITHUB_TOKEN) {
  throw new Error("GITHUB TOKEN 'WHISKERS_GITHUB_TOKEN' is missing");
}

const MyOctokit = Octokit.plugin(throttling);

const octokit = new MyOctokit({
  auth: process.env.WHISKERS_GITHUB_TOKEN,
  throttle: {
    onRateLimit: (retryAfter, options, octokit, retryCount) => {
      octokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`
      );

      if (retryCount < 1) {
        // only retries once
        octokit.log.info(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onSecondaryRateLimit: (retryAfter, options, octokit) => {
      // does not retry, only logs a warning
      octokit.log.warn(
        `SecondaryRateLimit detected for request ${options.method} ${options.url}`
      );
    },
  },
});

type ApiCustomProperties = {
  response: ApiCustomProperty[];
};

type ApiCustomProperty = {
  property_name: string;
  value: string | null;
};

type RepoData = {
  name: string;
  description: string | null;
  html_url: string;
};

export type FullRepoData = RepoData & {
  whiskers: boolean;
};

const fetchCustomProperties = cache(
  async (repo: RepoData): Promise<ApiCustomProperties> => {
    return await octokit
      .request(`GET /repos/catppuccin/${repo.name}/properties/values`, {
        owner: org,
        repo: repo.name,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
      .then((response) => {
        return {
          response: response.data,
        };
      });
  }
);

const fetchPublicRepos = cache(async (): Promise<RepoData[]> => {
  return await octokit
    .paginate(octokit.rest.repos.listForOrg, {
      org,
      type: "public",
      per_page: 100,
    })
    .then((repos) => {
      return repos.map((repo) => {
        return {
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
        };
      });
    });
});

export const fetchRepos = cache(async (): Promise<FullRepoData[]> => {
  let repos: FullRepoData[] = [];

  if (process.env.NODE_ENV === "development") {
    console.log("fetching from local `response.json`");
    try {
      repos = require("./response.json");
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log("fetching from github");
    try {
      const publicRepos = await fetchPublicRepos();
      repos = await Promise.all(
        publicRepos.map(async (repo) => {
          const properties = await fetchCustomProperties(repo);
          const found = properties.response.find(
            (e) => e.property_name === "whiskers"
          );
          return {
            ...repo,
            whiskers: found ? (found.value === "true" ? true : false) : false,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  return repos;
});
