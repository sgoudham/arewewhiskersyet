import { Roboto_Condensed } from "next/font/google";
import Link from "next/link";

const roboto = Roboto_Condensed({ fallback: ['system-ui'], weight: ["400"], subsets: ["latin"] })

export const Description = async () => {
  return (
    <div className={`${roboto.className} text-center text-balance text-md lg:text-xl xl:text-2xl`}>
      <p>
        This website is tracking the adoption of{" "}
        <Link
          className="underline decoration-solid decoration-2 text-ctp-blue"
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/catppuccin/toolbox/tree/main/whiskers">whiskers
        </Link>
        , an awesome port creation tool for Catppuccin.
      </p>
      <p>Designed by the amazing{" "}
        <Link
          className="underline decoration-solid decoration-2 text-ctp-blue"
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/backwardspy">pigeon
        </Link>.
      </p>
    </div>
  )
}
