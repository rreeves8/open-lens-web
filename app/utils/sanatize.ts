export default function sanatize(string: string) {
  if (string.split(" ").length > 1) {
    throw new Error("Failed sanatization, too many words");
  }
  if (string.split("").length > 40) {
    throw new Error("Failed sanatization, too long");
  }
}
