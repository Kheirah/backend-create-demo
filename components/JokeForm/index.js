import useSWR from "swr";

export default function JokeForm() {
  const { mutate } = useSWR("/api/jokes");

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const jokeData = Object.fromEntries(formData); /* { joke: "hahaha" } */

    //API ansprechen
    const response = await fetch("/api/jokes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jokeData) /* { "joke": "hahahah" } */,
    });

    if (response.ok) {
      mutate();
    }

    event.target.reset();
    event.target.elements[0].focus();
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="joke-input">Enter new a joke</label>
      <input id="joke-input" name="joke" type="text" />
      <button type="submit">Submit</button>
    </form>
  );
}
