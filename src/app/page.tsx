import { Header } from "./components/Header";
import { Description } from "./components/Description";
import { Columns } from "./components/Columns";

export default async function Home() {
  return (
    <main className='self-center flex flex-col max-w-(--breakpoint-sm) lg:max-w-(--breakpoint-lg) xl:max-w-(--breakpoint-2xl) space-y-10'>
      <Header />
      <Description />
      <Columns />
    </main>
  )
}
