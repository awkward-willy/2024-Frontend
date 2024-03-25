"use client";

import { useState } from "react";
import PostForm from "@/components/PostForm";
import MarkdownRenderer from "@/components/MarkdownRenderer";
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
      <TabsList className="grid w-full grid-cols-2 max-w-lg">
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
        <div className="max-w-lg p-4 bg-white rounded shadow-md">
          <h1 className="text-xl font-bold border-b mb-4">{title}</h1>
          <MarkdownRenderer body={body} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
