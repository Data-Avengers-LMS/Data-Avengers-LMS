import Image, { type ImageProps } from "next/image";



type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
   <div>
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      This is from data avengers
    </main>
   </div>
  );
}
