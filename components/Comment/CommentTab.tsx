"use client";

import { useState } from "react";

import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CommentForm from "./CommentForm";

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
      <TabsList className="grid w-full max-w-xs grid-cols-2">
        <TabsTrigger value="form" className="data-[state=inactive]:text-black">
          編輯
        </TabsTrigger>
        <TabsTrigger
          value="preview"
          className="data-[state=inactive]:text-black"
        >
          預覽
        </TabsTrigger>
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
        <div className="h-48 overflow-y-scroll rounded bg-white p-8 shadow-md">
          <MarkdownRenderer body={body} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
