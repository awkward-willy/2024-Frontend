"use client";

import { useState } from "react";

import MarkdownRenderer from "@/components/MarkdownRenderer";
import PostForm from "@/components/Post/PostForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PostTab({
  initTitle,
  initBody,
  issueNum,
  type,
}: {
  initTitle?: string;
  initBody?: string;
  issueNum?: number;
  type: "create" | "edit";
}) {
  const [title, setTitle] = useState<string>(initTitle ?? "");
  const [body, setBody] = useState<string>(initBody ?? "");

  return (
    <Tabs defaultValue="form">
      <TabsList className="grid w-full max-w-lg grid-cols-2">
        <TabsTrigger value="form">Form</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="form">
        <PostForm
          setTitle={setTitle}
          setBody={setBody}
          title={title}
          body={body}
          issueNum={issueNum}
          type={type}
        />
      </TabsContent>
      <TabsContent value="preview">
        <div className="max-w-lg rounded bg-white p-4 shadow-md">
          <h1 className="mb-4 border-b text-xl font-bold">{title}</h1>
          <MarkdownRenderer body={body} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
