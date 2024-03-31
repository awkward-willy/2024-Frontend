import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createPosts } from "@/actions/createPost";
import { updatePost } from "@/actions/updatePost";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .trim()
    .min(1, { message: "Title 不得為空" }),
  body: z.string().trim().min(30, { message: "Body 需至少 30 字" }),
});

interface PostFormProps {
  setTitle: (title: string) => void;
  setBody: (body: string) => void;
  title: string;
  body: string;
  type: "create" | "edit";
  issueNum?: number;
}

export default function PostForm({
  setTitle,
  setBody,
  title,
  body,
  type,
  issueNum,
}: PostFormProps) {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
    },
    mode: "onChange",
  });

  const handleSubmit = async () => {
    setButtonDisabled(true);
    if (type === "create") {
      const formData = new FormData();
      formData.append("title", form.getValues("title"));
      formData.append("body", form.getValues("body"));
      const res = await createPosts(formData);
      if (res.success) {
        router.push("/auth");
        toast("成功建立文章", {
          icon: <CheckCircledIcon color="green" />,
        });
      } else {
        toast("建立文章失敗", {
          description: "錯誤碼：" + res.status,
          icon: <CrossCircledIcon color="red" />,
        });
        setButtonDisabled(false);
      }
    } else {
      const formData = new FormData();
      formData.append("title", form.getValues("title"));
      formData.append("body", form.getValues("body"));
      const res = await updatePost(formData, issueNum as number);
      if (res === 200) {
        router.push("/auth");
        toast("成功編輯文章", {
          icon: <CheckCircledIcon color="green" />,
        });
      } else {
        toast("編輯文章失敗", {
          description: "錯誤碼：" + res,
          icon: <CrossCircledIcon color="red" />,
        });
        setButtonDisabled(false);
      }
    }
  };

  useEffect(() => {
    form.setValue("title", title);
    form.setValue("body", body);
  }, [title, body, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-4 flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>標題</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="請輸入標題"
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    className="text-md placeholder:text-slate-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>內容</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="請輸入內容（內容須至少 30 字）"
                    value={body}
                    onChange={(e) => {
                      setBody(e.target.value);
                    }}
                    className="text-md h-48 resize-none placeholder:text-slate-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button
          type="submit"
          variant="ghost"
          className="bg-secondary/50"
          disabled={buttonDisabled}
        >
          {type === "create" ? "新增" : "編輯"}
        </Button>
      </form>
    </Form>
  );
}
