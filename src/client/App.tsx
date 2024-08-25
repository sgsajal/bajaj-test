import { Dropdown } from "flowbite-react";
import {
  Dispatch,
  FormEvent,
  FormEventHandler,
  KeyboardEventHandler,
  useState,
} from "react";

function FilterTag(props: { text: string }) {
  return (
    <div>
      <button
        type="button"
        className="rounded-md bg-white px-2.5 py-1.5 space-x-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        {props.text}
        <div>X</div>
      </button>
    </div>
  );
}

function FilterInput({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: Dispatch<React.SetStateAction<string[]>>;
}) {
  function removeTag(index: number) {
    setTags(tags.filter((el, i) => i !== index));
  }

  function clearAll() {
    setTags([]);
  }

  function addTag(tag: string) {
    return () => setTags((prev) => [...prev, tag] as string[]);
  }

  return (
    <div className="border-2 border-black p-2 rounded-md w-full max-w-[600px] mt-4 flex justify-between flex-wrap gap-2 min-h-2">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="bg-gray-200 inline-block px-3 py-2 rounded-full"
        >
          <span>{tag}</span>
          <span
            className="ml-2 bg-gray-800 text-white rounded-full w-5 h-5 inline-flex justify-center items-center text-lg cursor-pointer"
            onClick={() => removeTag(index)}
          >
            &times;
          </span>
        </div>
      ))}
      <button onClick={clearAll}>X</button>
      <Dropdown label="" dismissOnClick>
        <Dropdown.Item onClick={addTag("number")}>Numbers</Dropdown.Item>
        <Dropdown.Item onClick={addTag("alphabet")}>Alphabets</Dropdown.Item>
        <Dropdown.Item onClick={addTag("highest")}>
          Highest lowercase alphabet
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
}

type ServerResult = {
  is_success: boolean;
  user_id: string;
  email: string;
  roll_number: string;
  numbers: number[];
  alphabets: string[];
  highest_lowercase_alphabet: string[];
};

export default function App() {
  const [inp, setInp] = useState("");
  const [serverRes, setServerRes] = useState<ServerResult | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  console.log(inp);

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const res = await fetch("/bfhl", {
      body: JSON.parse(inp),
      method: "POST",
    });
    const output = await res.json();
    setServerRes(output as ServerResult);
  }

  return (
    <main className="container mx-auto">
      <form onSubmit={handleSubmit} className="">
        <div>
          <label
            htmlFor="api-input"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            API Input
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              id="api-input"
              name="api-input"
              type="text"
              placeholder="0.00"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={inp}
              onChange={(e) => setInp(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </form>
      {serverRes !== null && (
        <section>
          <FilterInput tags={tags} setTags={setTags} />
          <main>
            <p>Filterd Response</p>
            {tags.includes("number") && <p>Numbers: {serverRes.numbers}</p>}
            {tags.includes("alphabet") && (
              <p>Alphabet: {serverRes.alphabets}</p>
            )}
            {tags.includes("highest") && (
              <p>
                Highest lowercase alphabet:{" "}
                {serverRes.highest_lowercase_alphabet}
              </p>
            )}
          </main>
        </section>
      )}
    </main>
  );
}
