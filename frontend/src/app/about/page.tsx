import { Card} from "@/components/card";

export default function Home({}) {
    return (
      <>
        <div className="flex flex-row space-x-4 items-center justify-center min-h-screen py-2 bg-white">
           <Card
            title={"About"}
            description={"hi hello"}
           />

           <Card
            title={"About"}
            description={"hi hello"}
           />

           <Card
            title={"About"}
            description={"hi hello"}
           />
        </div>
      </>
    );
  }