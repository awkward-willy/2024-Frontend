"use client";
import FormSection from "@/components/FormSection";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useState } from "react";
export default function CreatePage() {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleBodyChange = (value: string) => {
    setBody(value);
  };

  return (
    <>
      <Link href="/">Back</Link>
      <Tabs defaultValue="form">
        <TabsList className="grid w-full grid-cols-2 max-w-lg">
          <TabsTrigger value="form">Form</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="form">
          <FormSection
            setTitle={handleTitleChange}
            setBody={handleBodyChange}
            title={title}
            body={body}
          />
        </TabsContent>
        <TabsContent value="preview">
          <div className="max-w-lg p-4 bg-white rounded shadow-md">
            <h1 className="text-xl font-bold border-b mb-4">{title}</h1>
            <MarkdownRenderer body={body} />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
