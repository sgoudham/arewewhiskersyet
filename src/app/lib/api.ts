import { throttling } from "@octokit/plugin-throttling";
import { Octokit } from "@octokit/rest";
import { ApiCustomProperties, CustomProperty, FullRepoData, RepoData } from "./types";

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

const fetchCustomProperties = async (
  repo: RepoData
): Promise<ApiCustomProperties> => {
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
};

const fetchPublicRepos = async (): Promise<RepoData[]> => {
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
          isArchived: repo.archived,
          html_url: repo.html_url,
        };
      });
    });
};

export const fetchRepos = async (): Promise<FullRepoData[]> => {
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
      const publicRepos = (await fetchPublicRepos()).filter(
        (repo) => !repo.isArchived
      );
      repos = await Promise.all(
        publicRepos.map(async (repo) => {
          const properties = await fetchCustomProperties(repo);
          const found = properties.response.find(
            (e) => e.property_name === "whiskers"
          );

          let whiskers = CustomProperty.FALSE;
          if (found) {
            if (found.value === "true") {
              whiskers = CustomProperty.TRUE;
            }
            if (found.value === "not_applicable") {
              whiskers = CustomProperty.NOT_APPLICABLE;
            }
          }

          return {
            ...repo,
            whiskers,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  // console.log("saving data to `response.json`");
  // await fs.writeFile(
  //   "./src/app/lib/response.json",
  //   JSON.stringify(repos, null, 2),
  //   function (err: any) {
  //     if (err) {
  //       console.log(err);
  //     }
  //   }
  // );

  return repos;
};
