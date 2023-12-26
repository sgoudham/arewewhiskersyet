import { Header } from "./components/Header";
import { Description } from "./components/Description";
import { Columns } from "./components/Columns";

export default async function Home() {
  return (
    <main className='self-center flex flex-col max-w-screen-sm lg:max-w-screen-lg xl:max-w-screen-2xl space-y-10'>
      <Header />
      <Description />
      <Columns />
    </main>
  )
}
