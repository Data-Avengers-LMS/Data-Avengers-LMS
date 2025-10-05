import { ModeToggle } from '@repo/shadcn-next/components/ui/themes/MenuToggle';

export default function Home() {
  return (
    <>
      <div className="h-[100vh] w-[100vw] flex items-center flex-col justify-center">
        <ModeToggle />
        <div className="text-blue-300">srajan saxena</div>
      </div>
    </>
  );
}
