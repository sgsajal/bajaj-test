import { Button, Dropdown } from "flowbite-react";
import { Dispatch } from "react";

export default function FilterInput({
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
      <ul className="flex flex-row gap-2 flex-1">
        {tags.map((tag, index) => (
          <li
            key={index}
            className="bg-gray-200 inline-block px-3 py-2 rounded-full"
          >
            <span className="capitalize">{tag}</span>
            <span
              className="ml-2 bg-gray-800 text-white rounded-full w-5 h-5 inline-flex justify-center items-center text-lg cursor-pointer"
              onClick={() => removeTag(index)}
            >
              &times;
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-row gap-2">
        <Button onClick={clearAll}>&times;</Button>
        <Dropdown label="" dismissOnClick>
          <Dropdown.Item onClick={addTag("number")}>Numbers</Dropdown.Item>
          <Dropdown.Item onClick={addTag("alphabet")}>Alphabets</Dropdown.Item>
          <Dropdown.Item onClick={addTag("highest")}>
            Highest lowercase alphabet
          </Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
}
