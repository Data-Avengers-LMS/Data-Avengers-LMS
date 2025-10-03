import { ModeToggle } from './components/themes/MenuToggle';

export default function Home() {
  return (
    <div>
      <ModeToggle />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        This is from data avengers
      </main>
    </div>
  );
}
