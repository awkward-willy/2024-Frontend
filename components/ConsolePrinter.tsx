"use client";

export default function ConsolePrinter({ message }: { message: string }) {
  // make sure it is in browser
  if (typeof window === "undefined") return <></>;

  const css =
    "color: #ff0000; font-size: 20px; font-weight: bold; border-radius: 5px; background-color: #f0f0f0; padding: 10px;";
  console.log("%c%s", css, message);
  return <></>;
}
