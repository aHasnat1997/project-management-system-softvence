import Headers from "@/components/Headers";
import { ArrowLeftSquare } from "lucide-react";

export default function CreateProject() {
  return (
    <section>
      <div className="flex items-center gap-4">
        <button className="p-0" onClick={() => window.history.back()}>
          <ArrowLeftSquare className="text-[#6B6B6B]" />
        </button>
        <Headers title="Add Project" />
      </div>
      <div className="rounded-md border p-4 mt-4">

      </div>
    </section>
  );
};
