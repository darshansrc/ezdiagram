import { Cross1Icon } from "@radix-ui/react-icons";
import { ArrowRight, Cross } from "lucide-react";

export default function Banner() {
  return (
    <div className="hidden relative isolate md:flex items-center gap-x-6 overflow-hidden bg-gradient-to-r from-purple-700  to-pink-700 px-6 py-2 sm:px-3 sm:before:flex-1">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-white dark:text-gray-50">
          <strong className="font-semibold">EzDiagram 2.0 is here</strong>
          <svg
            viewBox="0 0 2 2"
            className="mx-2 inline h-0.5 w-0.5 fill-current"
            aria-hidden="true"
          >
            <circle cx={1} cy={1} r={1} />
          </svg>
          new editor, mobile support, premium plan and so much more.
        </p>
        <a
          href="#"
          className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-[12px] font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Get Premium <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
        >
          <span className="sr-only">Dismiss</span>
        </button>
      </div>
    </div>
  );
}
