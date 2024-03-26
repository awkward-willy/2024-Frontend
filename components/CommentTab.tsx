"use client";

import { useState } from "react";
import CommentForm from "./CommentForm";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CommentTab({
  initBody,
  issueNum,
  type,
}: {
  initBody?: string;
  issueNum: number;
  type: "create" | "edit";
}) {
  const [body, setBody] = useState<string>(initBody ?? "");

  return (
    <Tabs defaultValue="form">
      <TabsList className="grid w-full max-w-lg grid-cols-2">
        <TabsTrigger value="form">Form</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="form">
        <CommentForm
          setBody={setBody}
          body={body}
          issueNum={issueNum}
          type={type}
        />
      </TabsContent>
      <TabsContent value="preview">
        <div className="max-w-lg rounded bg-white p-4 shadow-md">
          <MarkdownRenderer body={body} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
