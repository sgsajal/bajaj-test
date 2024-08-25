import { Button, Dropdown, TextInput } from "flowbite-react";
import {
  Dispatch,
  FormEvent,
  FormEventHandler,
  KeyboardEventHandler,
  useState,
} from "react";
import FilterInput from "./components/FilterInput";

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
  const [error, setError] = useState<null | string>(null);
  const [serverRes, setServerRes] = useState<ServerResult | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    // first validate input
    try {
      if (!JSON.parse(inp)) {
        setError(null);
      }
    } catch (err) {
      setError((err as Error).message);
      return;
    }

    // submit to server
    try {
      const res = await fetch("/bfhl", {
        body: JSON.stringify(JSON.parse(inp)),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const output = await res.json();
      setServerRes(output as ServerResult);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <main className="container mx-auto px-12 pt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="api-input"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            API Input
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            {error !== null && (
              <p className="text-rose-700 font-bold p-4 border-1 border-rose-700">
                {error}
              </p>
            )}
            <TextInput
              id="api-input"
              name="api-input"
              type="text"
              placeholder="{'data':{}}"
              value={inp}
              onChange={(e) => setInp(e.target.value)}
            />
          </div>
        </div>
        <Button type="submit" className="w-full font-bold">
          Submit
        </Button>
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
